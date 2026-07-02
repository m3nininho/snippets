<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Collections/Index');
    }

    public function show(string $collection)
    {
        $collections = collect([
            ['name' => 'Frontend', 'slug' => 'frontend'],
            ['name' => 'Laravel', 'slug' => 'laravel'],
            ['name' => 'React', 'slug' => 'react'],
            ['name' => 'UI Inspirations', 'slug' => 'ui-inspirations'],
        ]);

        return Inertia::render('Collections/Show', [
            'collection' => $collections->firstWhere('slug', $collection) ?? [
                'name' => str($collection)->replace('-', ' ')->title()->toString(),
                'slug' => $collection,
            ],
        ]);
    }
}
