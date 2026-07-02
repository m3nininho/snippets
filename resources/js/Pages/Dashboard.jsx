import AppLayout from '@/Layouts/AppLayout'
import { useEffect, useMemo, useState } from 'react'
import { Head, usePage } from '@inertiajs/react'
import DashboardHeader from '@/Components/Dashboard/DashboardHeader'
import SnippetList from '@/Components/Dashboard/SnippetList'
import SnippetPreviewPanel from '@/Components/Dashboard/SnippetPreviewPanel'
import SnippetSearchBar from '@/Components/Dashboard/SnippetSearchBar'
import SnippetDetailsModal from '@/Components/SnippetDetailsModal'
import { getSnippetAuthorName } from '@/Support/snippetAuthor'
import { getSnippetLanguageName } from '@/Support/snippetLanguage'

export default function Dashboard() {
    const {
        snippets: {
            data: snippets = [],
        } = {},
    } = usePage().props;

    const [previewSnippet, setPreviewSnippet] = useState(null);
    const [modalSnippet, setModalSnippet] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        language: '',
        title: '',
        author: '',
    })

    const languageOptions = useMemo(() => {
        return [...new Set(snippets.map(getSnippetLanguageName))]
            .filter((language) => language !== 'Linguagem')
            .sort()
    }, [snippets])

    const filteredSnippets = useMemo(() => {
        const search = filters.search.trim().toLowerCase()
        const title = filters.title.trim().toLowerCase()
        const author = filters.author.trim().toLowerCase()

        return snippets.filter((snippet) => {
            const snippetTitle = snippet.title?.toLowerCase() ?? ''
            const snippetLanguage = getSnippetLanguageName(snippet)
            const snippetAuthor = getSnippetAuthorName(snippet)

            const matchesSearch = !search || snippetTitle.includes(search)

            const matchesLanguage =
                !filters.language || snippetLanguage === filters.language

            const matchesTitle = !title || snippetTitle.includes(title)
            const matchesAuthor =
                !author || snippetAuthor.toLowerCase().includes(author)

            return matchesSearch && matchesLanguage && matchesTitle && matchesAuthor
        })
    }, [filters, snippets])

    useEffect(() => {
        if (!previewSnippet) {
            return
        }

        const previewKey = previewSnippet.id ?? previewSnippet.title
        const previewStillVisible = filteredSnippets.some((snippet) => {
            return (snippet.id ?? snippet.title) === previewKey
        })

        if (!previewStillVisible) {
            setPreviewSnippet(null)
        }
    }, [filteredSnippets, previewSnippet])

    const handleSearchChange = (value) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            search: value,
        }))
    }

    const applyAdvancedFilters = (advancedFilters) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            ...advancedFilters,
        }))
    }

    const clearFilters = () => {
        setFilters({
            search: '',
            language: '',
            title: '',
            author: '',
        })
    }

    const handleSnippetPreview = (snippet) => {
        setPreviewSnippet((currentSnippet) => {
            const currentKey = currentSnippet?.id ?? currentSnippet?.title
            const nextKey = snippet?.id ?? snippet?.title

            return currentKey === nextKey ? null : snippet
        })
    }

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <DashboardHeader />
                <SnippetSearchBar
                    filters={filters}
                    languageOptions={languageOptions}
                    onSearchChange={handleSearchChange}
                    onAdvancedFiltersApply={applyAdvancedFilters}
                    onClearFilters={clearFilters}
                />

                <div className="grid grid-cols-12 gap-6">
                    <SnippetList
                        snippets={filteredSnippets}
                        onSnippetClick={handleSnippetPreview}
                        activeSnippet={previewSnippet}
                    />

                    <SnippetPreviewPanel
                        snippet={previewSnippet}
                        onViewMoreClick={setModalSnippet}
                    />
                </div>
            </div>

            <SnippetDetailsModal
                snippet={modalSnippet}
                onClose={() => setModalSnippet(null)}
            />
        </AppLayout>
    );
}
