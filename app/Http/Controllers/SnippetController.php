<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Tag;
use App\Models\Snippet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SnippetController extends Controller
{
    public function index(Request $request)
    {
        $mySnippets = Snippet::query()
            ->with(['language', 'tags', 'user'])
            ->withExists([
                'favorites as is_favorited' => function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                },
            ])
            ->where('user_id', $request->user()->id)
            ->latest();

        return Inertia::render('Snippets/Index', [
            'mySnippets' => $mySnippets->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Snippets/Create');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'code' => ['required', 'string'],
            'language' => ['required', 'string'],
            'visibility' => ['required', 'in:public,private'],
            'tags' => ['nullable', 'string'],
        ]);

        $language = Language::where('slug', $validated['language'])->firstOrFail();

        $snippet = Snippet::create([
                'user_id' => $request->user()->id,
                'language_id' => $language->id,
                'title' => $validated['title'],
                'description' => $validated['description'],
                'code' => $validated['code'],
                'visibility' => $validated['visibility'],
            ]);

        if (!empty($validated['tags'])) {
            $tagIds = collect(explode(',', $validated['tags']))
                ->map(fn ($tag) => trim($tag))
                ->filter()
                ->map(function ($tag) {
                    return Tag::firstOrCreate(
                        ['slug' => Str::slug($tag)],
                        ['name' => $tag]
                    )->id;
            });

        $snippet->tags()->sync($tagIds);
    }

        return redirect()->route('snippets.index');
    }

    public function update(Request $request, Snippet $snippet)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'code' => ['required', 'string'],
        ]);

        $snippet->update($validated);

        return back();
    }
    public function destroy(Snippet $snippet)
    {
        $snippet->delete();
    }
}
