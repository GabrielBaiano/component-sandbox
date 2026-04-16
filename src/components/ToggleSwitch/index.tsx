import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Size config ───────────────────────────────────────────────────────────────

const SIZE = {
  sm: { trackW: 36, trackH: 20, thumbSize: 14, onX: 18, label: 'text-xs', gap: 'gap-3' },
  md: { trackW: 48, trackH: 26, thumbSize: 20, onX: 24, label: 'text-sm', gap: 'gap-4' },
  lg: { trackW: 64, trackH: 34, thumbSize: 26, onX: 32, label: 'text-base', gap: 'gap-5' },
}

type SizeKey = keyof typeof SIZE

// ── Props ─────────────────────────────────────────────────────────────────────

interface ToggleSwitchProps {
  size?: SizeKey
  disabled?: boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ToggleSwitch({ size = 'md', disabled = false }: ToggleSwitchProps) {
  const [on, setOn] = useState(false)
  const s = SIZE[size]

  return (
    <div className="flex flex-col items-center gap-10 p-12">
      <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
        Toggle Switch
      </p>

      {/* Main toggle */}
      <div className={`flex items-center ${s.gap}`}>
        <button
          onClick={() => !disabled && setOn(p => !p)}
          disabled={disabled}
          aria-pressed={on}
          aria-label="Toggle"
          className={`relative rounded-full transition-all duration-200 flex-shrink-0 ${
            disabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{
            width: s.trackW,
            height: s.trackH,
            background: on
              ? 'linear-gradient(135deg, #e85002, #c10801)'
              : 'rgba(255,255,255,0.1)',
            boxShadow: on ? '0 0 16px rgba(232,80,2,0.35)' : 'none',
          }}
        >
          {/* Thumb */}
          <motion.div
            animate={{ x: on ? s.onX : 3 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.8 }}
            className="absolute top-[3px] bg-white rounded-full shadow-md"
            style={{ width: s.thumbSize, height: s.thumbSize }}
          />

          {/* Icon inside thumb */}
          <AnimatePresence>
            {on && (
              <motion.div
                key="on-icon"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[3px] flex items-center justify-center text-accent-500"
                style={{
                  left: s.onX + 3,
                  width: s.thumbSize,
                  height: s.thumbSize,
                  fontSize: s.thumbSize * 0.45,
                }}
              >
                ✓
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence mode="wait">
          <motion.span
            key={on ? 'on' : 'off'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`font-semibold ${s.label} ${
              on ? 'text-white' : 'text-white/35'
            } ${disabled ? 'opacity-35' : ''}`}
          >
            {on ? 'On' : 'Off'}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Row of variants */}
      <div className="flex items-center gap-6">
        {(['sm', 'md', 'lg'] as SizeKey[]).map(sz => {
          const cfg = SIZE[sz]
          return (
            <div key={sz} className="flex flex-col items-center gap-2">
              <div
                className="relative rounded-full cursor-default"
                style={{
                  width: cfg.trackW,
                  height: cfg.trackH,
                  background: sz === size
                    ? 'linear-gradient(135deg, #e85002, #c10801)'
                    : 'rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="absolute top-[3px] bg-white rounded-full shadow"
                  style={{
                    left: sz === size ? cfg.onX : 3,
                    width: cfg.thumbSize,
                    height: cfg.thumbSize,
                    transition: 'left 0.2s',
                  }}
                />
              </div>
              <span className="text-[9px] text-white/25 font-mono uppercase tracking-wider">
                {sz}
              </span>
            </div>
          )
        })}
      </div>

      {disabled && (
        <p className="text-xs text-white/20 font-mono">disabled via Controls Panel ↓</p>
      )}
    </div>
  )
}
