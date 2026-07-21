import { router } from '@inertiajs/react'
import { Star } from 'lucide-react'
import {
    getSnippetLanguageColor,
    getSnippetLanguageName,
} from '@/Support/snippetLanguage'
import { getSnippetTagLabel } from '@/Support/snippetTags'
import Pagination from '@/Components/Pagination'

export default function FavoriteSnippetsPanel({
    snippets = [],
    onSnippetClick = () => {},
    onFavoriteRemoved = () => {},
    activeSnippet,
    pagination,
}) {
    return (
        <div className="col-span-8 space-y-4">
            {snippets.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                    <h2 className="text-xl font-semibold">
                        Você ainda não favoritou snippets
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Quando favoritar um snippet, ele aparecerá nesta área.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {snippets.map((snippet) => (
                        <FavoriteSnippetCard
                            key={snippet.id ?? snippet.title}
                            snippet={snippet}
                            onClick={onSnippetClick}
                            onFavoriteRemoved={onFavoriteRemoved}
                            active={(activeSnippet?.id ?? activeSnippet?.title) === (snippet.id ?? snippet.title)}
                        />
                    ))}
                </div>
            )}

            <Pagination pagination={pagination} />
        </div>
    )
}

function FavoriteSnippetCard({
    snippet,
    onClick,
    onFavoriteRemoved,
    active = false,
}) {
    function handleRemoveFavorite() {
        if (!window.confirm('Deseja remover este snippet dos favoritos?')) {
            return
        }

        router.post(`/favorites/${snippet.id}`, {}, {
            onSuccess: () => onFavoriteRemoved(snippet),
        })
    }

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
            className={`cursor-pointer rounded-3xl border p-6 transition ${
                active
                    ? 'border-violet-500/70 bg-[#111827] shadow-lg shadow-violet-600/10'
                    : 'border-white/10 bg-[#0D1323] hover:border-violet-500/40 hover:bg-[#111827]'
            }`}
        >
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getSnippetLanguageColor(snippet)}`} />

                    <span className="text-sm text-zinc-400">
                        {getSnippetLanguageName(snippet)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        handleRemoveFavorite()
                    }}
                    className="text-yellow-400 transition hover:text-yellow-300"
                    aria-label="Remover dos favoritos"
                >
                    <Star
                        size={18}
                        fill="currentColor"
                    />
                </button>
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
