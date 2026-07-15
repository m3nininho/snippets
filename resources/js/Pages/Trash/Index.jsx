import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react'
import { useState } from 'react'
import SnippetDetailsModal from '@/Components/SnippetDetailsModal'
import TrashSnippetsPanel from '@/Components/Snippets/TrashSnippetsPanel'

export default function Index() {
    const page = usePage().props
    const snippets = page.snippets?.data ?? page.snippets ?? []
    const [detailsSnippet, setDetailsSnippet] = useState(null)

    return (
        <AppLayout
            overlays={(
                <SnippetDetailsModal
                    snippet={detailsSnippet}
                    onClose={() => setDetailsSnippet(null)}
                />
            )}
        >
            <Head title="Lixeira" />

            <TrashSnippetsPanel
                snippets={snippets}
                onSnippetClick={setDetailsSnippet}
            />
        </AppLayout>
    )
}
