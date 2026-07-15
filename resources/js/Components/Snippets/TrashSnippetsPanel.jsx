import { Trash2 } from 'lucide-react'
import { getSnippetLanguageColor, getSnippetLanguageName } from '@/Support/snippetLanguage'
import { getSnippetTagLabel } from '@/Support/snippetTags'

export default function TrashSnippetsPanel({ snippets = [], onSnippetClick = () => {} }) {
    return (
        <div className="space-y-8">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Lixeira
                    </h1>

                    <p className="mt-2 max-w-2xl text-zinc-400">
                        Snippets excluídos ficam disponíveis aqui.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-right">
                    <p className="text-2xl font-semibold">
                        {snippets.length}
                    </p>
                    <p className="text-sm text-zinc-500">
                        na lixeira
                    </p>
                </div>
            </div>

            {snippets.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                    <h2 className="text-xl font-semibold">
                        A lixeira está vazia
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Snippets movidos para a lixeira aparecerão nesta área.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {snippets.map((snippet) => (
                        <TrashSnippetCard
                            key={snippet.id ?? snippet.title}
                            snippet={snippet}
                            onClick={onSnippetClick}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function TrashSnippetCard({ snippet, onClick }) {
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

                <div className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
                    <Trash2 size={15} />
                    Excluído
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
