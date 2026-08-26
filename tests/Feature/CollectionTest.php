<?php

namespace Tests\Feature;

use App\Models\Collection;
use App\Models\Language;
use App\Models\Snippet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CollectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_a_collection(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('collections.store'), [
            'name' => 'Backend',
            'description' => 'APIs e regras de negócio.',
            'color' => 'blue',
        ]);

        $response->assertRedirect(route('collections.index'));
        $this->assertDatabaseHas('collections', [
            'user_id' => $user->id,
            'name' => 'Backend',
            'color' => 'blue',
        ]);
    }

    public function test_user_can_update_their_collection(): void
    {
        $user = User::factory()->create();
        $collection = Collection::factory()->for($user)->create();

        $response = $this->actingAs($user)->patch(route('collections.update', $collection), [
            'name' => 'Backend atualizado',
            'description' => 'Descrição atualizada.',
            'color' => 'emerald',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('collections', [
            'id' => $collection->id,
            'name' => 'Backend atualizado',
            'color' => 'emerald',
        ]);
    }

    public function test_user_cannot_access_or_change_another_users_collection(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $collection = Collection::factory()->for($owner)->create();
        $payload = [
            'name' => 'Invadida',
            'description' => null,
            'color' => 'red',
        ];

        $this->actingAs($otherUser)
            ->get(route('collections.show', $collection))
            ->assertForbidden();

        $this->actingAs($otherUser)
            ->patch(route('collections.update', $collection), $payload)
            ->assertForbidden();

        $this->actingAs($otherUser)
            ->delete(route('collections.destroy', $collection))
            ->assertForbidden();
    }

    public function test_user_can_add_their_snippets_without_creating_duplicate_links(): void
    {
        $user = User::factory()->create();
        $collection = Collection::factory()->for($user)->create();
        $snippet = $this->createSnippet($user);

        $this->actingAs($user)
            ->post(route('collections.snippets.store', $collection), ['snippet_ids' => [$snippet->id]])
            ->assertSessionHasNoErrors();

        $this->actingAs($user)
            ->post(route('collections.snippets.store', $collection), ['snippet_ids' => [$snippet->id]])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseCount('collection_snippet', 1);
        $this->assertSame(1, $collection->snippets()->count());
    }

    public function test_user_cannot_add_another_users_snippet(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $collection = Collection::factory()->for($user)->create();
        $foreignSnippet = $this->createSnippet($otherUser);

        $this->actingAs($user)
            ->post(route('collections.snippets.store', $collection), [
                'snippet_ids' => [$foreignSnippet->id],
            ])
            ->assertSessionHasErrors('snippet_ids.0');

        $this->assertDatabaseEmpty('collection_snippet');
    }

    public function test_deleting_a_collection_preserves_its_snippets(): void
    {
        $user = User::factory()->create();
        $collection = Collection::factory()->for($user)->create();
        $snippet = $this->createSnippet($user);
        $collection->snippets()->attach($snippet);

        $this->actingAs($user)
            ->delete(route('collections.destroy', $collection))
            ->assertRedirect(route('collections.index'));

        $this->assertDatabaseMissing('collections', ['id' => $collection->id]);
        $this->assertDatabaseMissing('collection_snippet', ['collection_id' => $collection->id]);
        $this->assertDatabaseHas('snippets', ['id' => $snippet->id]);
    }

    public function test_deleting_a_snippet_removes_its_collection_links(): void
    {
        $user = User::factory()->create();
        $collection = Collection::factory()->for($user)->create();
        $snippet = $this->createSnippet($user);
        $collection->snippets()->attach($snippet);

        $snippet->delete();

        $this->assertSoftDeleted($snippet);
        $this->assertDatabaseMissing('collection_snippet', ['snippet_id' => $snippet->id]);
    }

    public function test_user_can_remove_a_snippet_from_a_collection_without_deleting_it(): void
    {
        $user = User::factory()->create();
        $collection = Collection::factory()->for($user)->create();
        $snippet = $this->createSnippet($user);
        $collection->snippets()->attach($snippet);

        $this->actingAs($user)
            ->delete(route('collections.snippets.destroy', [$collection, $snippet]))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('collection_snippet', ['snippet_id' => $snippet->id]);
        $this->assertDatabaseHas('snippets', ['id' => $snippet->id, 'deleted_at' => null]);
    }

    public function test_collection_counts_are_returned_to_page_and_sidebar(): void
    {
        $user = User::factory()->create();
        $collection = Collection::factory()->for($user)->create();
        $collection->snippets()->attach([
            $this->createSnippet($user)->id,
            $this->createSnippet($user)->id,
        ]);

        $this->actingAs($user)
            ->get(route('collections.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Collections/Index')
                ->where('collections.0.snippets_count', 2)
                ->where('sidebarCollections.0.snippets_count', 2));
    }

    private function createSnippet(User $user): Snippet
    {
        $language = Language::firstOrCreate(
            ['slug' => 'php'],
            ['name' => 'PHP', 'color' => 'bg-indigo-500'],
        );

        return Snippet::create([
            'user_id' => $user->id,
            'language_id' => $language->id,
            'title' => fake()->unique()->sentence(3),
            'description' => fake()->sentence(),
            'code' => '<?php echo true;',
            'visibility' => 'private',
        ]);
    }
}
