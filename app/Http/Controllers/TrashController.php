<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;

class TrashController extends Controller
{
    public function index(Request $request)
    {
        $snippets = Snippet::onlyTrashed()
            ->with(['language', 'tags', 'user:id,name'])
            ->where('user_id', $request->user()->id)
            ->latest('deleted_at')
            ->get();

        return inertia('Trash/Index', [
            'snippets' => $snippets,
        ]);
    }
}
