import InputError from '@/Components/InputError'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (event) => {
        event.preventDefault()

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }

    return (
        <GuestLayout
            title="Criar conta"
            subtitle="Comece a organizar seus snippets."
        >
            <Head title="Criar conta" />

            <form
                onSubmit={submit}
                className="space-y-5"
            >
                <label className="block space-y-2">
                    <span className="text-sm text-zinc-500">
                        Nome
                    </span>

                    <input
                        type="text"
                        value={data.name}
                        autoComplete="name"
                        autoFocus
                        onChange={(event) => setData('name', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                        placeholder="Teste Dev"
                    />

                    <InputError message={errors.name} />
                </label>

                <label className="block space-y-2">
                    <span className="text-sm text-zinc-500">
                        Email
                    </span>

                    <input
                        type="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(event) => setData('email', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                        placeholder="voce@email.com"
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
                        autoComplete="new-password"
                        onChange={(event) => setData('password', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                    />

                    <InputError message={errors.password} />
                </label>

                <label className="block space-y-2">
                    <span className="text-sm text-zinc-500">
                        Confirmar senha
                    </span>

                    <input
                        type="password"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(event) => setData('password_confirmation', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                    />

                    <InputError message={errors.password_confirmation} />
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-2xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Criar conta
                </button>

                <p className="text-center text-sm text-zinc-500">
                    Já tem conta?{' '}
                    <Link
                        href={route('login')}
                        className="text-violet-400 transition hover:text-violet-300"
                    >
                        Entrar
                    </Link>
                </p>
            </form>
        </GuestLayout>
    )
}
