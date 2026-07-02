import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'

export default function EmptyStatePage({
    title,
    description,
    initialTab = 'explorar',
    contentTab = initialTab,
}) {
    return (
        <AppLayout
            initialTab={initialTab}
            contentTab={contentTab}
        >
            <Head title={title} />

            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        {title}
                    </h1>

                    <p className="mt-2 max-w-2xl text-zinc-400">
                        {description}
                    </p>
                </div>

                <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                    <p className="text-zinc-400">
                        Nenhum conteúdo cadastrado para esta tela ainda.
                    </p>
                </div>
            </div>
        </AppLayout>
    )
}
