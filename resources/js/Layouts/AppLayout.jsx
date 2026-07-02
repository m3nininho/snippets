import Sidebar from '@/Components/AppShell/Sidebar'

export default function AppLayout({ children, overlays = null }) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#070B14] text-white">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>

            {overlays}
        </div>
    )
}
