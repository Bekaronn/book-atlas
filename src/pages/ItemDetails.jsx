import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getItemById } from '../services/itemsService'
import Spinner from '../components/Spinner'
import ErrorBox from '../components/ErrorBox'
import '../styles/ItemDetails.css'

export default function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    getItemById(id)
      .then((res) => {
        if (!mounted) return
        setItem(res)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message)
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id])

  if (loading) return <Spinner />
  if (error) return <ErrorBox>{error}</ErrorBox>
  if (!item) return <div className="not-found">Book not found</div>

  const coverUrl = item.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${item.covers[0]}-L.jpg`
    : null

  return (
    <div className="item-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <div className="item-card">
        {coverUrl ? (
          <img className="item-cover" src={coverUrl} alt={item.title} loading="lazy" />
        ) : (
          <div className="no-cover">{item.title}</div>
        )}
        <div className="item-info">
          <h2 className="item-title">{item.title}</h2>
          <p className="item-desc"><strong>Description:</strong> {item.description || '—'}</p>
          <p className="item-meta"><strong>First published:</strong> {item.first_publish_date || '—'}</p>
          <p className="item-meta"><strong>Created:</strong> {item.created?.value || item.created?.date || '—'}</p>
          <p className="item-meta"><strong>Subjects:</strong> {item.subjects.slice(0, 10).join(', ') || '—'}</p>
          <p className="item-meta"><strong>Links count:</strong> {item.links?.length || 0}</p>
        </div>
      </div>
    </div>
  )
}
