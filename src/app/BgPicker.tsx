import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Preset backgrounds ────────────────────────────────────────────────────────

const PRESETS = [
  // Dark
  { label: 'Near black',    value: '#0d0d0d' },
  { label: 'Pitch black',   value: '#000000' },
  { label: 'Dark brown',    value: '#1a0a00' },
  { label: 'Charcoal',      value: '#1c1c1c' },
  { label: 'Dark gray',     value: '#333333' },
  { label: 'Warm charcoal', value: '#1a1208' },
  // Light
  { label: 'White',         value: '#ffffff' },
  { label: 'Off-white',     value: '#f9f9f9' },
  { label: 'Light gray',    value: '#f0f0f0' },
  { label: 'Warm white',    value: '#faf8f5' },
  { label: 'Cream',         value: '#fffdf0' },
  { label: 'Stone',         value: '#f5f0eb' },
  // Mid
  { label: 'Gray',          value: '#646464' },
  { label: 'Dark gray 2',   value: '#2a2a2a' },
  { label: 'Smoke',         value: '#1a1a1a' },
  { label: 'Zinc',          value: '#27272a' },
  { label: 'Warm dark',     value: '#18120a' },
  { label: 'Amber dark',    value: '#1a1200' },
]

const GRADIENT_PRESETS = [
  { label: 'Radial orange',  value: 'radial-gradient(ellipse at 50% 0%, rgba(232,80,2,0.18), #0d0d0d)' },
  { label: 'Radial amber',   value: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.15), #0d0d0d)' },
  { label: 'Brand mesh',     value: 'radial-gradient(at 30% 20%, #1a0800 0%, #000000 50%, #1a0d00 100%)' },
  { label: 'Warm gradient',  value: 'linear-gradient(135deg, #1a0800 0%, #2a1000 50%, #1a0a00 100%)' },
  { label: 'Midnight',       value: 'linear-gradient(180deg, #111111 0%, #000000 100%)' },
  { label: 'Ember',          value: 'linear-gradient(135deg, #1c0a00 0%, #0d0d0d 60%, #1a0800 100%)' },
]

// ── Component ─────────────────────────────────────────────────────────────────

interface BgPickerProps {
  value: string
  onChange: (bg: string) => void
}

export default function BgPicker({ value, onChange }: BgPickerProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'presets' | 'custom'>('presets')
  const [hex, setHex] = useState('#0a0a14')
  const [hexInput, setHexInput] = useState('#0a0a14')
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Close on click outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function openPicker() {
    clearTimeout(timerRef.current)
    setOpen(true)
  }

  function closePicker() {
    timerRef.current = setTimeout(() => setOpen(false), 200)
  }

  function applyHex(raw: string) {
    const clean = raw.startsWith('#') ? raw : `#${raw}`
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(clean)) {
      setHex(clean)
      onChange(clean)
    }
    setHexInput(clean)
  }

  const isGradient = value.includes('gradient')

  return (
    <div ref={ref} className="relative" onMouseLeave={closePicker}>
      {/* Trigger button */}
      <button
        id="bg-picker-trigger"
        onMouseEnter={openPicker}
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/50
                   hover:text-white/80 border border-white/10 hover:border-white/20
                   transition-all group"
      >
        {/* Color preview */}
        <span
          className="w-3.5 h-3.5 rounded-sm border border-white/10 flex-shrink-0"
          style={{ background: value }}
        />
        Background
        <svg
          className={`w-2.5 h-2.5 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={openPicker}
            className="absolute right-0 top-full mt-2 z-50 w-72 rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
            style={{ background: '#111111' }}
          >
            {/* Tabs */}
            <div className="flex border-b border-white/[0.06]">
              {(['presets', 'custom'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2.5 text-xs font-medium capitalize transition-colors
                    ${tab === t ? 'text-white border-b border-accent-400' : 'text-white/30 hover:text-white/60'}`}
                >
                  {t === 'presets' ? 'Presets' : 'Custom'}
                </button>
              ))}
            </div>

            <div className="p-4">
              {tab === 'presets' ? (
                <div className="flex flex-col gap-4">
                  {/* Solid presets */}
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2 font-mono">Solid</p>
                    <div className="grid grid-cols-6 gap-1.5">
                      {PRESETS.map(p => (
                        <button
                          key={p.value}
                          title={p.label}
                          onClick={() => onChange(p.value)}
                          className="w-8 h-8 rounded-lg border-2 transition-all hover:scale-110"
                          style={{
                            background: p.value,
                            borderColor: value === p.value ? '#e85002' : 'rgba(255,255,255,0.08)',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Gradient presets */}
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2 font-mono">Gradients</p>
                    <div className="grid grid-cols-3 gap-2">
                      {GRADIENT_PRESETS.map(g => (
                        <button
                          key={g.label}
                          title={g.label}
                          onClick={() => onChange(g.value)}
                          className="h-10 rounded-xl border-2 transition-all hover:scale-105 text-[9px] text-white/40 font-mono"
                          style={{
                            background: g.value,
                            borderColor: value === g.value ? '#e85002' : 'rgba(255,255,255,0.08)',
                          }}
                        >
                          {value === g.value && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Custom tab */
                <div className="flex flex-col gap-4">
                  {/* Color wheel */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={isGradient ? '#0a0a14' : hex}
                        onChange={e => {
                          setHex(e.target.value)
                          setHexInput(e.target.value)
                          onChange(e.target.value)
                        }}
                        className="w-10 h-10 rounded-xl cursor-pointer opacity-0 absolute inset-0"
                      />
                      <div
                        className="w-10 h-10 rounded-xl border border-white/10 pointer-events-none"
                        style={{ background: isGradient ? '#0a0a14' : hex }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-white/30 mb-1">Hex value</p>
                      <div className="flex items-center gap-1.5 bg-surface-950/60 border border-white/10 rounded-lg px-3 py-1.5">
                        <span className="text-white/25 text-xs">#</span>
                        <input
                          type="text"
                          value={hexInput.replace('#', '')}
                          onChange={e => setHexInput('#' + e.target.value)}
                          onBlur={e => applyHex(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && applyHex(hexInput)}
                          maxLength={6}
                          className="flex-1 bg-transparent text-xs text-white font-mono outline-none w-full"
                          placeholder="0a0a14"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick solids */}
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2 font-mono">Quick picks</p>
                    <div className="grid grid-cols-8 gap-1">
                      {['#000000', '#ffffff', '#e85002', '#c10801', '#f59e0b', '#d97706', '#333333', '#646464'].map(c => (
                        <button
                          key={c}
                          onClick={() => { setHex(c); setHexInput(c); onChange(c) }}
                          className="w-7 h-7 rounded-lg border-2 hover:scale-110 transition-transform"
                          style={{
                            background: c,
                            borderColor: value === c ? '#e85002' : 'rgba(255,255,255,0.1)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Current value display */}
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <p className="text-[9px] text-white/20 font-mono truncate">{value}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
