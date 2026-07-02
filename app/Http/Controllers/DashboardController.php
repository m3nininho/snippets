<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $snippets = Snippet::query()
            ->with(['language', 'tags', 'user'])
            ->where('visibility', 'public')
            ->latest();

        return Inertia::render('Dashboard', [
            'snippets' => $snippets->paginate(10),
        ]);
    }
}
