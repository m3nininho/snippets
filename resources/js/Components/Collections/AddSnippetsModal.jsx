import DarkModal from '@/Components/DarkModal'
import InputError from '@/Components/InputError'
import { getSnippetLanguageName } from '@/Support/snippetLanguage'
import { getSnippetTagLabel } from '@/Support/snippetTags'
import { DialogTitle } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function AddSnippetsModal({ collection, snippets = [], show, onClose }) {
    const [search, setSearch] = useState('')
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        snippet_ids: [],
    })
    const attachedIds = useMemo(() => new Set(
        (collection?.snippets ?? []).map((snippet) => snippet.id),
    ), [collection])
    const filteredSnippets = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        if (!normalizedSearch) return snippets

        return snippets.filter((snippet) => {
            return [snippet.title, getSnippetLanguageName(snippet)]
                .some((value) => value?.toLowerCase().includes(normalizedSearch))
        })
    }, [search, snippets])

    const close = () => {
        setSearch('')
        reset()
        clearErrors()
        onClose()
    }

    const toggleSnippet = (snippetId) => {
        setData('snippet_ids', data.snippet_ids.includes(snippetId)
            ? data.snippet_ids.filter((id) => id !== snippetId)
            : [...data.snippet_ids, snippetId])
    }

    const submit = (event) => {
        event.preventDefault()
        post(route('collections.snippets.store', collection.id), {
            preserveScroll: true,
            onSuccess: close,
        })
    }

    return (
        <DarkModal show={show} onClose={close} maxWidth="2xl">
            {collection && (
                <form onSubmit={submit} className="flex max-h-[min(80vh,48rem)] flex-col">
                    <div className="border-b border-white/10 p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <DialogTitle className="text-2xl font-semibold">Adicionar snippets</DialogTitle>
                                <p className="mt-1 text-sm text-zinc-500">Selecione snippets existentes para “{collection.name}”.</p>
                            </div>
                            <button type="button" onClick={close} aria-label="Fechar" className="rounded-xl bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="relative mt-5">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-zinc-500">
                                <Search size={17} />
                            </span>
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar snippets..."
                                className="w-full rounded-2xl border border-white/10 bg-[#070B14] py-3 pl-11 pr-4 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500 focus:ring-0"
                            />
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5 sm:p-6">
                        {filteredSnippets.length > 0 ? filteredSnippets.map((snippet) => {
                            const attached = attachedIds.has(snippet.id)
                            const selected = attached || data.snippet_ids.includes(snippet.id)

                            return (
                                <label key={snippet.id} className={`flex items-start gap-3 rounded-2xl border p-4 transition ${
                                    attached
                                        ? 'cursor-default border-white/5 bg-white/[0.02] opacity-60'
                                        : 'cursor-pointer border-white/10 bg-white/[0.03] hover:bg-white/5'
                                }`}>
                                    <input
                                        type="checkbox"
                                        checked={selected}
                                        disabled={attached}
                                        onChange={() => toggleSnippet(snippet.id)}
                                        className="mt-1 rounded border-white/20 bg-[#070B14] text-violet-600 focus:ring-violet-500"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-medium text-zinc-100">{snippet.title}</p>
                                            {attached && <span className="text-xs text-emerald-400">Já adicionado</span>}
                                        </div>
                                        <p className="mt-1 text-xs text-zinc-500">{getSnippetLanguageName(snippet)}</p>
                                        {(snippet.tags ?? []).length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {snippet.tags.map((tag) => (
                                                    <span key={tag.id ?? getSnippetTagLabel(tag)} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-500">
                                                        #{getSnippetTagLabel(tag)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </label>
                            )
                        }) : (
                            <div className="py-10 text-center text-sm text-zinc-500">
                                Nenhum snippet encontrado.
                            </div>
                        )}

                        <InputError message={errors.snippet_ids} />
                    </div>

                    <div className="flex justify-end gap-3 border-t border-white/10 p-5 sm:px-6">
                        <button type="button" onClick={close} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/10">
                            Cancelar
                        </button>
                        <button type="submit" disabled={processing || data.snippet_ids.length === 0} className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50">
                            Adicionar selecionados
                        </button>
                    </div>
                </form>
            )}
        </DarkModal>
    )
}
