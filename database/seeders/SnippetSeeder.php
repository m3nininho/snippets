<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Language;
use App\Models\Snippet;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class SnippetSeeder extends Seeder
{
    public function run(): void
    {
        $testUser = User::where('email', 'test@example.com')->firstOrFail();
        $ana = User::where('email', 'ana@example.com')->firstOrFail();

        $languages = Language::query()
            ->get()
            ->keyBy('slug');

        $snippets = [
            [
                'user' => $testUser,
                'language' => 'javascript',
                'title' => 'Console em JavaScript',
                'description' => 'Snippet simples para validar saída no console.',
                'code' => 'console.log("oi")',
                'visibility' => 'public',
                'tags' => ['frontend', 'javascript', 'utils'],
            ],
            [
                'user' => $testUser,
                'language' => 'php',
                'title' => 'Dashboard com Inertia',
                'description' => 'Exemplo de controller retornando dados para uma dashboard Inertia.',
                'code' => <<<'PHP'
                public function index()
                {
                    return Inertia::render('Dashboard', [
                        'snippets' => Snippet::query()
                            ->with(['language', 'tags', 'user'])
                            ->latest()
                            ->paginate(10),
                    ]);
                }
                PHP,
                'visibility' => 'public',
                'tags' => ['php', 'laravel', 'inertia', 'dashboard'],
            ],
            [
                'user' => $testUser,
                'language' => 'typescript',
                'title' => 'Hook useDebounce',
                'description' => 'Hook para reduzir chamadas repetidas enquanto o usuário digita.',
                'code' => <<<'TS'
                import { useEffect, useState } from 'react'

                export function useDebounce(value: string, delay = 300) {
                    const [debouncedValue, setDebouncedValue] = useState(value)

                    useEffect(() => {
                        const timer = setTimeout(() => setDebouncedValue(value), delay)
                        return () => clearTimeout(timer)
                    }, [value, delay])

                    return debouncedValue
                }
                TS,
                'visibility' => 'private',
                'tags' => ['typescript', 'react', 'hooks', 'frontend'],
            ],
            [
                'user' => $testUser,
                'language' => 'php',
                'title' => 'Filtro Eloquent por busca',
                'description' => 'Query condicional usando when para filtros opcionais.',
                'code' => <<<'PHP'
                $snippets = Snippet::query()
                    ->when($request->search, function ($query, $search) {
                        $query->where('title', 'like', "%{$search}%");
                    })
                    ->latest()
                    ->paginate();
                PHP,
                'visibility' => 'public',
                'tags' => ['php', 'laravel', 'eloquent', 'backend'],
            ],
            [
                'user' => $testUser,
                'language' => 'typescript',
                'title' => 'Botão primário com React',
                'description' => 'Componente simples de botão reutilizável seguindo o visual do SnipVault.',
                'code' => <<<'TSX'
                export function PrimaryButton({ children, ...props }) {
                    return (
                        <button
                            className="rounded-2xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
                            {...props}
                        >
                            {children}
                        </button>
                    )
                }
                TSX,
                'visibility' => 'public',
                'tags' => ['typescript', 'react', 'frontend'],
            ],
            [
                'user' => $ana,
                'language' => 'python',
                'title' => 'Formatar JSON em Python',
                'description' => 'Utilitário rápido para imprimir JSON de forma legível.',
                'code' => <<<'PY'
                import json

                payload = {"status": "ok", "items": [1, 2, 3]}
                print(json.dumps(payload, indent=2, ensure_ascii=False))
                PY,
                'visibility' => 'public',
                'tags' => ['python', 'json', 'utils'],
            ],
            [
                'user' => $ana,
                'language' => 'go',
                'title' => 'Healthcheck HTTP em Go',
                'description' => 'Endpoint simples para verificar se o serviço está vivo.',
                'code' => <<<'GO'
                package main

                import (
                    "net/http"
                )

                func main() {
                    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
                        w.WriteHeader(http.StatusOK)
                        w.Write([]byte("ok"))
                    })

                    http.ListenAndServe(":8080", nil)
                }
                GO,
                'visibility' => 'public',
                'tags' => ['go', 'api', 'backend'],
            ],
        ];

        $createdSnippets = collect();


        foreach ($snippets as $data) {
            $snippet = Snippet::withTrashed()->updateOrCreate([
                'user_id' => $data['user']->id,
                'title' => $data['title'],
            ], [
                'language_id' => $languages->get($data['language'])->id,
                'description' => $data['description'],
                'code' => $data['code'],
                'visibility' => $data['visibility'],
                'deleted_at' => null,
            ]);

            $tagIds = Tag::whereIn('slug', $data['tags'])->pluck('id');
            $snippet->tags()->sync($tagIds);
            $createdSnippets->put($data['title'], $snippet);

        }

        Favorite::updateOrCreate([
            'user_id' => $ana->id,
            'snippet_id' => $createdSnippets
                ->get('Console em JavaScript')
                ->id,
        ]);

        Favorite::updateOrCreate([
            'user_id' => $ana->id,
            'snippet_id' => $createdSnippets
                ->get('Dashboard com Inertia')
                ->id,
        ]);

        Favorite::updateOrCreate([
            'user_id' => $testUser->id,
            'snippet_id' => $createdSnippets
                ->get('Formatar JSON em Python')
                ->id,
        ]);

        Favorite::updateOrCreate([
            'user_id' => $testUser->id,
            'snippet_id' => $createdSnippets
                ->get('Healthcheck HTTP em Go')
                ->id,
        ]);
    }
}
