<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TrashController extends Controller
{
    public function index()
    {
        return Inertia::render('Trash/Index');
    }
}
