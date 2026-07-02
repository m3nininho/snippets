import { useState } from 'react'
import UserMenu from '@/Components/AppShell/UserMenu'

export default function AppLayout({
    children,
    initialTab = 'explorar',
    contentTab = initialTab,
    tabPanels = {},
    overlays = null,
}) {
    const [activeTab, setActiveTab] = useState(initialTab)

    const tabs = [
        {
            key: 'explorar',
            label: 'Explorar',
            title: 'Explore Snippets',
            description: 'Organize, salve e compartilhe snippets.',
        },
        {
            key: 'meus-snippets',
            label: 'Meus Snippets',
            title: 'Meus Snippets',
            description: 'Os snippets criados por você aparecerão aqui.',
        },
        {
            key: 'favoritos',
            label: 'Favoritos',
            title: 'Favoritos',
            description: 'Snippets favoritados ficarão disponíveis nesta tela.',
        },
        {
            key: 'colecoes',
            label: 'Coleções',
            title: 'Coleções',
            description: 'Suas coleções serão organizadas aqui.',
        },
        {
            key: 'tags',
            label: 'Tags',
            title: 'Tags',
            description: 'As tags usadas nos snippets serão listadas aqui.',
        },
        {
            key: 'lixeira',
            label: 'Lixeira',
            title: 'Lixeira',
            description: 'Snippets excluídos ficarão disponíveis aqui.',
        },
    ]

    const collections = [
        {
            name: 'Frontend',
            key: 'collection-frontend',
            count: 24,
            color: 'bg-cyan-500',
        },
        {
            name: 'Laravel',
            key: 'collection-laravel',
            count: 18,
            color: 'bg-red-500',
        },
        {
            name: 'React',
            key: 'collection-react',
            count: 31,
            color: 'bg-blue-500',
        },
        {
            name: 'UI Inspirations',
            key: 'collection-ui-inspirations',
            count: 12,
            color: 'bg-violet-500',
        },
    ]

    const activeCollection = collections.find(
        (collection) => collection.key === activeTab,
    )

    const activeTabData = tabs.find((tab) => tab.key === activeTab)
    const activeTabPanel = tabPanels[activeTab]

    return (
        <div className="flex h-screen overflow-hidden bg-[#070B14] text-white">
            <aside className="w-72 border-r border-white/10 bg-[#0B1020]">
                <div className="flex h-full flex-col p-6">
                    <div className="mb-10 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-violet-600" />

                        <h1 className="text-2xl font-bold tracking-tight">
                            SnipVault
                        </h1>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <SidebarItem
                                key={tab.key}
                                label={tab.label}
                                active={activeTab === tab.key}
                                onClick={() => setActiveTab(tab.key)}
                            />
                        ))}
                    </nav>

                    <div className="my-8 h-px bg-white/10" />

                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                                Minhas Coleções
                            </h2>

                            <button
                                type="button"
                                onClick={() => setActiveTab('colecoes')}
                                className="text-sm text-violet-400 hover:text-violet-300"
                            >
                                +
                            </button>
                        </div>

                        <div className="space-y-2">
                            {collections.map((collection) => (
                                <CollectionItem
                                    key={collection.key}
                                    {...collection}
                                    active={activeTab === collection.key}
                                    onClick={() => setActiveTab(collection.key)}
                                />
                            ))}
                        </div>
                    </div>

                    <UserMenu />
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-8">
                {activeTab === contentTab ? (
                    children
                ) : activeTabPanel ? (
                    activeTabPanel
                ) : (
                    <EmptyTabContent
                        title={activeCollection?.name || activeTabData?.title}
                        description={
                            activeCollection
                                ? 'Snippets desta coleção aparecerão aqui.'
                                : activeTabData?.description
                        }
                    />
                )}
            </main>

            {overlays}
        </div>
    )
}

function SidebarItem({ label, active = false, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group flex items-center rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                active
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
        >
            <span className="font-medium">{label}</span>
        </button>
    )
}

function CollectionItem({ name, count, color, active = false, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 transition ${
                active ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${color}`} />

                <span className="text-sm text-zinc-300">
                    {name}
                </span>
            </div>

            <span className="text-xs text-zinc-500">
                {count}
            </span>
        </button>
    )
}

function EmptyTabContent({ title, description }) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">
                    {title}
                </h1>

                <p className="mt-2 max-w-2xl text-zinc-400">
                    {description}
                </p>
            </div>

            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                <p className="text-zinc-400">
                    Nenhum conteúdo cadastrado para esta tela ainda.
                </p>
            </div>
        </div>
    )
}
