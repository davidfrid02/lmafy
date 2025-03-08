import React from 'react'
import { createRoot } from 'react-dom/client' // Updated import
import App from './App'

const root = createRoot(document.getElementById('root')) // Create a root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
