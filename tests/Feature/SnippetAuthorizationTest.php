<?php

namespace Tests\Feature;

use App\Models\Collection;
use App\Models\Language;
use App\Models\Snippet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SnippetAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_update_their_snippet(): void
    {
        $user = User::factory()->create();
        $snippet = $this->createSnippet($user);

        $this->actingAs($user)
            ->put(route('snippets.update', $snippet), [
                'title' => 'Updated title',
                'description' => 'Updated description',
                'code' => 'echo "updated";',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('snippets', [
            'id' => $snippet->id,
            'title' => 'Updated title',
            'description' => 'Updated description',
            'code' => 'echo "updated";',
        ]);
    }

    public function test_user_cannot_update_another_users_snippet(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $snippet = $this->createSnippet($owner);

        $this->actingAs($otherUser)
            ->put(route('snippets.update', $snippet), [
                'title' => 'Compromised title',
                'description' => 'Compromised description',
                'code' => 'malicious();',
            ])
            ->assertForbidden();

        $snippet->refresh();

        $this->assertSame('Original title', $snippet->title);
        $this->assertSame('Original description', $snippet->description);
        $this->assertSame('echo true;', $snippet->code);
    }

    public function test_owner_can_move_their_snippet_to_trash(): void
    {
        $user = User::factory()->create();
        $snippet = $this->createSnippet($user);

        $this->actingAs($user)
            ->delete(route('snippets.destroy', $snippet))
            ->assertSuccessful();

        $this->assertSoftDeleted($snippet);
    }

    public function test_user_cannot_delete_another_users_snippet_or_remove_its_collection_links(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $snippet = $this->createSnippet($owner);
        $collection = Collection::factory()->for($owner)->create();
        $collection->snippets()->attach($snippet);

        $this->actingAs($otherUser)
            ->delete(route('snippets.destroy', $snippet))
            ->assertForbidden();

        $this->assertDatabaseHas('snippets', [
            'id' => $snippet->id,
            'deleted_at' => null,
        ]);
        $this->assertDatabaseHas('collection_snippet', [
            'collection_id' => $collection->id,
            'snippet_id' => $snippet->id,
        ]);
    }

    private function createSnippet(User $user): Snippet
    {
        $language = Language::firstOrCreate(
            ['slug' => 'php'],
            ['name' => 'PHP'],
        );

        return Snippet::create([
            'user_id' => $user->id,
            'language_id' => $language->id,
            'title' => 'Original title',
            'description' => 'Original description',
            'code' => 'echo true;',
            'visibility' => 'private',
        ]);
    }
}
