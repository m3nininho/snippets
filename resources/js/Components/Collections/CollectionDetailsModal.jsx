import AddSnippetsModal from '@/Components/Collections/AddSnippetsModal'
import DarkModal from '@/Components/DarkModal'
import { getCollectionColor } from '@/Support/collectionColors'
import { getSnippetLanguageName } from '@/Support/snippetLanguage'
import { DialogTitle } from '@headlessui/react'
import { router } from '@inertiajs/react'
import { Folder, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'

export default function CollectionDetailsModal({ collection, availableSnippets, show, onClose, onViewSnippet }) {
    const [addingSnippets, setAddingSnippets] = useState(false)
    const color = getCollectionColor(collection?.color)
    const snippets = collection?.snippets ?? []

    const removeSnippet = (snippet) => {
        if (!window.confirm(`Remover “${snippet.title}” desta coleção?`)) return

        router.delete(route('collections.snippets.destroy', [collection.id, snippet.id]), {
            preserveScroll: true,
        })
    }

    return (
        <>
            <DarkModal show={show && !addingSnippets} onClose={onClose} maxWidth="2xl">
                {collection && (
                    <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${color.background}`}>
                                    <Folder size={20} className={color.icon} />
                                </div>
                                <div className="min-w-0">
                                    <DialogTitle className="truncate text-2xl font-semibold">{collection.name}</DialogTitle>
                                    <p className="mt-1 text-sm text-zinc-500">{collection.snippets_count} snippets na coleção</p>
                                </div>
                            </div>

                            <button type="button" onClick={onClose} aria-label="Fechar" className="shrink-0 rounded-xl bg-white/5 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                            <p className="text-sm text-zinc-500">Snippets desta coleção</p>
                            <button type="button" onClick={() => setAddingSnippets(true)} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium transition hover:bg-violet-500">
                                <Plus size={16} />
                                Adicionar snippets
                            </button>
                        </div>

                        {snippets.length > 0 ? (
                            <div className="mt-4 max-h-[50vh] space-y-3 overflow-y-auto pr-1">
                                {snippets.map((snippet) => (
                                    <div key={snippet.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/5">
                                        <div className="min-w-0">
                                            <p className="truncate font-medium">{snippet.title}</p>
                                            <p className="mt-1 text-xs text-zinc-500">{getSnippetLanguageName(snippet)}</p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-2">
                                            <button type="button" onClick={() => onViewSnippet(snippet)} className="rounded-xl px-3 py-2 text-sm text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300">
                                                Visualizar
                                            </button>
                                            <button type="button" onClick={() => removeSnippet(snippet)} aria-label={`Remover ${snippet.title} da coleção`} className="rounded-xl p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-300">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4 rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
                                <h3 className="text-lg font-semibold">Esta coleção está vazia</h3>
                                <p className="mt-2 text-sm text-zinc-500">Adicione snippets existentes para começar a organizá-la.</p>
                                <button type="button" onClick={() => setAddingSnippets(true)} className="mt-5 rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium transition hover:bg-violet-500">
                                    Adicionar snippets
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </DarkModal>

            <AddSnippetsModal
                collection={collection}
                snippets={availableSnippets}
                show={Boolean(collection) && addingSnippets}
                onClose={() => setAddingSnippets(false)}
            />
        </>
    )
}
