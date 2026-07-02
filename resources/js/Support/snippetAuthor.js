export function getSnippetAuthorName(snippet) {
    return (
        snippet?.author?.name ??
        snippet?.user?.name ??
        snippet?.creator?.name ??
        'Autor desconhecido'
    )
}

export function getSnippetAuthorProfileHref(snippet) {
    const authorId = snippet?.author?.id ?? snippet?.user?.id ?? snippet?.creator?.id

    return authorId ? `/users/${authorId}` : '#'
}
