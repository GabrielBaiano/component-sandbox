import { useState, useMemo } from 'react'
import { components } from '../components'
import Sidebar from './Sidebar'
import Preview from './Preview'

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(components[0]?.meta.id ?? null)
  const [query, setQuery] = useState('')
  const [darkBg, setDarkBg] = useState(true)

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

  const selected = components.find(r => r.meta.id === selectedId) ?? null

  return (
    <div className="flex h-screen overflow-hidden bg-surface-950">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex w-full h-full">
        <Sidebar
          components={filtered}
          selected={selectedId}
          onSelect={setSelectedId}
          query={query}
          onQueryChange={setQuery}
        />
        <Preview
          registration={selected}
          darkBg={darkBg}
          onToggleBg={() => setDarkBg(p => !p)}
        />
      </div>
    </div>
  )
}
