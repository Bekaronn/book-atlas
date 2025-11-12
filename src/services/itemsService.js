const BASE = 'https://openlibrary.org'

/**
 * Search items with optional pagination
 * @param {string} q - search query
 * @param {number} page - page number (starts from 1)
 * @param {number} limit - items per page
 */
export async function searchItems(q = '', page = 1, limit = 10) {
    const url = new URL('/search.json', BASE)
    url.searchParams.set('q', q || 'the') // fallback query
    url.searchParams.set('page', page)
    url.searchParams.set('limit', limit) // OpenLibrary supports 'limit'?

    const res = await fetch(url.toString())
    if (!res.ok) throw new Error('Search request failed: ' + res.status)
    const data = await res.json()
    // Map docs to lighter item structure
    return {
        docs: data.docs.map((d) => ({
            id: d.key?.replace('/works/', '') || d.key || d.cover_edition_key || d.edition_key?.[0],
            title: d.title,
            author_name: d.author_name?.join(', '),
            first_publish_year: d.first_publish_year,
            cover_i: d.cover_i,
            short_desc: d.subject?.slice(0, 5).join(', ') || d.subtitle || '',
            raw: d
        })),
        numFound: data.numFound || 0
    }
}

export async function getItemById(id) {
    if (!id) throw new Error('Missing id')
    const url = `${BASE}/works/${id}.json`
    const res = await fetch(url)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Get by id failed: ' + res.status)
    const data = await res.json()
    return {
        id: data.key?.replace('/works/', '') || id,
        title: data.title,
        description: typeof data.description === 'string' ? data.description : data.description?.value || '',
        subjects: data.subjects || [],
        covers: data.covers || [],
        links: data.links || [],
        created: data.created,
        first_publish_date: data.first_publish_date || data.first_publish_year,
        raw: data
    }
}
