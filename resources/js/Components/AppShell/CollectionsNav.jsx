import { Link, usePage } from '@inertiajs/react'
import CollectionNavItem from '@/Components/AppShell/CollectionNavItem'

export default function CollectionsNav() {
    const collections = usePage().props.sidebarCollections ?? []

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Minhas Coleções
                </h2>

                <Link
                    href={route('collections.index', { create: 1 })}
                    className="text-sm text-violet-400 hover:text-violet-300"
                    aria-label="Ver coleções"
                >
                    +
                </Link>
            </div>

            <div className="space-y-2">
                {collections.map((collection) => (
                    <CollectionNavItem
                        key={collection.id}
                        collection={collection}
                    />
                ))}
            </div>
        </div>
    )
}
