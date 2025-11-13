import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchItems } from '../services/itemsService'
import Spinner from '../components/Spinner'
import ErrorBox from '../components/ErrorBox'
import Card from '../components/Card'
import '../styles/Items.css'

export default function Items() {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') || ''
    const pageParam = parseInt(searchParams.get('page')) || 1

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(pageParam)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        let mounted = true
        if (!q.trim()) {
            // если пустой запрос — очищаем
            setItems([])
            setLoading(false)
            setError(null)
            return
        }

        setLoading(true)
        setError(null)

        searchItems(q, page)
            .then((res) => {
                if (!mounted) return
                setItems(res.docs || [])
                const numFound = res.numFound || 0
                setTotalPages(Math.ceil(numFound / 20))
            })
            .catch((err) => {
                if (!mounted) return
                setError(err.message)
            })
            .finally(() => mounted && setLoading(false))

            if (items){
            console.log(items[0])}


        return () => { mounted = false }
    }, [q, page])

    function onChange(e) {
        const v = e.target.value
        setPage(1)
        if (v) setSearchParams({ q: v, page: 1 })
        else setSearchParams({})
    }

    function goToPage(p) {
        if (p < 1 || p > totalPages) return
        setPage(p)
        const params = { ...Object.fromEntries(searchParams.entries()), page: p }
        setSearchParams(params)
    }

    return (
        <div className="items-page">
            <h2 className="page-title">Discover Books</h2>

            <div className="search-row">
                <input
                    className="search-input"
                    placeholder="Search by title..."
                    value={q}
                    onChange={onChange}
                />
            </div>

            {q.trim() === '' ? (
                <div className="empty-search">
                    <img
                        src="/book-search.png"
                        alt="search"
                    />
                    <h3>Start exploring 📚</h3>
                    <p>Type a book title or author to begin your search.</p>
                </div>
            ) : (
                <>
                    {loading && <Spinner />}
                    {error && <ErrorBox>{error}</ErrorBox>}

                    {!loading && !error && (
                        <>
                            <div className="items-grid">
                                {items.length === 0 && <p className="no-results">No matching results.</p>}
                                {items.map((it) => (
                                    <Card key={it.id} item={{ ...it, id: it.id }} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
                                        ← Prev
                                    </button>
                                    <span>Page {page} of {totalPages}</span>
                                    <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
                                        Next →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}
