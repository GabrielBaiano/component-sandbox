import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { RegisteredComponent } from '../types'

// Neutral badges — all in the same brand-aligned style.
// A subtle dot prefix distinguishes the tech visually without breaking the palette.
const TECH_DOT: Record<string, string> = {
  react: '#61dafb',
  tailwind: '#38bdf8',
  'framer-motion': '#e85002',
  'html-css': '#f97316',
  typescript: '#3b82f6',
}

interface SidebarProps {
  components: RegisteredComponent[]
  searchText: string
  onSearchChange: (s: string) => void
  activeTags: string[]
  onTagsChange: (tags: string[]) => void
  allTags: string[]
  allTech: string[]
}

const TECH_COLORS: Record<string, { bg: string, text: string, border: string }> = {
  react: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  tailwind: { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
  'framer-motion': { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
  typescript: { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
}

export default function Sidebar({
  components,
  searchText,
  onSearchChange,
  activeTags,
  onTagsChange,
  allTags,
  allTech,
}: SidebarProps) {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleTag = (tag: string) => {
    const t = tag.toLowerCase()
    if (activeTags.includes(t)) {
      onTagsChange(activeTags.filter(at => at !== t))
    } else {
      onTagsChange([...activeTags, t])
      onSearchChange('') // Clear text after adding tag
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && searchText.startsWith('#')) {
      e.preventDefault()
      const tag = searchText.slice(1).trim().toLowerCase()
      if (tag && !activeTags.includes(tag)) {
        onTagsChange([...activeTags, tag])
        onSearchChange('')
      }
    } else if (e.key === 'Backspace' && searchText === '' && activeTags.length > 0) {
      onTagsChange(activeTags.slice(0, -1))
    }
  }

  return (
    <aside className="w-80 flex-shrink-0 flex flex-col h-full border-r border-white/[0.05] bg-black/60 backdrop-blur-md relative z-50">

      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-white/[0.05]">
        <Link
          to="/"
          className="flex items-center gap-2.5 mb-5 group active:scale-95 transition-transform"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(232,80,2,0.4)] transition-all"
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
            <h1 className="text-sm font-bold text-white leading-none group-hover:text-accent-400 transition-colors">Gabri UI</h1>
            <p className="text-[10px] text-white/30 mt-0.5 font-mono">
              Build your library
            </p>
          </div>
        </Link>

        {/* Search & Filter Dropdown Area */}
        <div className="relative">
          <div
            className={`min-h-[42px] flex flex-wrap items-center gap-1.5 p-1.5 bg-white/[0.04] border rounded-xl transition-all
              ${isMenuOpen ? 'border-accent-400/50 ring-1 ring-accent-400/20 shadow-lg' : 'border-white/[0.07]'}
            `}
          >
            <svg
              className="ml-2 text-white/25 flex-shrink-0"
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            {/* Chips */}
            <AnimatePresence>
              {activeTags.map(tag => {
                const colors = TECH_COLORS[tag] || { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.6)', border: 'rgba(255,255,255,0.1)' }
                return (
                  <motion.div
                    key={tag}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono border"
                    style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
                  >
                    #{tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="hover:text-white transition-colors ml-0.5"
                    >
                      ×
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Input */}
            <input
              type="text"
              placeholder={activeTags.length === 0 ? "Search or #tag..." : ""}
              value={searchText}
              onChange={e => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsMenuOpen(true)}
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-white/20 min-w-[60px]"
            />
          </div>

          {/* Toggle Button for Inline Filters */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`mt-3 w-full flex items-center justify-between px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all
              ${isMenuOpen ? 'bg-accent-500/10 text-accent-400' : 'text-white/20 hover:text-white/40 hover:bg-white/[0.03]'}
            `}
          >
            <div className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 6h18M7 12h10M10 18h4" />
              </svg>
              Filter Options
            </div>
            <motion.svg 
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </button>

          {/* Inline Accordion Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-5 pb-2 space-y-6">
                  <div>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-3 ml-1">Categories</p>
                    <div className="flex flex-wrap gap-1.5">
                      {allTags.map(tag => {
                        const isActive = activeTags.includes(tag.toLowerCase())
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-2 py-1 rounded-md text-[10px] font-mono border transition-all
                              ${isActive 
                                ? 'bg-white/10 border-white/20 text-white' 
                                : 'bg-white/[0.03] border-white/[0.06] text-white/30 hover:text-white/60 hover:bg-white/[0.06]'}`}
                          >
                            #{tag.toLowerCase()}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-3 ml-1">Technology</p>
                    <div className="flex flex-wrap gap-1.5 px-0.5">
                      {allTech.map(tech => {
                        const t = tech.toLowerCase()
                        const isActive = activeTags.includes(t)
                        const colors = TECH_COLORS[t] || { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.6)', border: 'rgba(255,255,255,0.1)' }
                        return (
                          <button
                            key={tech}
                            onClick={() => toggleTag(tech)}
                            className="px-2 py-1 rounded-md text-[10px] font-mono border transition-all flex items-center gap-1.5"
                            style={isActive ? {
                              background: colors.bg,
                              color: colors.text,
                              borderColor: colors.border,
                            } : {
                              background: 'rgba(255,255,255,0.03)',
                              borderColor: 'rgba(255,255,255,0.06)',
                              color: 'rgba(255,255,255,0.3)'
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors.text }} />
                            #{t}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Component list */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 custom-scrollbar">
        <AnimatePresence>
          {components.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-white/20 text-center py-8 px-4 font-mono"
            >
              No results match
            </motion.p>
          ) : (
            components.map((reg, i) => {
              const isActive = location.pathname === `/components/${reg.meta.id}`
              return (
                <Link
                  key={reg.meta.id}
                  to={`/components/${reg.meta.id}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
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

                    {/* Restored tech badges — neutral style with a colored dot */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {reg.meta.tech.map(t => (
                        <span
                          key={t}
                          className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md border font-mono bg-white/[0.04] text-white/40 border-white/[0.07]"
                        >
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: TECH_DOT[t] ?? '#646464' }}
                          />
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              )
            })
          )}
        </AnimatePresence>
      </nav>

      {/* Footer hint */}
      <div className="px-5 py-4 border-t border-white/[0.05]">
        <p className="text-[10px] text-white/20 font-mono leading-relaxed">
          {components.length} component{components.length !== 1 ? 's' : ''} available<br />
          <span className="text-white/30">src/components/index.ts</span>
        </p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(232, 80, 2, 0.2);
        }
      `}</style>
    </aside>
  )
}
