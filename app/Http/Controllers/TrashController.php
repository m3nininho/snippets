<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Inertia\Inertia;

class TrashController extends Controller
{
    public function index()
    {
        $snippets = Snippet::onlyTrashed()
            ->with(['language', 'tags', 'user'])
            ->latest('deleted_at')
            ->get();

        return inertia('Trash/Index', [
            'snippets' => $snippets,
        ]);
    }
}
