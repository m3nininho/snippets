<?php

namespace Tests\Feature;

use App\Models\Language;
use App\Models\Snippet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TrashTest extends TestCase
{
    use RefreshDatabase;

    public function test_trash_only_contains_the_authenticated_users_deleted_snippets(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $ownDeletedSnippet = $this->createSnippet($user, 'Own deleted snippet');
        $otherDeletedSnippet = $this->createSnippet($otherUser, 'Other deleted snippet');
        $activeSnippet = $this->createSnippet($user, 'Active snippet');
        $ownDeletedSnippet->delete();
        $otherDeletedSnippet->delete();

        $this->actingAs($user)
            ->get(route('trash.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Trash/Index')
                ->has('snippets', 1)
                ->where('snippets.0.id', $ownDeletedSnippet->id)
                ->where('snippets.0.title', 'Own deleted snippet')
                ->missing('snippets.0.user.email'));

        $this->assertNotNull($activeSnippet->fresh());
    }

    public function test_guest_cannot_access_trash(): void
    {
        $this->get(route('trash.index'))
            ->assertRedirect(route('login'));
    }

    private function createSnippet(User $user, string $title): Snippet
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
            'visibility' => 'private',
        ]);
    }
}
