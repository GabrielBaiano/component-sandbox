import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RegisteredComponent } from '../types';
import BgPicker from './BgPicker';
import ControlsPanel from './ControlsPanel';
import CodeViewer from './CodeViewer';

interface PreviewProps {
  registration: RegisteredComponent | null;
  bg: string;
  onBgChange: (bg: string) => void;
  controlValues: Record<string, unknown>;
  onControlChange: (id: string, value: unknown) => void;
}

export default function Preview({
  registration,
  bg,
  onBgChange,
  controlValues,
  onControlChange,
}: PreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const hasControls = !!registration?.schema?.controls.length;

  return (
    <div className="flex h-full flex-1 flex-col">
      {/* ── Toolbar ── */}
      {/* ── Toolbar (Floating Pill) ── */}
      <div className="mx-4 mb-2 mt-4 flex flex-shrink-0 items-center justify-between rounded-2xl border border-white/[0.08] bg-surface-900/60 px-6 py-3 shadow-2xl shadow-black/40 backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-4">
          {registration ? (
            <>
              <div className="flex items-center gap-3">
                <h2 className="truncate text-sm font-semibold text-white">
                  {registration.meta.name}
                </h2>
                <span className="flex-shrink-0 text-white/20">·</span>
              </div>

              {/* Tab Toggle */}
              <div className="flex rounded-xl border border-white/5 bg-white/5 p-1">
                <button
                  onClick={() => setTab('preview')}
                  className={`rounded-lg px-3 py-1 text-[11px] font-medium transition-all ${tab === 'preview' ? 'bg-accent-400 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setTab('code')}
                  className={`rounded-lg px-3 py-1 text-[11px] font-medium transition-all ${tab === 'code' ? 'bg-accent-400 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                  Code
                </button>
              </div>
            </>
          ) : (
            <h2 className="text-sm text-white/30">
              Select a component from the sidebar
            </h2>
          )}
        </div>

        {registration && (
          <div className="ml-4 flex flex-shrink-0 items-center gap-2">
            {/* Tags (only in preview) */}
            {tab === 'preview' && (
              <div className="hidden items-center gap-1.5 sm:flex">
                {registration.meta.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/30"
                  >
                    #{tag}
                  </span>
                ))}
                <div className="mx-1 h-4 w-px bg-white/10" />
                <BgPicker value={bg} onChange={onBgChange} />
              </div>
            )}

            {tab === 'code' && (
              <div className="font-mono text-[10px] text-white/30">
                {registration.meta.tech.join(' + ')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Content area ── */}
      <div className="min-h-0 flex-1 overflow-auto p-8">
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
                  className="flex h-full min-h-[480px] items-center justify-center overflow-hidden rounded-2xl"
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
              className="flex min-h-[480px] flex-col items-center justify-center gap-4"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl opacity-20"
                style={{
                  background: 'linear-gradient(135deg, #e85002, #c10801)',
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <p className="text-sm text-white/20">No component selected</p>
              <p className="font-mono text-xs text-white/10">
                ← pick one from the sidebar
              </p>
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
  );
}
