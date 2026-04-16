import { motion, AnimatePresence } from 'framer-motion'
import type { RegisteredComponent } from '../types'

interface PreviewProps {
  registration: RegisteredComponent | null
  darkBg: boolean
  onToggleBg: () => void
}

export default function Preview({ registration, darkBg, onToggleBg }: PreviewProps) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">

      {/* Preview toolbar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.06] bg-surface-900/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {registration ? (
            <>
              <h2 className="text-sm font-semibold text-white">{registration.meta.name}</h2>
              <span className="text-white/20">·</span>
              <p className="text-xs text-white/40">{registration.meta.description}</p>
            </>
          ) : (
            <h2 className="text-sm text-white/30">Select a component from the sidebar</h2>
          )}
        </div>

        {registration && (
          <div className="flex items-center gap-2">
            {/* Tags */}
            <div className="hidden sm:flex gap-1.5">
              {registration.meta.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10 mx-1" />
            {/* Background toggle */}
            <button
              id="toggle-preview-bg"
              onClick={onToggleBg}
              title="Toggle preview background"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white/80
                         hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all"
            >
              {darkBg ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                  Light
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  Dark
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto p-8">
        <AnimatePresence mode="wait">
          {registration ? (
            <motion.div
              key={registration.meta.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="min-h-full rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: darkBg
                  ? 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 60%), #0a0a14'
                  : 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 60%), #f0f0f8',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '480px',
              }}
            >
              <registration.Component />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full min-h-[480px] flex flex-col items-center justify-center gap-4"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-20"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <p className="text-white/20 text-sm">No component selected</p>
              <p className="text-white/10 text-xs font-mono">← pick one from the sidebar</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
