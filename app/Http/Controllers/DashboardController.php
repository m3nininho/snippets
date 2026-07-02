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
            ->with(['language', 'tags', 'user'])
            ->where('visibility', 'public')
            ->latest();

        $mySnippets = Snippet::query()
            ->with(['language', 'tags', 'user'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->limit(12)
            ->get();

        return Inertia::render('Dashboard', [
            'snippets' => $snippets->paginate(10),
            'mySnippets' => $mySnippets,
        ]);
    }
}
