import AppLayout from '@/Layouts/AppLayout'
import { useState } from 'react'
import { Head, usePage } from '@inertiajs/react'
import SnippetDetailsModal from '@/Components/SnippetDetailsModal'


export default function Index() {
const page = usePage().props
const [detailsModal, setDetailsModal] = useState({
    snippet: null,
    mode: 'view',
})
    const user = page.auth?.user

const closeSnippetDetails = () => {
    setDetailsModal({
        snippet: null,
        mode: 'view',
    })
 }

    return (

        <AppLayout   
         overlays={(
            <SnippetDetailsModal
                snippet={detailsModal.snippet}
                mode={detailsModal.mode}
                onClose={closeSnippetDetails}
            />)}
            >
         <Head title="Coleções" />

            <div className="space-y-8">
              <div className="flex items-start justify-between gap-6">
                   <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                             Coleções
                        </h1>

                           <p className="mt-2 max-w-2xl text-zinc-400">
                               {user?.name
                                 ? `Coleções criada por ${user.name}.`
                                 : 'Suas coleções aparecerão aqui.'}
                        </p>
                    </div>
             </div>
            </div>

        </AppLayout>
    )
}
