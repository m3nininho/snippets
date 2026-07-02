import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react'
import { X } from 'lucide-react'
import CodePreview from '@/Components/CodePreview'
import {
    getSnippetAuthorName,
    getSnippetAuthorProfileHref,
} from '@/Support/snippetAuthor'
import {
    getSnippetLanguageColor,
    getSnippetLanguageKey,
    getSnippetLanguageName,
} from '@/Support/snippetLanguage'

export default function SnippetDetailsModal({ snippet, onClose }) {
    return (
        <Transition show={Boolean(snippet)} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={onClose}
            >
                <div className="flex min-h-full items-center justify-center px-6 py-10">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[#030712]/80 backdrop-blur-sm" />
                    </TransitionChild>

                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-3 scale-95"
                        enterTo="opacity-100 translate-y-0 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0 scale-100"
                        leaveTo="opacity-0 translate-y-3 scale-95"
                    >
                        <DialogPanel className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0D1323] text-white shadow-2xl shadow-black/40">
                            {snippet && (
                                <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                                    <section className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
                                        <div className="mb-6 flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-3 w-3 rounded-full ${getSnippetLanguageColor(snippet)}`} />

                                                <span className="text-sm text-zinc-400">
                                                    {getSnippetLanguageName(snippet)}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="rounded-xl bg-white/5 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                                                aria-label="Fechar"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>

                                        <DialogTitle className="text-3xl font-semibold tracking-tight">
                                            {snippet.title}
                                        </DialogTitle>

                                        <p className="mt-4 leading-relaxed text-zinc-400">
                                            {snippet.description}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            {(snippet.tags ?? []).map((tag) => (
                                                <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-sm text-zinc-400">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                                            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                                                Explicação
                                            </h3>

                                            <p className="mt-3 leading-relaxed text-zinc-300">
                                                {snippet.explanation}
                                            </p>
                                        </div>

                                        <div className="mt-6 border-t border-white/10 pt-5">
                                            <p className="text-sm text-zinc-500">
                                                Autor
                                            </p>

                                            <a
                                                href={getSnippetAuthorProfileHref(snippet)}
                                                className="mt-2 inline-flex text-sm font-medium text-violet-400 transition hover:text-violet-300"
                                            >
                                                {getSnippetAuthorName(snippet)}
                                            </a>
                                        </div>
                                    </section>

                                    <section className="min-w-0 p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-xl font-semibold">
                                                Código
                                            </h3>

                                            <span className="text-sm text-zinc-500">
                                                {getSnippetLanguageName(snippet)}
                                            </span>
                                        </div>

                                        <CodePreview
                                            language={getSnippetLanguageKey(snippet)}
                                            code={snippet.code ?? ''}
                                        />
                                    </section>
                                </div>
                            )}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
