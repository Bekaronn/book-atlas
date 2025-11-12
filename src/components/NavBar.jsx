import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/NavBar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="brand">
                <NavLink to="/" className="brand">BookAtlas</NavLink>
            </div>
            <div className="nav-right">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/login" className="login-btn">Login</NavLink>
            </div>
        </nav>
    )
}
