import { motion, AnimatePresence } from 'framer-motion'
import type { RegisteredComponent } from '../types'
import BgPicker from './BgPicker'
import ControlsPanel from './ControlsPanel'

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
  const hasControls = !!(registration?.schema?.controls.length)

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.06] bg-surface-900/40 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {registration ? (
            <>
              <h2 className="text-sm font-semibold text-white truncate">{registration.meta.name}</h2>
              <span className="text-white/20 flex-shrink-0">·</span>
              <p className="text-xs text-white/40 truncate">{registration.meta.description}</p>
            </>
          ) : (
            <h2 className="text-sm text-white/30">Select a component from the sidebar</h2>
          )}
        </div>

        {registration && (
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            {/* Tags */}
            <div className="hidden sm:flex gap-1.5">
              {registration.meta.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10 mx-1" />
            {/* Background picker */}
            <BgPicker value={bg} onChange={onBgChange} />
          </div>
        )}
      </div>

      {/* ── Preview area ── */}
      <div className="flex-1 overflow-auto p-8 min-h-0">
        <AnimatePresence mode="wait">
          {registration ? (
            <motion.div
              key={registration.meta.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: bg,
                border: '1px solid rgba(255,255,255,0.04)',
                minHeight: '480px',
              }}
            >
              <registration.Component {...controlValues} />
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

      {/* ── Controls panel (only if schema exists) ── */}
      <AnimatePresence>
        {registration && hasControls && (
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
