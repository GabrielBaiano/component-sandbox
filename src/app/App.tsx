import { useState, useMemo, useEffect } from 'react'
import { components } from '../components'
import Sidebar from './Sidebar'
import Preview from './Preview'

const DEFAULT_BG = '#0a0a14'

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(components[0]?.meta.id ?? null)
  const [query, setQuery] = useState('')
  const [bg, setBg] = useState(DEFAULT_BG)
  const [controlValues, setControlValues] = useState<Record<string, unknown>>({})

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

  // Reset controls to schema defaults when active component changes
  useEffect(() => {
    if (!selected?.schema) {
      setControlValues({})
      return
    }
    const defaults = Object.fromEntries(
      selected.schema.controls.map(c => [c.id, c.default])
    )
    setControlValues(defaults)
  }, [selected?.meta.id])

  function handleControlChange(id: string, value: unknown) {
    setControlValues(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-950">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
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
          bg={bg}
          onBgChange={setBg}
          controlValues={controlValues}
          onControlChange={handleControlChange}
        />
      </div>
    </div>
  )
}
