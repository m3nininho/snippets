import { Link } from '@inertiajs/react'

export default function Pagination({ pagination }) {
    const links = pagination?.links ?? []

    if (links.length <= 3) {
        return null
    }

    return (
        <nav className="flex flex-wrap items-center gap-2 pt-2">
            {links.map((link, index) => (
                link.url ? (
                    <Link
                        key={`${link.label}-${index}`}
                        href={link.url}
                        preserveScroll
                        className={`rounded-xl border px-3 py-2 text-sm transition ${
                            link.active
                                ? 'border-violet-500/60 bg-violet-600 text-white'
                                : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'
                        }`}
                    >
                        {formatPaginationLabel(link.label)}
                    </Link>
                ) : (
                    <span
                        key={`${link.label}-${index}`}
                        className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-sm text-zinc-600"
                    >
                        {formatPaginationLabel(link.label)}
                    </span>
                )
            ))}
        </nav>
    )
}

function formatPaginationLabel(label) {
    return label
        .replace('&laquo;', '')
        .replace('&raquo;', '')
        .replace('Previous', 'Anterior')
        .replace('Next', 'Próxima')
        .trim()
}
