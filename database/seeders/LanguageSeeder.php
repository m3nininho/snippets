<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [
            ['name' => 'PHP', 'slug' => 'php'],
            ['name' => 'JavaScript', 'slug' => 'javascript'],
            ['name' => 'TypeScript', 'slug' => 'typescript'],
            ['name' => 'Python', 'slug' => 'python'],
            ['name' => 'Go', 'slug' => 'go'],
        ];

        foreach ($languages as $language) {
            Language::firstOrCreate(
                ['slug' => $language['slug']],
                $language
            );
        }
    }
}
