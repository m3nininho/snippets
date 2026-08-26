import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'

export default function DarkModal({ show, onClose, children, maxWidth = 'lg' }) {
    const maxWidthClass = {
        md: 'max-w-md',
        lg: 'max-w-lg',
        '2xl': 'max-w-2xl',
        '4xl': 'max-w-4xl',
    }[maxWidth]

    return (
        <Transition show={show} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
                <div className="flex min-h-full items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[#030712]/80 backdrop-blur-sm" />
                    </TransitionChild>

                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-3 scale-95"
                        enterTo="opacity-100 translate-y-0 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0 scale-100"
                        leaveTo="opacity-0 translate-y-3 scale-95"
                    >
                        <DialogPanel className={`relative w-full ${maxWidthClass} overflow-hidden rounded-3xl border border-white/10 bg-[#0D1323] text-white shadow-2xl shadow-black/40`}>
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
