<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Snippet;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class SnippetSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        $snippet = Snippet::create([
            'user_id' => $user->id,
            'language_id' => Language::where('slug', 'javascript')->first()->id,

            'title' => 'Console em JavaScript',
            'description' => 'Apenas um oi',

            'code' => 'console.log("oi")',

            'visibility' => 'public',
        ]);

        $snippet->tags()->attach(
            Tag::whereIn('slug', [
                'frontend',
                'javascript',
            ])->pluck('id')
        );
    }
}
