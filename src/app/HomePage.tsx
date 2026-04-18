import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { components } from '../components'

const TECH_DOT: Record<string, string> = {
  react:           '#61dafb',
  tailwind:        '#38bdf8',
  'framer-motion': '#e85002',
  'html-css':      '#f97316',
  typescript:      '#3b82f6',
}

export default function HomePage() {
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
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {/* Hero Section */}
      <section className="px-8 pt-16 pb-12 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] font-mono uppercase tracking-widest mb-6"
        >
          {components.length} Components Available
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          Build faster with <span className="gradient-brand-text">Gabri UI</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A professional collection of copy-paste components for React and Tailwind CSS. 
          Beautifully designed, fully customizable, and production-ready.
        </motion.p>

        {/* Search Bar in Landing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-md mx-auto"
        >
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search for a component..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4
                       text-base text-white placeholder-white/20 outline-none
                       focus:border-accent-500/50 focus:ring-4 focus:ring-accent-500/10 transition-all shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((reg, i) => (
            <motion.div
              key={reg.meta.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={`/components/${reg.meta.id}`}
                className="group relative block bg-surface-900/40 border border-white/[0.05] rounded-3xl overflow-hidden hover:border-accent-500/30 transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] active:scale-[0.98]"
              >
                {/* Preview Area (Static) */}
                <div className="h-48 bg-black/40 flex items-center justify-center p-6 border-b border-white/[0.03] overflow-hidden">
                  <div className="scale-75 pointer-events-none origin-center group-hover:scale-[0.8] transition-transform duration-500">
                    <reg.Component />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
                      {reg.meta.name}
                    </h3>
                    <div className="flex gap-1">
                      {reg.meta.tech.map(t => (
                        <div
                          key={t}
                          className="w-2 h-2 rounded-full"
                          style={{ background: TECH_DOT[t] ?? '#646464' }}
                          title={t}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/30 line-clamp-2 leading-relaxed h-10">
                    {reg.meta.description}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {reg.meta.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/20 border border-white/5 uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-white/10 text-xl font-medium">No components matching "{query}"</div>
            <button 
              onClick={() => setQuery('')}
              className="mt-4 text-accent-400 hover:text-accent-300 transition-colors text-sm"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(232, 80, 2, 0.2);
        }
      `}</style>
    </div>
  )
}
