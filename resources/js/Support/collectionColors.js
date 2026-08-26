export const collectionColors = {
    cyan: {
        dot: 'bg-cyan-500',
        icon: 'text-cyan-400',
        background: 'bg-cyan-500/10',
    },
    blue: {
        dot: 'bg-blue-500',
        icon: 'text-blue-400',
        background: 'bg-blue-500/10',
    },
    violet: {
        dot: 'bg-violet-500',
        icon: 'text-violet-400',
        background: 'bg-violet-500/10',
    },
    red: {
        dot: 'bg-red-500',
        icon: 'text-red-400',
        background: 'bg-red-500/10',
    },
    emerald: {
        dot: 'bg-emerald-500',
        icon: 'text-emerald-400',
        background: 'bg-emerald-500/10',
    },
    amber: {
        dot: 'bg-amber-500',
        icon: 'text-amber-400',
        background: 'bg-amber-500/10',
    },
    pink: {
        dot: 'bg-pink-500',
        icon: 'text-pink-400',
        background: 'bg-pink-500/10',
    },
}

export function getCollectionColor(color) {
    return collectionColors[color] ?? collectionColors.cyan
}
