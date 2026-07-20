<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Snippet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favorites = Snippet::query()
            ->with(['language', 'tags', 'user'])
            ->withExists([
                'favorites as is_favorited' => function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                },
            ])
            ->whereHas('favorites', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Favorites/Index', [
            'favorites' => $favorites,
        ]);
    }
    public function store(Request $request, Snippet $snippet)
    {
        $favorite = Favorite::where([
            'user_id' => $request->user()->id,
            'snippet_id' => $snippet->id,
        ])->first();

        if ($favorite) {
            $favorite->delete();
        } else {
            Favorite::create([
                'user_id' => $request->user()->id,
                'snippet_id' => $snippet->id,
            ]);
        }

        return back();
    }
}
