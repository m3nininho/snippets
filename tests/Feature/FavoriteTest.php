<?php

namespace Tests\Feature;

use App\Models\Favorite;
use App\Models\Language;
use App\Models\Snippet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class FavoriteTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_favorite_another_users_public_snippet(): void
    {
        $user = User::factory()->create();
        $snippet = $this->createSnippet(User::factory()->create(), 'public');

        $this->actingAs($user)
            ->post(route('favorites.store', $snippet))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('favorites', [
            'user_id' => $user->id,
            'snippet_id' => $snippet->id,
        ]);
    }

    public function test_user_can_favorite_their_own_private_snippet(): void
    {
        $user = User::factory()->create();
        $snippet = $this->createSnippet($user, 'private');

        $this->actingAs($user)
            ->post(route('favorites.store', $snippet))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('favorites', [
            'user_id' => $user->id,
            'snippet_id' => $snippet->id,
        ]);
    }

    public function test_user_cannot_favorite_another_users_private_snippet(): void
    {
        $user = User::factory()->create();
        $snippet = $this->createSnippet(User::factory()->create(), 'private');

        $this->actingAs($user)
            ->post(route('favorites.store', $snippet))
            ->assertForbidden();

        $this->assertDatabaseMissing('favorites', [
            'user_id' => $user->id,
            'snippet_id' => $snippet->id,
        ]);
    }

    public function test_favorites_listing_hides_inaccessible_legacy_favorites(): void
    {
        $user = User::factory()->create();
        $snippet = $this->createSnippet(User::factory()->create(), 'private');
        Favorite::create([
            'user_id' => $user->id,
            'snippet_id' => $snippet->id,
        ]);

        $this->actingAs($user)
            ->get(route('favorites.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Favorites/Index')
                ->has('favorites.data', 0));
    }

    public function test_favorites_listing_only_exposes_public_author_fields(): void
    {
        $user = User::factory()->create();
        $author = User::factory()->create();
        $snippet = $this->createSnippet($author, 'public');
        Favorite::create([
            'user_id' => $user->id,
            'snippet_id' => $snippet->id,
        ]);

        $this->actingAs($user)
            ->get(route('favorites.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('favorites.data', 1)
                ->where('favorites.data.0.user.id', $author->id)
                ->where('favorites.data.0.user.name', $author->name)
                ->missing('favorites.data.0.user.email')
                ->missing('favorites.data.0.user.email_verified_at')
                ->missing('favorites.data.0.user.created_at')
                ->missing('favorites.data.0.user.updated_at'));
    }

    private function createSnippet(User $user, string $visibility): Snippet
    {
        $language = Language::firstOrCreate(
            ['slug' => 'php'],
            ['name' => 'PHP'],
        );

        return Snippet::create([
            'user_id' => $user->id,
            'language_id' => $language->id,
            'title' => fake()->unique()->sentence(3),
            'description' => 'Description',
            'code' => 'echo true;',
            'visibility' => $visibility,
        ]);
    }
}
