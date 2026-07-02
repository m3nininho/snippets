<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LanguageSeeder::class,
            TagSeeder::class,
        ]);

        User::updateOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Teste Dev',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        User::updateOrCreate([
            'email' => 'ana@example.com',
        ], [
            'name' => 'Ana Martins',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        $this->call([
            SnippetSeeder::class,
        ]);
    }
}
