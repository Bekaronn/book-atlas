import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Card.css'

export default function Card({ item }) {
  const coverUrl = item.cover_i
    ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
    : item.covers?.[0]
      ? `https://covers.openlibrary.org/b/id/${item.covers[0]}-M.jpg`
      : null

  const author = item.author_name || item.raw?.authors?.map(a => a.name).join(', ') || 'Unknown Author'

  return (
    <article className="card">
      <div className="card-image">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={item.title}
            loading="lazy"
          />
        ) : (
          <div className="no-cover">
            <span>{item.title}</span>
          </div>
        )}
      </div>

      <div className="card-body">
        {item.first_publish_year && (
          <p className="card-year">📅 {item.first_publish_year}</p>
        )}
        <h3 className="card-title">{item.title}</h3>
        <p className="card-sub">{author}</p>
        <Link className="card-link" to={`/books/${item.id}`}>
          View details →
        </Link>
      </div>
    </article>
  )
}
