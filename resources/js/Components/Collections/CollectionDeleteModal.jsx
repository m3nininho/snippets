import DarkModal from '@/Components/DarkModal'
import { DialogTitle } from '@headlessui/react'
import { router } from '@inertiajs/react'
import { Trash2, X } from 'lucide-react'

export default function CollectionDeleteModal({ collection, onClose }) {
    const destroy = () => {
        router.delete(route('collections.destroy', collection.id), {
            preserveScroll: true,
            onSuccess: onClose,
        })
    }

    return (
        <DarkModal show={Boolean(collection)} onClose={onClose} maxWidth="md">
            {collection && (
                <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
                            <Trash2 size={20} />
                        </div>
                        <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-xl bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>

                    <DialogTitle className="mt-5 text-2xl font-semibold">
                        Excluir coleção?
                    </DialogTitle>
                    <p className="mt-3 leading-relaxed text-zinc-400">
                        Tem certeza que deseja excluir a coleção “{collection.name}”?
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                        Os snippets não serão excluídos. Apenas a coleção e seus vínculos serão removidos.
                    </p>

                    <div className="mt-7 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/10">
                            Cancelar
                        </button>
                        <button type="button" onClick={destroy} className="rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-500">
                            Excluir coleção
                        </button>
                    </div>
                </div>
            )}
        </DarkModal>
    )
}
