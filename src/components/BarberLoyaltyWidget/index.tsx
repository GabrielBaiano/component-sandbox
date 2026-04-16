/**
 * BarberLoyaltyWidget
 *
 * iOS-style loyalty widget for a barbershop app.
 * Tracks visits until a free haircut is earned.
 *
 * Props:
 *   size        — 'small' | 'medium' | 'large'  (default: 'small')
 *   lightTheme  — boolean                        (default: false)
 *   total       — number of visits needed        (default: 8)
 *
 * Sub-components (all in the same folder):
 *   Icons.tsx       — ScissorsIcon, BarcodeIcon
 *   BarberStripe.tsx — decorative pole stripes
 *   VisitDot.tsx    — individual visit circle
 *   schema.ts       — sandbox control definitions
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScissorsIcon, BarcodeIcon } from './Icons'
import { BarberStripe } from './BarberStripe'
import { VisitDot } from './VisitDot'

// ── Size configs ──────────────────────────────────────────────────────────────

type Size = 'small' | 'medium' | 'large'

const SIZE_CONFIG: Record<Size, {
  width: number
  height: number
  dotSize: number
  dotsPerRow: number
  padding: string
  fontSize: string
  layout: 'compact' | 'wide' | 'tall'
}> = {
  small: {
    width: 200,
    height: 200,
    dotSize: 34,
    dotsPerRow: 4,
    padding: 'p-4',
    fontSize: 'text-[14px]',
    layout: 'compact',
  },
  medium: {
    width: 420,
    height: 200,
    dotSize: 34,
    dotsPerRow: 8,
    padding: 'p-5',
    fontSize: 'text-[15px]',
    layout: 'wide',
  },
  large: {
    width: 420,
    height: 420,
    dotSize: 44,
    dotsPerRow: 6,
    padding: 'p-6',
    fontSize: 'text-[18px]',
    layout: 'tall',
  },
}

// ── Theme colors ──────────────────────────────────────────────────────────────

type Theme = 'dark' | 'light'

const THEME: Record<Theme, {
  bg: string
  text: string
  subtext: string
  brandLabel: string
  divider: string
}> = {
  dark: {
    bg: 'linear-gradient(145deg, #0d1b36 0%, #0a1325 100%)',
    text: '#ffffff',
    subtext: 'rgba(255,255,255,0.4)',
    brandLabel: 'rgba(255,255,255,0.35)',
    divider: 'rgba(255,255,255,0.08)',
  },
  light: {
    bg: 'linear-gradient(145deg, #f0f4ff 0%, #e8eeff 100%)',
    text: '#0d1b36',
    subtext: 'rgba(13,27,54,0.5)',
    brandLabel: 'rgba(13,27,54,0.4)',
    divider: 'rgba(13,27,54,0.08)',
  },
}

// ── Component ─────────────────────────────────────────────────────────────────

interface BarberLoyaltyWidgetProps {
  size?: Size
  lightTheme?: boolean
  total?: number
}

export default function BarberLoyaltyWidget({
  size = 'small',
  lightTheme = false,
  total = 8,
}: BarberLoyaltyWidgetProps) {
  const [visits, setVisits] = useState(5)
  const theme: Theme = lightTheme ? 'light' : 'dark'
  const cfg = SIZE_CONFIG[size]
  const t = THEME[theme]

  // Clamp visits when total changes
  useEffect(() => {
    setVisits(v => Math.min(v, total))
  }, [total])

  const remaining = total - visits
  const isFree = visits >= total
  const progress = Math.min(visits / total, 1)

  // Build dot rows
  const dotsPerRow = Math.min(cfg.dotsPerRow, total)
  const rows: number[][] = []
  let i = 0
  while (i < total) {
    rows.push(Array.from({ length: Math.min(dotsPerRow, total - i) }, (_, k) => i + k))
    i += dotsPerRow
  }

  return (
    <div className="flex flex-col items-center gap-8 p-10">

      {/* ── Widget card ── */}
      <motion.div
        layout
        animate={
          isFree
            ? { boxShadow: '0 0 0 2px #dc2626, 0 24px 64px rgba(220,38,38,0.35)' }
            : { boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }
        }
        transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 }, boxShadow: { duration: 0.4 } }}
        className={`relative overflow-hidden flex flex-col justify-between ${cfg.padding}`}
        style={{
          width: cfg.width,
          height: cfg.height,
          background: t.bg,
          borderRadius: 28,
        }}
      >
        <BarberStripe theme={theme} />

        {/* Top section */}
        <div className="flex flex-col gap-3">
          {/* Brand label */}
          <div className="flex items-center gap-1.5">
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: 18,
                height: 18,
                background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              }}
            >
              <ScissorsIcon size={9} color="white" />
            </div>
            <span
              className="text-[9px] font-bold tracking-[0.18em] uppercase"
              style={{ color: t.brandLabel }}
            >
              Barber Shopp
            </span>
          </div>

          {/* Dots grid */}
          <div className="flex flex-col gap-1.5">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex items-center gap-1.5">
                {row.map(dotIdx => (
                  <VisitDot
                    key={dotIdx}
                    index={dotIdx}
                    done={dotIdx < visits}
                    isNext={dotIdx === visits}
                    theme={theme}
                    dotSize={cfg.dotSize}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Progress bar — only on large */}
          {cfg.layout === 'tall' && (
            <div className="mt-1">
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: 4, background: t.divider }}
              >
                <motion.div
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #dc2626, #b91c1c)' }}
                />
              </div>
              <p className="text-[10px] mt-1" style={{ color: t.subtext }}>
                {Math.round(progress * 100)}% complete
              </p>
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className="flex items-end justify-between">
          <AnimatePresence mode="wait">
            {isFree ? (
              <motion.div
                key="free"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p className={`font-bold leading-tight ${cfg.fontSize}`} style={{ color: t.text }}>
                  Free cut<br />
                  <span style={{ color: '#dc2626' }}>unlocked! 🎉</span>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="count"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p className={`font-bold leading-tight ${cfg.fontSize}`} style={{ color: t.text }}>
                  <motion.span
                    key={remaining}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="inline-block"
                    style={{ color: '#dc2626' }}
                  >
                    {remaining}
                  </motion.span>{' '}
                  cut{remaining !== 1 ? 's' : ''}<br />
                  left to free
                </p>
                {cfg.layout === 'tall' && (
                  <p className="text-[11px] mt-1" style={{ color: t.subtext }}>
                    {visits} of {total} visits done
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ opacity: isFree ? 1 : 0.3 }}
            style={{ color: t.text }}
          >
            <BarcodeIcon size={cfg.layout === 'tall' ? 36 : 26} />
          </motion.div>
        </div>

        {/* Shimmer on free */}
        <AnimatePresence>
          {isFree && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: 28,
                background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, transparent 60%)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Demo controls ── */}
      <div className="flex gap-2.5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setVisits(v => Math.min(v + 1, total))}
          disabled={isFree}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-30 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
        >
          + Add visit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setVisits(0)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all"
        >
          Reset
        </motion.button>
      </div>

      {/* Visit counter */}
      <p className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {visits}/{total} visits
      </p>
    </div>
  )
}
