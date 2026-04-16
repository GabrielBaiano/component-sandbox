import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RegisteredComponent } from '../types'
import BgPicker from './BgPicker'
import ControlsPanel from './ControlsPanel'
import CodeViewer from './CodeViewer'

interface PreviewProps {
  registration: RegisteredComponent | null
  bg: string
  onBgChange: (bg: string) => void
  controlValues: Record<string, unknown>
  onControlChange: (id: string, value: unknown) => void
}

export default function Preview({
  registration,
  bg,
  onBgChange,
  controlValues,
  onControlChange,
}: PreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const hasControls = !!(registration?.schema?.controls.length)

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.06] bg-surface-900/40 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          {registration ? (
            <>
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-white truncate">{registration.meta.name}</h2>
                <span className="text-white/20 flex-shrink-0">·</span>
              </div>
              
              {/* Tab Toggle */}
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setTab('preview')}
                  className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-all ${tab === 'preview' ? 'bg-accent-400 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setTab('code')}
                  className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-all ${tab === 'code' ? 'bg-accent-400 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                  Code
                </button>
              </div>
            </>
          ) : (
            <h2 className="text-sm text-white/30">Select a component from the sidebar</h2>
          )}
        </div>

        {registration && (
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            {/* Tags (only in preview) */}
            {tab === 'preview' && (
              <div className="hidden sm:flex items-center gap-1.5">
                {registration.meta.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
                <div className="w-px h-4 bg-white/10 mx-1" />
                <BgPicker value={bg} onChange={onBgChange} />
              </div>
            )}
            
            {tab === 'code' && (
              <div className="text-[10px] text-white/30 font-mono">
                {registration.meta.tech.join(' + ')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 overflow-auto p-8 min-h-0">
        <AnimatePresence mode="wait">
          {registration ? (
            <motion.div
              key={`${registration.meta.id}-${tab}`}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full w-full"
            >
              {tab === 'preview' ? (
                <div
                  className="rounded-2xl overflow-hidden flex items-center justify-center min-h-[480px] h-full"
                  style={{
                    background: bg,
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <registration.Component {...controlValues} />
                </div>
              ) : (
                <CodeViewer 
                  source={registration.source} 
                  filename={`${registration.meta.id}/index.tsx`} 
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[480px] flex flex-col items-center justify-center gap-4"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-20"
                style={{ background: 'linear-gradient(135deg, #e85002, #c10801)' }}
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

      {/* ── Controls panel (only if preview and schema exists) ── */}
      <AnimatePresence>
        {registration && tab === 'preview' && hasControls && (
          <ControlsPanel
            schema={registration.schema!}
            values={controlValues}
            onChange={onControlChange}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
