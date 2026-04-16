import { motion, AnimatePresence } from 'framer-motion'
import type { RegisteredComponent } from '../types'

// Neutral badges — all in the same brand-aligned style.
// A subtle dot prefix distinguishes the tech visually without breaking the palette.
const TECH_DOT: Record<string, string> = {
  react:           '#61dafb',
  tailwind:        '#38bdf8',
  'framer-motion': '#e85002',
  'html-css':      '#f97316',
  typescript:      '#3b82f6',
}

interface SidebarProps {
  components: RegisteredComponent[]
  selected: string | null
  onSelect: (id: string) => void
  query: string
  onQueryChange: (q: string) => void
}

export default function Sidebar({
  components,
  selected,
  onSelect,
  query,
  onQueryChange,
}: SidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0 flex flex-col h-full border-r border-white/[0.05] bg-black/60 backdrop-blur-md">

      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #e85002, #c10801)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none">Component Sandbox</h1>
            <p className="text-[10px] text-white/30 mt-0.5 font-mono">
              {components.length} component{components.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="search-components"
            type="text"
            placeholder="Search component..."
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.07] rounded-lg pl-9 pr-4 py-2.5
                       text-sm text-white placeholder-white/20 outline-none
                       focus:border-accent-400/50 focus:ring-1 focus:ring-accent-400/20 transition-all"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Component list */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        <AnimatePresence>
          {components.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-white/20 text-center py-8 px-4"
            >
              No components found for "{query}"
            </motion.p>
          ) : (
            components.map((reg, i) => {
              const isActive = reg.meta.id === selected
              return (
                <motion.button
                  key={reg.meta.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => onSelect(reg.meta.id)}
                  id={`nav-${reg.meta.id}`}
                  className={`w-full text-left px-3 py-3 rounded-xl transition-all group
                    ${isActive
                      ? 'border border-accent-400/30'
                      : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  style={isActive ? { background: 'rgba(232,80,2,0.1)' } : {}}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-accent-400' : 'text-white/70 group-hover:text-white/90'}`}>
                        {reg.meta.name}
                      </p>
                      <p className="text-[11px] text-white/25 mt-0.5 line-clamp-2 leading-relaxed">
                        {reg.meta.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#e85002' }} />
                    )}
                  </div>

                  {/* Tech badges — neutral style with a colored dot */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {reg.meta.tech.map(t => (
                      <span
                        key={t}
                        className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md border font-mono bg-white/[0.04] text-white/40 border-white/[0.07]"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: TECH_DOT[t] ?? '#646464' }}
                        />
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.button>
              )
            })
          )}
        </AnimatePresence>
      </nav>

      {/* Footer hint */}
      <div className="px-5 py-4 border-t border-white/[0.05]">
        <p className="text-[10px] text-white/20 font-mono leading-relaxed">
          Add components in<br />
          <span className="text-white/30">src/components/index.ts</span>
        </p>
      </div>
    </aside>
  )
}
