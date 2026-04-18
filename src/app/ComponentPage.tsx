import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { components } from '../components'
import Preview from './Preview'

export default function ComponentPage() {
  const { id } = useParams()
  const registration = components.find(r => r.meta.id === id) ?? null

  const [bg, setBg] = useState('#0d0d0d')
  const [controlValues, setControlValues] = useState<Record<string, unknown>>({})

  // Reset controls when ID changes
  useEffect(() => {
    if (!registration?.schema) {
      setControlValues({})
      return
    }
    const defaults = Object.fromEntries(
      registration.schema.controls.map(c => [c.id, c.default])
    )
    setControlValues(defaults)
  }, [id, registration])

  if (!registration) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
        <div className="text-white/20 text-xl font-medium">Component not found</div>
        <Link 
          to="/" 
          className="px-6 py-2.5 rounded-xl bg-accent-500 text-white font-medium hover:bg-accent-600 transition-colors"
        >
          Back to home
        </Link>
      </div>
    )
  }

  function handleControlChange(id: string, value: unknown) {
    setControlValues(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold text-white mb-3"
              >
                {registration.meta.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/40 max-w-2xl leading-relaxed"
              >
                {registration.meta.description}
              </motion.p>
            </div>
            {registration.meta.createdAt && (
              <div className="text-right">
                <div className="text-[10px] text-white/20 font-mono uppercase tracking-widest mb-1">Created</div>
                <div className="text-sm text-white/40 font-mono">{registration.meta.createdAt}</div>
              </div>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 py-6 border-b border-white/[0.05]"
          >
            <div className="flex gap-2">
              {registration.meta.tech.map(t => (
                <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/10 uppercase">
                  {t}
                </span>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex gap-2">
              {registration.meta.tags.map(tag => (
                <span key={tag} className="text-[11px] text-white/30 truncate">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </header>

        {/* Main interactive area (Preview + Code) */}
        <section className="mb-16">
          <Preview
            registration={registration}
            bg={bg}
            onBgChange={setBg}
            controlValues={controlValues}
            onControlChange={handleControlChange}
          />
        </section>

        {/* Installation Section (Future-proofing) */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Installation
          </h2>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500/20 to-accent-600/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-black rounded-2xl border border-white/10 p-5 font-mono text-sm overflow-hidden flex items-center justify-between">
              <span className="text-white/60">
                <span className="text-accent-400">npm</span> install @gabri/ui
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText('npm install @gabri/ui')}
                className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-all"
                title="Copy to clipboard"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Props Table Section */}
        {registration.meta.props && registration.meta.props.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xl font-bold text-white mb-6">Props API</h2>
            <div className="rounded-2xl border border-white/[0.05] bg-surface-900/40 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/[0.05]">
                    <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-white/40">Prop</th>
                    <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-white/40">Type</th>
                    <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-white/40">Default</th>
                    <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-white/40">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {registration.meta.props.map(prop => (
                    <tr key={prop.name} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4">
                        <code className="text-sm text-accent-400 font-mono font-bold">
                          {prop.name}
                          {prop.required && <span className="text-red-500 ml-1">*</span>}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs text-blue-300 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded">
                          {prop.type}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/40 font-mono italic">
                        {prop.default}
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60 leading-relaxed">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

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
