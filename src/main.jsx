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
// En desarrollo #root solo contiene el comentario <!--app-html-->, que no cuenta:
// por eso se comprueba si hay elementos y no simplemente nodos.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
