import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { ChevronUp, LogOut } from 'lucide-react'

export default function UserMenu() {
    const [open, setOpen] = useState(false)
    const user = usePage().props.auth?.user
    const name = user?.name ?? 'Teste Dev'
    const email = user?.email ?? 'test@example.com'
    const initial = name.charAt(0).toUpperCase()

    const logout = () => {
        router.post(route('logout'))
    }

    return (
        <div className="relative mt-auto">
            {open && (
                <div className="absolute bottom-full left-0 right-0 mb-3 rounded-2xl border border-white/10 bg-[#0D1323] p-4 shadow-2xl shadow-black/30">
                    <div className="mb-4 border-b border-white/10 pb-4">
                        <p className="font-medium">
                            {name}
                        </p>

                        <p className="mt-1 truncate text-sm text-zinc-500">
                            {email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                    >
                        <LogOut size={16} />
                        Sair do sistema
                    </button>
                </div>
            )}

            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur transition hover:bg-white/10"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-bold">
                        {initial}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                            {name}
                        </p>
                        <p className="truncate text-sm text-zinc-400">
                            {email}
                        </p>
                    </div>

                    <ChevronUp
                        size={16}
                        className={`text-zinc-500 transition ${open ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>
        </div>
    )
}
