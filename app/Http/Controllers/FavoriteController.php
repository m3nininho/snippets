<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        return Inertia::render('Favorites/Index');
    }
}
