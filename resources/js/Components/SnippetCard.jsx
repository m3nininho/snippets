import { Star } from 'lucide-react'
import {
    getSnippetLanguageColor,
    getSnippetLanguageName,
} from '@/Support/snippetLanguage'
import { getSnippetTagLabel } from '@/Support/snippetTags'

export default function SnippetCard({snippet, onClick = () => {}, active = false}) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onClick(snippet)}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onClick(snippet)
                }
            }}
            className={`group cursor-pointer rounded-3xl border p-6 transition ${
                active
                    ? 'border-violet-500/70 bg-[#111827] shadow-lg shadow-violet-600/10'
                    : 'border-white/10 bg-[#0D1323] hover:border-violet-500/40 hover:bg-[#111827]'
            }`}
        >
            <div className="mb-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getSnippetLanguageColor(snippet)}`} />

                    <span className="text-sm text-zinc-400">
                        {getSnippetLanguageName(snippet)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={(event) => event.stopPropagation()}
                    className="opacity-0 transition group-hover:opacity-100"
                    aria-label="Favoritar snippet"
                >
                    <Star size={18} />
                </button>
            </div>

            <h2 className="text-2xl font-semibold">
                {snippet.title}
            </h2>

            <p className="mt-3 leading-relaxed text-zinc-400">
                {snippet.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
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
        </div>
    )
}
