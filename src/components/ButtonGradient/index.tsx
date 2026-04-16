import { motion } from 'framer-motion'

export default function ButtonGradient() {
  return (
    <div className="flex flex-col items-center gap-8 p-12">
      <h2 className="text-sm font-mono text-white/40 tracking-widest uppercase">
        Button Gradient
      </h2>

      {/* Variant: Primary */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-8 py-3 rounded-xl font-semibold text-white text-sm overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          }}
        >
          <span className="relative z-10">Get Started</span>
          <motion.span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
              boxShadow: '0 0 32px rgba(139, 92, 246, 0.6)',
            }}
          />
        </motion.button>

        {/* Variant: Outline */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-8 py-3 rounded-xl font-semibold text-sm overflow-hidden"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(139, 92, 246, 0.6)',
            color: '#a78bfa',
          }}
        >
          <motion.span
            className="absolute inset-0 opacity-0 hover:opacity-100"
            style={{ background: 'rgba(139, 92, 246, 0.08)' }}
          />
          <span className="relative z-10">Learn More</span>
        </motion.button>

        {/* Variant: Aurora */}
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
              background: 'linear-gradient(270deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
              backgroundSize: '300% 300%',
            }}
          />
          <span className="relative z-10">Aurora</span>
        </motion.button>
      </div>

      {/* Variant: Large CTA */}
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative px-12 py-4 rounded-2xl font-bold text-white text-base overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
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
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            width: '60%',
          }}
        />
      </motion.button>
    </div>
  )
}
