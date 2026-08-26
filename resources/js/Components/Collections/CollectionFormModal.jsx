import DarkModal from '@/Components/DarkModal'
import InputError from '@/Components/InputError'
import { collectionColors } from '@/Support/collectionColors'
import { DialogTitle } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'
import { X } from 'lucide-react'

const colorLabels = {
    cyan: 'Ciano',
    blue: 'Azul',
    violet: 'Violeta',
    red: 'Coral',
    emerald: 'Verde',
    amber: 'Âmbar',
    pink: 'Rosa',
}

export default function CollectionFormModal({ show, collection = null, onClose }) {
    const editing = Boolean(collection)
    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
        color: 'cyan',
    })

    useEffect(() => {
        if (!show) return

        setData({
            name: collection?.name ?? '',
            description: collection?.description ?? '',
            color: collection?.color ?? 'cyan',
        })
        clearErrors()
    }, [show, collection])

    const close = () => {
        reset()
        clearErrors()
        onClose()
    }

    const submit = (event) => {
        event.preventDefault()

        const options = {
            preserveScroll: true,
            onSuccess: close,
        }

        if (editing) {
            patch(route('collections.update', collection.id), options)
        } else {
            post(route('collections.store'), options)
        }
    }

    return (
        <DarkModal show={show} onClose={close} maxWidth="lg">
            <form onSubmit={submit} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <DialogTitle className="text-2xl font-semibold">
                            {editing ? 'Editar coleção' : 'Nova coleção'}
                        </DialogTitle>
                        <p className="mt-2 text-sm text-zinc-500">
                            {editing
                                ? 'Atualize os dados de identificação da coleção.'
                                : 'Crie um novo grupo para organizar seus snippets.'}
                        </p>
                    </div>

                    <button type="button" onClick={close} aria-label="Fechar" className="rounded-xl bg-white/5 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="mt-6 space-y-5">
                    <label className="block space-y-2">
                        <span className="text-sm text-zinc-400">Nome da coleção</span>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            maxLength={100}
                            autoFocus
                            className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500 focus:ring-0"
                            placeholder="Ex.: Backend"
                        />
                        <InputError message={errors.name} />
                    </label>

                    <label className="block space-y-2">
                        <span className="text-sm text-zinc-400">Descrição <span className="text-zinc-600">(opcional)</span></span>
                        <textarea
                            value={data.description}
                            onChange={(event) => setData('description', event.target.value)}
                            maxLength={1000}
                            rows={4}
                            className="w-full resize-none rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500 focus:ring-0"
                            placeholder="Descreva o que será organizado nesta coleção."
                        />
                        <InputError message={errors.description} />
                    </label>

                    <fieldset>
                        <legend className="text-sm text-zinc-400">Cor</legend>
                        <div className="mt-3 flex flex-wrap gap-3">
                            {Object.entries(collectionColors).map(([value, styles]) => (
                                <label key={value} title={colorLabels[value]} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="color"
                                        value={value}
                                        checked={data.color === value}
                                        onChange={(event) => setData('color', event.target.value)}
                                        className="sr-only"
                                    />
                                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                                        data.color === value
                                            ? 'border-white/50 bg-white/10'
                                            : 'border-white/10 bg-white/[0.03] hover:bg-white/5'
                                    }`}>
                                        <span className={`h-4 w-4 rounded-full ${styles.dot}`} />
                                    </span>
                                </label>
                            ))}
                        </div>
                        <InputError message={errors.color} className="mt-2" />
                    </fieldset>
                </div>

                <div className="mt-7 flex justify-end gap-3">
                    <button type="button" onClick={close} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/10">
                        Cancelar
                    </button>
                    <button type="submit" disabled={processing} className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50">
                        {editing ? 'Salvar alterações' : 'Criar coleção'}
                    </button>
                </div>
            </form>
        </DarkModal>
    )
}
