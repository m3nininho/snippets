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
        label: 'Tags',
        routeName: 'tags.index',
    },
    {
        label: 'Lixeira',
        routeName: 'trash.index',
    },
]

export const collections = [
    {
        name: 'Frontend',
        slug: 'frontend',
        count: 24,
        color: 'bg-cyan-500',
    },
    {
        name: 'Laravel',
        slug: 'laravel',
        count: 18,
        color: 'bg-red-500',
    },
    {
        name: 'React',
        slug: 'react',
        count: 31,
        color: 'bg-blue-500',
    },
    {
        name: 'UI Inspirations',
        slug: 'ui-inspirations',
        count: 12,
        color: 'bg-violet-500',
    },
]
