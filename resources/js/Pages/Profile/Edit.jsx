import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Profile
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Atualize suas informações de conta e senha.
                    </p>
                </div>

                <div className="max-w-7xl space-y-6">
                    <section className="rounded-2xl bg-white p-4 shadow sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </section>

                    <section className="rounded-2xl bg-white p-4 shadow sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </section>

                    <section className="rounded-2xl bg-white p-4 shadow sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
