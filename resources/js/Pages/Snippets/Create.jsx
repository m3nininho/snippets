import AppLayout from '@/Layouts/AppLayout'
import CodePreview from '@/Components/CodePreview'
import { Head, Link, useForm } from '@inertiajs/react'
import { Save } from 'lucide-react'
import { useMemo, useState } from 'react'

const languages = [
    { label: 'PHP', value: 'php' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Python', value: 'python' },
    { label: 'Go', value: 'go' },
]

export default function Create() {
     const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        language: 'javascript',
        visibility: 'private',
        tags: '',
        code: `console.log("novo snippet")`,
    })

    const tags = useMemo(() => {
        return data.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
    }, [data.tags])


    const submit = (event) => {
        event.preventDefault();

        post(route('snippets.store'))
    }

    return (
        <AppLayout>
            <Head title="Criar Snippet" />

            <form
                onSubmit={submit}
                className="space-y-8"
            >
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Criar Snippet
                        </h1>

                        <p className="mt-2 max-w-2xl text-zinc-400">
                            Cadastre um novo trecho de código e visualize o resultado antes de salvar.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route('snippets.index')}
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-zinc-300 transition hover:bg-white/10"
                        >
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500 disabled:opacity-50"
                        >
                            <Save size={18} />

                            {processing ? 'Salvando...' : 'Salvar snippet'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <section className="col-span-7 space-y-5 rounded-3xl border border-white/10 bg-[#0D1323] p-6">
                        <div className="grid gap-5 lg:grid-cols-2">
                            <label className="space-y-2">
                                <span className="text-sm text-zinc-500">
                                    Título
                                </span>

                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ex: Hook useDebounce"
                                    className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                                />
                            </label>

                            <label className="space-y-2">
                                <span className="text-sm text-zinc-500">
                                    Linguagem
                                </span>

                                <select
                                    value={data.language}
                                    onChange={(e) => setData('language', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none focus:border-violet-500"
                                >
                                    {languages.map((language) => (
                                        <option
                                            key={language.value}
                                            value={language.value}
                                        >
                                            {language.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <label className="block space-y-2">
                            <span className="text-sm text-zinc-500">
                                Descrição
                            </span>

                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                placeholder="Explique quando e por que usar esse snippet."
                                className="w-full resize-none rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                            />
                        </label>

                        <div className="grid gap-5 lg:grid-cols-2">
                            <label className="space-y-2">
                                <span className="text-sm text-zinc-500">
                                    Visibilidade
                                </span>

                                <select
                                    value={data.visibility}
                                    onChange={(e) => setData('visibility', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none focus:border-violet-500"
                                >
                                    <option value="private">Privado</option>
                                    <option value="public">Público</option>
                                </select>
                            </label>

                            <label className="space-y-2">
                                <span className="text-sm text-zinc-500">
                                    Tags
                                </span>

                                <input
                                    type="text"
                                    value={data.tags}
                                    onChange={(e) => setData('tags', e.target.value)}
                                    placeholder="react, hooks, frontend"
                                    className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                                />
                            </label>
                        </div>

                        <label className="block space-y-2">
                            <span className="text-sm text-zinc-500">
                                Código
                            </span>

                            <textarea
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                rows={15}
                                className="w-full resize-none rounded-2xl border border-white/10 bg-[#050816] p-5 font-mono text-sm text-zinc-100 outline-none focus:border-violet-500"
                            />
                        </label>
                    </section>

                    <aside className="col-span-5">
                        <div className="sticky top-0 space-y-5 rounded-3xl border border-white/10 bg-[#0D1323] p-6">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Preview
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {data.title || 'Novo snippet'}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-zinc-400">
                                    {languages.find((language) => language.value === data.language)?.label}
                                </span>

                                <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-zinc-400">
                                    {data.visibility === 'public' ? 'Público' : 'Privado'}
                                </span>

                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-white/5 px-3 py-1 text-sm text-zinc-400"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {data.description && (
                                <p className="leading-relaxed text-zinc-400">
                                    {data.description}
                                </p>
                            )}

                            <CodePreview
                                language={data.language}
                                code={data.code || '// seu código aparecerá aqui'}
                            />

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
                                Tela visual preparada. A ação de salvar será conectada ao backend depois.
                            </div>
                        </div>
                    </aside>
                </div>
            </form>
        </AppLayout>
    )
}
