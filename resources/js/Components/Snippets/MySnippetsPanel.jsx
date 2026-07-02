import { Pencil, Trash2 } from 'lucide-react'
import {
    getSnippetLanguageColor,
    getSnippetLanguageName,
} from '@/Support/snippetLanguage'
import { getSnippetTagLabel } from '@/Support/snippetTags'
import Pagination from '@/Components/Pagination'

export default function MySnippetsPanel({
    snippets = [],
    user,
    onSnippetClick = () => {},
    onEditClick = () => {},
    onDeleteClick = () => {},
    pagination,
}) {
    return (
        <div className="space-y-8">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Meus Snippets
                    </h1>

                    <p className="mt-2 max-w-2xl text-zinc-400">
                        {user?.name
                            ? `Snippets criados por ${user.name}.`
                            : 'Seus snippets criados aparecerão aqui.'}
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-right">
                    <p className="text-2xl font-semibold">
                        {snippets.length}
                    </p>
                    <p className="text-sm text-zinc-500">
                        cadastrados
                    </p>
                </div>
            </div>

            {snippets.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                    <h2 className="text-xl font-semibold">
                        Você ainda não criou snippets
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Quando criar um snippet, ele aparecerá nesta área.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {snippets.map((snippet) => (
                        <MySnippetCard
                            key={snippet.id ?? snippet.title}
                            snippet={snippet}
                            onClick={onSnippetClick}
                            onEditClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                        />
                    ))}
                </div>
            )}

            <Pagination pagination={pagination} />
        </div>
    )
}

function MySnippetCard({
    snippet,
    onClick,
    onEditClick,
    onDeleteClick,
}) {
    return (
        <article
            role="button"
            tabIndex={0}
            onClick={() => onClick(snippet)}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onClick(snippet)
                }
            }}
            className="cursor-pointer rounded-3xl border border-white/10 bg-[#0D1323] p-6 transition hover:border-violet-500/40 hover:bg-[#111827]"
        >
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getSnippetLanguageColor(snippet)}`} />

                    <span className="text-sm text-zinc-400">
                        {getSnippetLanguageName(snippet)}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            onEditClick(snippet)
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
                    >
                        <Pencil size={15} />
                        Editar
                    </button>

                    <button
                        type="button"
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            onDeleteClick(snippet)
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                    >
                        <Trash2 size={15} />
                        Excluir
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-semibold">
                {snippet.title}
            </h2>

            <p className="mt-3 leading-relaxed text-zinc-400">
                {snippet.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
                {(snippet.tags ?? []).map((tag) => {
                    const label = getSnippetTagLabel(tag)

                    return label ? (
                        <span
                            key={label}
                            className="rounded-full bg-white/5 px-3 py-1 text-sm text-zinc-400"
                        >
                            #{label}
                        </span>
                    ) : null
                })}
            </div>
        </article>
    )
}
