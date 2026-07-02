<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SnippetController extends Controller
{
    public function index(Request $request)
    {
        $mySnippets = Snippet::query()
            ->with(['language', 'tags', 'user'])
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
}
