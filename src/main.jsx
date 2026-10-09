import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción el HTML llega prerenderizado (scripts/prerender.mjs): se hidrata.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
