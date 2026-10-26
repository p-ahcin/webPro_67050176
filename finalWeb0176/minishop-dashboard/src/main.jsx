import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext.jsx'
import App from './App.jsx'
import './style.css'

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  </React.StrictMode>
)
