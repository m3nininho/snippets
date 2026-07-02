import { useEffect, useState } from 'react'

export default function SnippetSearchBar({
    filters,
    languageOptions = [],
    onSearchChange,
    onAdvancedFiltersApply,
    onClearFilters,
}) {
    const [showFilters, setShowFilters] = useState(false)
    const [draftFilters, setDraftFilters] = useState({
        language: filters.language,
        title: filters.title,
        author: filters.author,
    })

    useEffect(() => {
        setDraftFilters({
            language: filters.language,
            title: filters.title,
            author: filters.author,
        })
    }, [filters.author, filters.language, filters.title])

    const updateDraftFilter = (key, value) => {
        setDraftFilters((currentFilters) => ({
            ...currentFilters,
            [key]: value,
        }))
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex-1">
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Buscar por nome do snippet..."
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
                    />
                </div>

                <button
                    type="button"
                    onClick={() => setShowFilters((current) => !current)}
                    className={`rounded-2xl border px-5 py-4 text-zinc-300 transition ${
                        showFilters
                            ? 'border-violet-500/60 bg-violet-600/20 text-white'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                >
                    Filtro avançado
                </button>
            </div>

            {showFilters && (
                <div className="rounded-3xl border border-white/10 bg-[#0D1323] p-5">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">
                                Filtro avançado
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">
                                Defina os campos e aplique quando estiver pronto.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClearFilters}
                            className="rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
                        >
                            Limpar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <label className="space-y-2">
                            <span className="text-sm text-zinc-500">
                                Linguagem
                            </span>

                            <select
                                value={draftFilters.language}
                                onChange={(event) => updateDraftFilter('language', event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none focus:border-violet-500"
                            >
                                <option value="">Todas</option>
                                {languageOptions.map((language) => (
                                    <option
                                        key={language}
                                        value={language}
                                    >
                                        {language}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="space-y-2">
                            <span className="text-sm text-zinc-500">
                                Título
                            </span>

                            <input
                                type="text"
                                value={draftFilters.title}
                                onChange={(event) => updateDraftFilter('title', event.target.value)}
                                placeholder="Filtrar por título"
                                className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="text-sm text-zinc-500">
                                Autor
                            </span>

                            <input
                                type="text"
                                value={draftFilters.author}
                                onChange={(event) => updateDraftFilter('author', event.target.value)}
                                placeholder="Filtrar por autor"
                                className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
                            />
                        </label>

                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={() => onAdvancedFiltersApply(draftFilters)}
                                className="w-full rounded-2xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-500"
                            >
                                Aplicar filtros
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
