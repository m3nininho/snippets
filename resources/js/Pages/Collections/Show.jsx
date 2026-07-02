import EmptyStatePage from '@/Components/EmptyStatePage'

export default function Show({ collection }) {
    return (
        <EmptyStatePage
            title={collection?.name ?? 'Coleção'}
            description="Snippets desta coleção aparecerão aqui."
        />
    )
}
