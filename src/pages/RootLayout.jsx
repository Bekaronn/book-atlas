import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'


export default function RootLayout() {
    return (
        <div>
            <NavBar />
            <main className="container">
                <Outlet />
            </main>
        </div>
    )
}