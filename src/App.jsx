
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import Home from './pages/Home'
import About from './pages/About'
import Items from './pages/Items'
import ItemDetails from './pages/ItemDetails'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="books" element={<Items />} />
          <Route path="books/:id" element={<ItemDetails />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
