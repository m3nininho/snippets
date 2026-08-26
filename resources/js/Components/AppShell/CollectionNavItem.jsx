import { Link } from '@inertiajs/react'
import { getCollectionColor } from '@/Support/collectionColors'

export default function CollectionNavItem({ collection }) {
    const active = route().current('collections.show', {
        collection: collection.id,
    })
    const color = getCollectionColor(collection.color)

    return (
        <Link
            href={route('collections.show', collection.id)}
            className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 transition ${
                active ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`h-3 w-3 shrink-0 rounded-full ${color.dot}`} />

                <span className="min-w-0 truncate text-sm text-zinc-300">
                    {collection.name}
                </span>
            </div>

            <span className="text-xs text-zinc-500">
                {collection.snippets_count}
            </span>
        </Link>
    )
}
