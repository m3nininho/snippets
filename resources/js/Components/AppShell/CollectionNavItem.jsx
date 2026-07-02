import { Link } from '@inertiajs/react'

export default function CollectionNavItem({ collection }) {
    const active = route().current('collections.show', {
        collection: collection.slug,
    })

    return (
        <Link
            href={route('collections.show', collection.slug)}
            className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 transition ${
                active ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${collection.color}`} />

                <span className="text-sm text-zinc-300">
                    {collection.name}
                </span>
            </div>

            <span className="text-xs text-zinc-500">
                {collection.count}
            </span>
        </Link>
    )
}
