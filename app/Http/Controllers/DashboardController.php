<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $snippets = Snippet::query()
            ->with(['language', 'tags', 'user:id,name'])
            ->withExists([
                'favorites as is_favorited' => function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                },
            ])
            ->where('visibility', 'public')
            ->latest();

        return Inertia::render('Dashboard', [
            'snippets' => $snippets->paginate(10),
        ]);
    }
}
