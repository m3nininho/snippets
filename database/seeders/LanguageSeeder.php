<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [
            ['name' => 'PHP', 'slug' => 'php', 'icon' => 'php', 'color' => 'bg-indigo-500'],
            ['name' => 'JavaScript', 'slug' => 'javascript', 'icon' => 'javascript', 'color' => 'bg-yellow-500'],
            ['name' => 'TypeScript', 'slug' => 'typescript', 'icon' => 'typescript', 'color' => 'bg-blue-500'],
            ['name' => 'Python', 'slug' => 'python', 'icon' => 'python', 'color' => 'bg-emerald-500'],
            ['name' => 'Go', 'slug' => 'go', 'icon' => 'go', 'color' => 'bg-cyan-500'],
        ];

        foreach ($languages as $language) {
            Language::updateOrCreate(
                ['slug' => $language['slug']],
                $language
            );
        }
    }
}
