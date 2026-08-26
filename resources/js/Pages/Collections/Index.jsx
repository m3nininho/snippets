import CollectionDeleteModal from '@/Components/Collections/CollectionDeleteModal'
import CollectionDetailsModal from '@/Components/Collections/CollectionDetailsModal'
import CollectionFormModal from '@/Components/Collections/CollectionFormModal'
import Dropdown from '@/Components/Dropdown'
import SnippetDetailsModal from '@/Components/SnippetDetailsModal'
import AppLayout from '@/Layouts/AppLayout'
import { getCollectionColor } from '@/Support/collectionColors'
import { Head, router } from '@inertiajs/react'
import { ExternalLink, Folder, LoaderCircle, MoreHorizontal, Pencil, Search, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

export default function Index({ collections = [], selectedCollection = null, availableSnippets = [], openCreate = false }) {
    const [search, setSearch] = useState('')
    const [creating, setCreating] = useState(openCreate)
    const [editingCollection, setEditingCollection] = useState(null)
    const [deletingCollection, setDeletingCollection] = useState(null)
    const [openingCollectionId, setOpeningCollectionId] = useState(null)
    const [detailsDismissed, setDetailsDismissed] = useState(false)
    const [detailsSnippet, setDetailsSnippet] = useState(null)

    useEffect(() => {
        if (openCreate) setCreating(true)
    }, [openCreate])

    useEffect(() => {
        setDetailsDismissed(false)
    }, [selectedCollection?.id])

    const filteredCollections = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        if (!normalizedSearch) return collections

        return collections.filter((collection) => {
            return [collection.name, collection.description]
                .some((value) => value?.toLowerCase().includes(normalizedSearch))
        })
    }, [collections, search])

    const openCollection = (collection) => {
        setOpeningCollectionId(collection.id)
        router.get(route('collections.show', collection.id), {}, {
            preserveScroll: true,
            onFinish: () => setOpeningCollectionId(null),
        })
    }

    const closeCollection = () => {
        setDetailsDismissed(true)
        router.get(route('collections.index'), {}, { preserveScroll: true })
    }

    return (
        <AppLayout
            overlays={(
                <>
                    <CollectionFormModal
                        show={creating}
                        onClose={() => setCreating(false)}
                    />
                    <CollectionFormModal
                        show={Boolean(editingCollection)}
                        collection={editingCollection}
                        onClose={() => setEditingCollection(null)}
                    />
                    <CollectionDeleteModal
                        collection={deletingCollection}
                        onClose={() => setDeletingCollection(null)}
                    />
                    <CollectionDetailsModal
                        collection={selectedCollection}
                        availableSnippets={availableSnippets}
                        show={Boolean(selectedCollection) && !detailsDismissed && !detailsSnippet}
                        onClose={closeCollection}
                        onViewSnippet={setDetailsSnippet}
                    />
                    <SnippetDetailsModal
                        snippet={detailsSnippet}
                        mode="view"
                        onClose={() => setDetailsSnippet(null)}
                    />
                </>
            )}
        >
            <Head title="Coleções" />

            <div className="space-y-8">
                <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Coleções</h1>
                        <p className="mt-2 max-w-2xl text-zinc-400">
                            Organize seus snippets por assunto ou projeto.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
                        <button type="button" onClick={() => setCreating(true)} className="w-fit shrink-0 rounded-2xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500">
                            Nova coleção
                        </button>
                        <div className="min-w-28 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-right">
                            <p className="text-2xl font-semibold">{collections.length}</p>
                            <p className="text-sm text-zinc-500">coleções</p>
                        </div>
                    </div>
                </header>

                {collections.length > 0 ? (
                    <section className="space-y-6">
                        <div className="relative w-full sm:max-w-sm">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center text-zinc-500">
                                <Search size={18} />
                            </span>
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar coleção..."
                                aria-label="Buscar coleção"
                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-5 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500 focus:ring-0"
                            />
                        </div>

                        {filteredCollections.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                {filteredCollections.map((collection) => (
                                    <CollectionCard
                                        key={collection.id}
                                        collection={collection}
                                        loading={openingCollectionId === collection.id}
                                        onOpen={() => openCollection(collection)}
                                        onEdit={() => setEditingCollection(collection)}
                                        onDelete={() => setDeletingCollection(collection)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="Nenhuma coleção encontrada"
                                description="Tente buscar por outro nome ou descrição."
                            />
                        )}
                    </section>
                ) : (
                    <EmptyState
                        title="Nenhuma coleção ainda"
                        description="Crie sua primeira coleção para organizar seus snippets."
                        action="Criar coleção"
                        onAction={() => setCreating(true)}
                    />
                )}
            </div>
        </AppLayout>
    )
}

function CollectionCard({ collection, loading, onOpen, onEdit, onDelete }) {
    const color = getCollectionColor(collection.color)
    const updatedAt = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(collection.updated_at))

    return (
        <article
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onOpen()
                }
            }}
            className="flex h-full min-h-52 cursor-pointer flex-col rounded-3xl border border-white/10 bg-[#0D1323] p-6 transition hover:border-violet-500/40 hover:bg-[#111827]"
        >
            <div className="flex items-start justify-between gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${color.background}`}>
                    {loading
                        ? <LoaderCircle size={20} className={`${color.icon} animate-spin`} />
                        : <Folder size={20} className={color.icon} />}
                </div>

                <div onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button type="button" aria-label={`Opções da coleção ${collection.name}`} className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white">
                                <MoreHorizontal size={19} />
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="right" width="48" contentClasses="rounded-2xl border border-white/10 bg-[#151C2C] p-1.5 shadow-xl shadow-black/30">
                            <CollectionAction onClick={onOpen} icon={ExternalLink}>Abrir coleção</CollectionAction>
                            <CollectionAction onClick={onEdit} icon={Pencil}>Editar coleção</CollectionAction>
                            <CollectionAction onClick={onDelete} icon={Trash2} danger>Excluir</CollectionAction>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <span className={`h-3 w-3 shrink-0 rounded-full ${color.dot}`} />
                <h2 className="min-w-0 truncate text-2xl font-semibold">{collection.name}</h2>
            </div>
            <p className="mt-3 line-clamp-2 leading-relaxed text-zinc-400">
                {collection.description || 'Sem descrição.'}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-6 text-sm text-zinc-500">
                <span>{collection.snippets_count} snippets</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-zinc-600" />
                <span>Atualizada em {updatedAt}</span>
            </div>
        </article>
    )
}

function CollectionAction({ icon: Icon, danger = false, children, onClick }) {
    return (
        <button type="button" onClick={onClick} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-white/5 ${danger ? 'text-red-300' : 'text-zinc-300'}`}>
            <Icon size={15} />
            {children}
        </button>
    )
}

function EmptyState({ title, description, action, onAction }) {
    return (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-zinc-500">{description}</p>
            {action && (
                <button type="button" onClick={onAction} className="mt-5 rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium transition hover:bg-violet-500">
                    {action}
                </button>
            )}
        </div>
    )
}
