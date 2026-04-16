import { motion, AnimatePresence } from 'framer-motion'
import { ScissorsIcon } from './Icons'

interface VisitDotProps {
  done: boolean
  index: number
  isNext: boolean
  theme: 'dark' | 'light'
  dotSize?: number
}

export function VisitDot({ done, index, isNext, theme, dotSize = 36 }: VisitDotProps) {
  const iconSize = Math.round(dotSize * 0.42)

  const doneBg = { background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }
  
  const pendingBg =
    theme === 'light'
      ? { background: 'rgba(0,0,0,0.05)', borderColor: 'rgba(0,0,0,0.12)' }
      : { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }

  const nextBg =
    theme === 'light'
      ? { background: 'rgba(220,38,38,0.08)', borderColor: 'rgba(220,38,38,0.4)' }
      : { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.35)' }

  const pulseClass = theme === 'light' ? 'border-red-400/40' : 'border-white/30'

  return (
    <motion.div
      initial={false}
      animate={done ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: dotSize, height: dotSize }}
    >
      {/* Background circle */}
      <motion.div
        animate={done ? doneBg : isNext ? nextBg : pendingBg}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-full border-[1.5px]"
      />

      {/* Done state: scissors icon */}
      <AnimatePresence>
        {done && (
          <motion.span
            key="scissors"
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="text-white relative z-10"
          >
            <ScissorsIcon size={iconSize} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Next-up: pulsing ring */}
      {isNext && !done && (
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute inset-0 rounded-full border ${pulseClass}`}
        />
      )}
    </motion.div>
  )
}
