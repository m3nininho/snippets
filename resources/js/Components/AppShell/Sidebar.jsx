import Brand from '@/Components/AppShell/Brand'
import CollectionsNav from '@/Components/AppShell/CollectionsNav'
import SidebarNavItem from '@/Components/AppShell/SidebarNavItem'
import UserMenu from '@/Components/AppShell/UserMenu'
import { sidebarItems } from '@/Config/navigation'

export default function Sidebar() {
    return (
        <aside className="w-72 border-r border-white/10 bg-[#0B1020]">
            <div className="flex h-full flex-col p-6">
                <Brand />

                <nav className="flex flex-col gap-2">
                    {sidebarItems.map((item) => (
                        <SidebarNavItem
                            key={item.routeName}
                            item={item}
                        />
                    ))}
                </nav>

                <div className="my-8 h-px bg-white/10" />

                <CollectionsNav />

                <UserMenu />
            </div>
        </aside>
    )
}
