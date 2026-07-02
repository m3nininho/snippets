import { Head, Link } from '@inertiajs/react'

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="SnipVault" />

            <main className="min-h-screen bg-[#070B14] text-white">
                <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-violet-600" />
                            <span className="text-2xl font-bold tracking-tight">
                                SnipVault
                            </span>
                        </div>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
                                >
                                    Abrir dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Entrar
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
                                    >
                                        Criar conta
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-violet-400">
                                Biblioteca pessoal de código
                            </p>

                            <h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-tight">
                                Salve, organize e reencontre seus snippets com rapidez.
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                                Um painel direto para guardar trechos úteis, filtrar por linguagem, revisar código e manter seus exemplos prontos para uso.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href={auth.user ? route('dashboard') : route('login')}
                                    className="rounded-2xl bg-violet-600 px-6 py-4 font-medium text-white transition hover:bg-violet-500"
                                >
                                    Começar agora
                                </Link>

                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Criar acesso
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-[#0D1323] p-6 shadow-2xl shadow-black/30">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Preview
                                    </h2>
                                    <p className="mt-1 text-sm text-zinc-500">
                                        Dashboard SnipVault
                                    </p>
                                </div>

                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                                    Online
                                </span>
                            </div>

                            <div className="space-y-4">
                                {['Dashboard com Inertia', 'Hook useDebounce', 'Filtro Eloquent por busca'].map((title) => (
                                    <div
                                        key={title}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                                    >
                                        <div className="mb-3 flex items-center gap-3">
                                            <span className="h-3 w-3 rounded-full bg-violet-500" />
                                            <span className="text-sm text-zinc-400">
                                                Snippet
                                            </span>
                                        </div>

                                        <p className="font-medium">
                                            {title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
