import { Link } from '@inertiajs/react'

export default function SidebarNavItem({ item }) {
    const active =
        route().current(item.routeName) ||
        item.activeRoutes?.some((routeName) => route().current(routeName))

    return (
        <Link
            href={route(item.routeName)}
            className={`group flex items-center rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                active
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
        >
            <span className="font-medium">{item.label}</span>
        </Link>
    )
}
