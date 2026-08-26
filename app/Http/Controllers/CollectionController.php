<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddCollectionSnippetsRequest;
use App\Http\Requests\StoreCollectionRequest;
use App\Http\Requests\UpdateCollectionRequest;
use App\Models\Collection;
use App\Models\Snippet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Collections/Index', $this->pageProps($request));
    }

    public function show(Request $request, Collection $collection)
    {
        Gate::authorize('view', $collection);

        $collection->load([
            'snippets' => fn ($query) => $query
                ->with(['language', 'tags', 'user'])
                ->withExists([
                    'favorites as is_favorited' => fn ($favoriteQuery) => $favoriteQuery
                        ->where('user_id', $request->user()->id),
                ])
                ->latest('snippets.created_at'),
        ])->loadCount('snippets');

        return Inertia::render('Collections/Index', $this->pageProps($request, $collection));
    }

    public function store(StoreCollectionRequest $request)
    {
        $request->user()->collections()->create($request->validated());

        return redirect()
            ->route('collections.index')
            ->with('success', 'Coleção criada com sucesso.');
    }

    public function update(UpdateCollectionRequest $request, Collection $collection)
    {
        $collection->update($request->validated());

        return back()->with('success', 'Coleção atualizada com sucesso.');
    }

    public function destroy(Request $request, Collection $collection)
    {
        Gate::authorize('delete', $collection);
        $collection->delete();

        return redirect()
            ->route('collections.index')
            ->with('success', 'Coleção excluída. Seus snippets foram preservados.');
    }

    public function addSnippets(AddCollectionSnippetsRequest $request, Collection $collection)
    {
        $collection->snippets()->syncWithoutDetaching($request->validated('snippet_ids'));

        return back()->with('success', 'Snippets adicionados à coleção.');
    }

    public function removeSnippet(Request $request, Collection $collection, Snippet $snippet)
    {
        Gate::authorize('update', $collection);
        abort_unless($snippet->user_id === $request->user()->id, 403);

        $collection->snippets()->detach($snippet->id);

        return back()->with('success', 'Snippet removido da coleção.');
    }

    private function pageProps(Request $request, ?Collection $selectedCollection = null): array
    {
        return [
            'collections' => $request->user()
                ->collections()
                ->withCount('snippets')
                ->latest('updated_at')
                ->get(),
            'selectedCollection' => $selectedCollection,
            'availableSnippets' => $selectedCollection
                ? $request->user()
                    ->snippets()
                    ->with(['language', 'tags'])
                    ->latest()
                    ->get()
                : [],
            'openCreate' => $request->boolean('create'),
        ];
    }
}
