<?php

namespace Tests\Feature;

use App\Models\Language;
use App\Models\Snippet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_only_exposes_public_snippets_and_public_author_fields(): void
    {
        $user = User::factory()->create();
        $author = User::factory()->create();
        $publicSnippet = $this->createSnippet($author, 'Public snippet', 'public');
        $this->createSnippet($author, 'Private snippet', 'private');

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->has('snippets.data', 1)
                ->where('snippets.data.0.id', $publicSnippet->id)
                ->where('snippets.data.0.user.id', $author->id)
                ->where('snippets.data.0.user.name', $author->name)
                ->missing('snippets.data.0.user.email')
                ->missing('snippets.data.0.user.email_verified_at')
                ->missing('snippets.data.0.user.created_at')
                ->missing('snippets.data.0.user.updated_at'));
    }

    private function createSnippet(User $user, string $title, string $visibility): Snippet
    {
        $language = Language::firstOrCreate(
            ['slug' => 'php'],
            ['name' => 'PHP'],
        );

        return Snippet::create([
            'user_id' => $user->id,
            'language_id' => $language->id,
            'title' => $title,
            'description' => 'Description',
            'code' => 'echo true;',
            'visibility' => $visibility,
        ]);
    }
}
