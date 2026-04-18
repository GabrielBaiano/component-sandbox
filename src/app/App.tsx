import { useState, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { components } from '../components'
import Sidebar from './Sidebar'
import HomePage from './HomePage'
import ComponentPage from './ComponentPage'

const DEFAULT_BG = '#0d0d0d'

export default function App() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return components
    const q = query.toLowerCase()
    return components.filter(reg =>
      reg.meta.name.toLowerCase().includes(q) ||
      reg.meta.description.toLowerCase().includes(q) ||
      reg.meta.tags.some(t => t.toLowerCase().includes(q)) ||
      reg.meta.tech.some(t => t.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="flex h-screen overflow-hidden bg-surface-950">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(232,80,2,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex w-full h-full">
        <Sidebar
          components={filtered}
          query={query}
          onQueryChange={setQuery}
        />
        
        <main className="flex-1 flex flex-col h-full bg-surface-950/20 backdrop-blur-[2px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components/:id" element={<ComponentPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
