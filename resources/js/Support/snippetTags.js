export function getSnippetTagLabel(tag) {
    if (typeof tag === 'string') {
        return tag
    }

    return tag?.name ?? tag?.slug ?? null
}
