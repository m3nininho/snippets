import { Link } from '@inertiajs/react'

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">
                    Explore Snippets
                </h1>

                <p className="mt-2 text-zinc-400">
                    Organize, salve e compartilhe snippets.
                </p>
            </div>

            <Link
                href={route('snippets.create')}
                className="rounded-2xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500"
            >
                Novo Snippet
            </Link>
        </div>
    )
}
