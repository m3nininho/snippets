import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react'
import SnippetList from '@/Components/Dashboard/SnippetList'

export default function Index() {
    const page = usePage().props
    const favorites = page.favorites
    const snippets = favorites?.data ?? []

    return (
        <AppLayout>
            <Head title="Favoritos" />

            <SnippetList
                snippets={snippets}
                pagination={favorites}
            />
        </AppLayout>
    )
}
