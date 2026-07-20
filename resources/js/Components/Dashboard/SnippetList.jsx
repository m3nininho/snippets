import SnippetCard from '@/Components/SnippetCard'
import Pagination from '@/Components/Pagination'

export default function SnippetList({ snippets = [], onSnippetClick, activeSnippet, pagination }) {
    if (snippets.length === 0) {
        return (
            <div className="col-span-8 rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                <h2 className="text-xl font-semibold">
                    Nenhum snippet encontrado
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                    Ajuste a busca ou limpe os filtros para ver outros snippets.
                </p>
            </div>
        )
    }

    return (
        <div className="col-span-8 space-y-4">
            {snippets.map((snippet) => (
                <SnippetCard
                    key={snippet.id}
                    snippet={snippet}
                    onClick={onSnippetClick}
                    active={(activeSnippet?.id ?? activeSnippet?.title) === (snippet.id ?? snippet.title)}
                />
            ))}

            <Pagination pagination={pagination} />
        </div>
    )
}
