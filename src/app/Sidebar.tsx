import { motion, AnimatePresence } from 'framer-motion'
import type { RegisteredComponent } from '../types'

const TECH_COLORS: Record<string, string> = {
  react:          'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  tailwind:       'bg-sky-500/15 text-sky-400 border-sky-500/20',
  'framer-motion':'bg-purple-500/15 text-purple-400 border-purple-500/20',
  'html-css':     'bg-orange-500/15 text-orange-400 border-orange-500/20',
  typescript:     'bg-blue-500/15 text-blue-400 border-blue-500/20',
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
    <aside className="w-72 flex-shrink-0 flex flex-col h-full border-r border-white/[0.06] bg-surface-900/60 backdrop-blur-md">

      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
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
            className="w-full bg-surface-950/60 border border-white/[0.08] rounded-lg pl-9 pr-4 py-2.5
                       text-sm text-white placeholder-white/25 outline-none
                       focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/20 transition-all"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Component list */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <AnimatePresence>
          {components.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-white/25 text-center py-8 px-4"
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
                      ? 'bg-accent-500/15 border border-accent-500/30'
                      : 'hover:bg-white/[0.04] border border-transparent'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-accent-400' : 'text-white/80 group-hover:text-white'}`}>
                        {reg.meta.name}
                      </p>
                      <p className="text-xs text-white/30 mt-0.5 line-clamp-2 leading-relaxed">
                        {reg.meta.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 flex-shrink-0" />
                    )}
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {reg.meta.tech.map(t => (
                      <span
                        key={t}
                        className={`text-[10px] px-1.5 py-0.5 rounded-md border font-mono ${TECH_COLORS[t] ?? 'bg-white/10 text-white/50 border-white/10'}`}
                      >
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
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <p className="text-[10px] text-white/20 font-mono leading-relaxed">
          Add components in<br />
          <span className="text-white/35">src/components/index.ts</span>
        </p>
      </div>
    </aside>
  )
}
