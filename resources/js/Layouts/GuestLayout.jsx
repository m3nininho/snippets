import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, title, subtitle }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#070B14] px-6 py-10 text-white">
            <div className="w-full max-w-md">
                <Link
                    href="/"
                    className="mb-8 flex items-center justify-center gap-3"
                >
                    <div className="h-10 w-10 rounded-2xl bg-violet-600" />
                    <span className="text-2xl font-bold tracking-tight">
                        SnipVault
                    </span>
                </Link>

                <div className="rounded-3xl border border-white/10 bg-[#0D1323] p-6 shadow-2xl shadow-black/30">
                    {(title || subtitle) && (
                        <div className="mb-6">
                            {title && (
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    {title}
                                </h1>
                            )}

                            {subtitle && (
                                <p className="mt-2 text-sm text-zinc-400">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    )}

                    {children}
                </div>
            </div>
        </div>
    );
}
