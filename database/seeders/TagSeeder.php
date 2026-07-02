<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'php',
            'laravel',
            'javascript',
            'typescript',
            'react',
            'vue',
            'api',
            'frontend',
            'backend',
        ];

        foreach ($tags as $tag) {
            Tag::firstOrCreate([
                'slug' => $tag,
            ], [
                'name' => ucfirst($tag),
                'slug' => $tag,
            ]);
        }
    }
}
