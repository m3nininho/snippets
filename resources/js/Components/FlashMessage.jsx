import { usePage } from '@inertiajs/react'
import { CheckCircle2, CircleAlert } from 'lucide-react'

export default function FlashMessage() {
    const flash = usePage().props.flash ?? {}
    const message = flash.success ?? flash.error

    if (!message) {
        return null
    }

    const error = Boolean(flash.error)
    const Icon = error ? CircleAlert : CheckCircle2

    return (
        <div className={`fixed right-6 top-6 z-[70] flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-xl shadow-black/20 ${
            error
                ? 'border-red-500/20 bg-[#1A111A] text-red-200'
                : 'border-emerald-500/20 bg-[#0D1B1A] text-emerald-200'
        }`}>
            <Icon size={18} className="shrink-0" />
            {message}
        </div>
    )
}
