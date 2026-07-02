<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TagController extends Controller
{
    public function index()
    {
        return Inertia::render('Tags/Index');
    }
}
