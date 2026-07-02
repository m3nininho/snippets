import { AlertTriangle } from 'lucide-react'

export default function SnippetTrashModal({ snippet, onClose }) {
    if (!snippet) {
        return null
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-6 py-10">
            <div className="fixed inset-0 bg-[#030712]/80 backdrop-blur-sm" />

            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0D1323] p-6 text-white shadow-2xl shadow-black/40">
                <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                        <AlertTriangle size={22} />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">
                            Mover para lixeira?
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Essa ação será conectada ao backend posteriormente.
                        </p>
                    </div>
                </div>

                <p className="leading-relaxed text-zinc-300">
                    Deseja mover o snippet{' '}
                    <span className="font-medium text-white">
                        {snippet.title}
                    </span>{' '}
                    para a lixeira?
                </p>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/10"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-red-500/20 px-4 py-3 text-sm font-medium text-red-200 transition hover:bg-red-500/30"
                    >
                        Mover para lixeira
                    </button>
                </div>
            </div>
        </div>
    )
}
