import CodePreview from '@/Components/CodePreview'
import {
    getSnippetLanguageKey,
} from '@/Support/snippetLanguage'

export default function SnippetPreviewPanel({
    snippet,
    onViewMoreClick = () => {},
}) {
    if (!snippet) {
        return (
            <div className="col-span-4">
                <div className="sticky top-8 rounded-3xl border border-white/10 bg-[#0D1323] p-6">
                    <h3 className="text-xl font-semibold">
                        Preview
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                        Clique em um snippet para ver o código.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="col-span-4">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-[#0D1323] p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold">
                            Preview
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500">
                            {snippet.title}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onViewMoreClick(snippet)}
                            className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
                        >
                            Ver mais
                        </button>

                        <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(snippet.code ?? '')}
                            className="rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
                        >
                            Copiar
                        </button>
                    </div>
                </div>

                <CodePreview
                    language={getSnippetLanguageKey(snippet)}
                    code={snippet.code ?? ''}
                />
            </div>
        </div>
    )
}
