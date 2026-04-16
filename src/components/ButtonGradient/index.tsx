import { motion } from 'framer-motion'

export default function ButtonGradient() {
  return (
    <div className="flex flex-col items-center gap-10 p-12">
      <h2 className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
        Button Gradient
      </h2>

      {/* Row 1: Core variants */}
      <div className="flex flex-wrap gap-4 items-center justify-center">

        {/* Primary — solid orange */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-8 py-3 rounded-xl font-semibold text-white text-sm overflow-hidden group"
          style={{ background: 'linear-gradient(135deg, #e85002, #c10801)' }}
        >
          <span className="relative z-10">Get Started</span>
          <motion.span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #f16001, #e85002)',
              boxShadow: '0 0 32px rgba(232,80,2,0.55)',
            }}
          />
        </motion.button>

        {/* Outline — orange border */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-8 py-3 rounded-xl font-semibold text-sm overflow-hidden group"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(232,80,2,0.6)',
            color: '#e85002',
          }}
        >
          <motion.span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(232,80,2,0.08)' }}
          />
          <span className="relative z-10">Learn More</span>
        </motion.button>

        {/* Amber accent */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-8 py-3 rounded-xl font-semibold text-black text-sm overflow-hidden group"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #e85002)' }}
        >
          <motion.span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          />
          <span className="relative z-10">Amber</span>
        </motion.button>

        {/* Ghost — dark surface */}
        <motion.button
          whileHover={{ scale: 1.05, borderColor: 'rgba(232,80,2,0.4)' }}
          whileTap={{ scale: 0.97 }}
          className="relative px-8 py-3 rounded-xl font-semibold text-sm text-white/60 hover:text-white transition-colors"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Ghost
        </motion.button>
      </div>

      {/* Row 2: Warm animated gradient */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-8 py-3 rounded-xl font-semibold text-white text-sm overflow-hidden"
        >
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(270deg, #f59e0b, #e85002, #c10801, #e85002, #f59e0b)',
              backgroundSize: '300% 300%',
            }}
          />
          <span className="relative z-10">Warm Wave</span>
        </motion.button>

        {/* Dark with shimmer */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="relative px-10 py-3.5 rounded-xl font-bold text-white text-sm overflow-hidden"
          style={{
            background: '#111111',
            border: '1px solid rgba(232,80,2,0.3)',
            boxShadow: '0 0 20px rgba(232,80,2,0.15)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e85002" strokeWidth="2.5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Launch
          </span>
          <motion.span
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(232,80,2,0.5), transparent)',
              width: '60%',
            }}
          />
        </motion.button>

        {/* CTA large */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="relative px-12 py-4 rounded-2xl font-bold text-white text-base overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e85002, #c10801)',
            boxShadow: '0 8px 32px rgba(232,80,2,0.4)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Launch Project
          </span>
          <motion.span
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-25"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              width: '60%',
            }}
          />
        </motion.button>
      </div>
    </div>
  )
}
