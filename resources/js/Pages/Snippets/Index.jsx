import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import MySnippetsPanel from '@/Components/Snippets/MySnippetsPanel'
import SnippetDetailsModal from '@/Components/SnippetDetailsModal'
import SnippetTrashModal from '@/Components/SnippetTrashModal'

export default function Index() {
    const page = usePage().props
    const mySnippets = page.mySnippets
    const snippets = mySnippets?.data ?? mySnippets ?? []
    const user = page.auth?.user
    const [detailsModal, setDetailsModal] = useState({
        snippet: null,
        mode: 'view',
    })
    const [trashSnippet, setTrashSnippet] = useState(null)

    const openSnippetDetails = (snippet) => {
        setDetailsModal({
            snippet,
            mode: 'view',
        })
    }

    const openSnippetEditor = (snippet) => {
        setDetailsModal({
            snippet,
            mode: 'edit',
        })
    }

    const closeSnippetDetails = () => {
        setDetailsModal({
            snippet: null,
            mode: 'view',
        })
    }

    const openTrashConfirmation = (snippet) => {
        closeSnippetDetails()
        setTrashSnippet(snippet)
    }

    function handleDelete() {
        if (!trashSnippet) {
            return;
        }

        router.delete(`/snippets/${trashSnippet.id}`, {
            onSuccess: () => {
                setTrashSnippet(null);
            },
        });
    }

    return (
        <AppLayout
            overlays={(
                <>
                    <SnippetDetailsModal
                        snippet={detailsModal.snippet}
                        mode={detailsModal.mode}
                        onClose={closeSnippetDetails}
                    />

                    <SnippetTrashModal
                        snippet={trashSnippet}
                        onClose={() => setTrashSnippet(null)}
                        onConfirm={handleDelete}
                    />
                </>
            )}
        >
            <Head title="Meus Snippets" />

            <MySnippetsPanel
                snippets={snippets}
                user={user}
                onSnippetClick={openSnippetDetails}
                onEditClick={openSnippetEditor}
                onDeleteClick={openTrashConfirmation}
                pagination={mySnippets}
            />
        </AppLayout>
    )
}
