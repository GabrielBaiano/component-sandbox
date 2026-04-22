import { motion } from 'framer-motion';

export default function ButtonGradient() {
  return (
    <div className="flex flex-col items-center gap-10 p-12">
      <h2 className="font-mono text-[10px] uppercase tracking-widest text-white/30">
        Button Gradient
      </h2>

      {/* Row 1: Core variants */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Primary — solid orange */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group relative overflow-hidden rounded-xl px-8 py-3 text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #e85002, #c10801)' }}
        >
          <span className="relative z-10">Get Started</span>
          <motion.span
            className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
          className="group relative overflow-hidden rounded-xl px-8 py-3 text-sm font-semibold"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(232,80,2,0.6)',
            color: '#e85002',
          }}
        >
          <motion.span
            className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background: 'rgba(232,80,2,0.08)' }}
          />
          <span className="relative z-10">Learn More</span>
        </motion.button>

        {/* Amber accent */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group relative overflow-hidden rounded-xl px-8 py-3 text-sm font-semibold text-black"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #e85002)' }}
        >
          <motion.span
            className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          />
          <span className="relative z-10">Amber</span>
        </motion.button>

        {/* Ghost — dark surface */}
        <motion.button
          whileHover={{ scale: 1.05, borderColor: 'rgba(232,80,2,0.4)' }}
          whileTap={{ scale: 0.97 }}
          className="relative rounded-xl px-8 py-3 text-sm font-semibold text-white/60 transition-colors hover:text-white"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Ghost
        </motion.button>
      </div>

      {/* Row 2: Warm animated gradient */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden rounded-xl px-8 py-3 text-sm font-semibold text-white"
        >
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(270deg, #f59e0b, #e85002, #c10801, #e85002, #f59e0b)',
              backgroundSize: '300% 300%',
            }}
          />
          <span className="relative z-10">Warm Wave</span>
        </motion.button>

        {/* Dark with shimmer */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-xl px-10 py-3.5 text-sm font-bold text-white"
          style={{
            background: '#111111',
            border: '1px solid rgba(232,80,2,0.3)',
            boxShadow: '0 0 20px rgba(232,80,2,0.15)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e85002"
              strokeWidth="2.5"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Launch
          </span>
          <motion.span
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(232,80,2,0.5), transparent)',
              width: '60%',
            }}
          />
        </motion.button>

        {/* CTA large */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-2xl px-12 py-4 text-base font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #e85002, #c10801)',
            boxShadow: '0 8px 32px rgba(232,80,2,0.4)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Launch Project
          </span>
          <motion.span
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-25"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              width: '60%',
            }}
          />
        </motion.button>
      </div>
    </div>
  );
}
