export const sidebarItems = [
    {
        label: 'Explorar',
        routeName: 'dashboard',
    },
    {
        label: 'Meus Snippets',
        routeName: 'snippets.index',
        activeRoutes: ['snippets.*'],
    },
    {
        label: 'Favoritos',
        routeName: 'favorites.index',
    },
    {
        label: 'Coleções',
        routeName: 'collections.index',
        activeRoutes: ['collections.*'],
    },
    {
        label: 'Lixeira',
        routeName: 'trash.index',
    },
]
