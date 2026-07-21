import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react'
import { useState } from 'react'
import FavoriteSnippetsPanel from '@/Components/Favorites/FavoriteSnippetsPanel'
import SnippetPreviewPanel from '@/Components/Dashboard/SnippetPreviewPanel'
import SnippetDetailsModal from '@/Components/SnippetDetailsModal'

export default function Index() {
    const page = usePage().props
    const favorites = page.favorites
    const snippets = favorites?.data ?? []
    const user = page.auth?.user
    const [previewSnippet, setPreviewSnippet] = useState(null)
    const [detailsModal, setDetailsModal] = useState({
        snippet: null,
        mode: 'view',
    })

    const handleSnippetPreview = (snippet) => {
        setPreviewSnippet((currentSnippet) => {
            const currentKey = currentSnippet?.id ?? currentSnippet?.title
            const nextKey = snippet?.id ?? snippet?.title

            return currentKey === nextKey ? null : snippet
        })
    }

    const openSnippetDetails = (snippet) => {
        setDetailsModal({
            snippet,
            mode: 'view',
        })
    }

    const closeSnippetDetails = () => {
        setDetailsModal({
            snippet: null,
            mode: 'view',
        })
    }

    const handleFavoriteRemoved = (snippet) => {
        const previewKey = previewSnippet?.id ?? previewSnippet?.title
        const removedKey = snippet?.id ?? snippet?.title

        if (previewKey === removedKey) {
            setPreviewSnippet(null)
        }
    }

    return (
        <AppLayout
            overlays={(
                <SnippetDetailsModal
                    snippet={detailsModal.snippet}
                    mode={detailsModal.mode}
                    onClose={closeSnippetDetails}
                />
            )}
        >
            <Head title="Favoritos" />

            <div className="space-y-8">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Favoritos
                        </h1>

                        <p className="mt-2 max-w-2xl text-zinc-400">
                            {user?.name
                                ? `Snippets favoritados por ${user.name}.`
                                : 'Seus snippets favoritos aparecerão aqui.'}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-right">
                        <p className="text-2xl font-semibold">
                            {snippets.length}
                        </p>
                        <p className="text-sm text-zinc-500">
                            favoritos
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <FavoriteSnippetsPanel
                        snippets={snippets}
                        onSnippetClick={handleSnippetPreview}
                        onFavoriteRemoved={handleFavoriteRemoved}
                        activeSnippet={previewSnippet}
                        pagination={favorites}
                    />

                    <SnippetPreviewPanel
                        snippet={previewSnippet}
                        onViewMoreClick={openSnippetDetails}
                    />
                </div>
            </div>
        </AppLayout>
    )
}
