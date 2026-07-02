export function getSnippetLanguageName(snippet) {
    const language = snippet?.language

    if (typeof language === 'string' && language.trim()) {
        return language
    }

    if (language?.name) {
        return language.name
    }

    if (language?.slug) {
        return language.slug
    }

    return 'Linguagem'
}

export function getSnippetLanguageKey(snippet) {
    const language = snippet?.language

    if (snippet?.languageKey) {
        return snippet.languageKey
    }

    if (typeof language === 'string' && language.trim()) {
        return language.toLowerCase()
    }

    if (language?.slug) {
        return language.slug
    }

    if (language?.name) {
        return language.name.toLowerCase()
    }

    return 'text'
}

export function getSnippetLanguageColor(snippet) {
    return snippet?.language?.color ?? snippet?.color ?? 'bg-zinc-500'
}
