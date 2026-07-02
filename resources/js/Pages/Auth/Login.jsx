import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (event) => {
        event.preventDefault()

        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <GuestLayout
            title="Entrar"
            subtitle="Acesse sua biblioteca de snippets."
        >
            <Head title="Entrar" />

            {status && (
                <div className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="space-y-5"
            >
                <label className="block space-y-2">
                    <span className="text-sm text-zinc-500">
                        Email
                    </span>

                    <input
                        type="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        onChange={(event) => setData('email', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                        placeholder="test@example.com"
                    />

                    <InputError message={errors.email} />
                </label>

                <label className="block space-y-2">
                    <span className="text-sm text-zinc-500">
                        Senha
                    </span>

                    <input
                        type="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(event) => setData('password', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                        placeholder="password"
                    />

                    <InputError message={errors.password} />
                </label>

                <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-2 text-sm text-zinc-400">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(event) => setData('remember', event.target.checked)}
                        />
                        Manter conectado
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-violet-400 transition hover:text-violet-300"
                        >
                            Esqueci a senha
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-2xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Entrar
                </button>

                <p className="text-center text-sm text-zinc-500">
                    Ainda não tem conta?{' '}
                    <Link
                        href={route('register')}
                        className="text-violet-400 transition hover:text-violet-300"
                    >
                        Criar conta
                    </Link>
                </p>
            </form>
        </GuestLayout>
    )
}
