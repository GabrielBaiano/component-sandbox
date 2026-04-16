import { motion } from 'framer-motion'

export default function CardGlass() {
  return (
    <div className="flex flex-col items-center gap-8 p-12">
      <h2 className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
        Card Glass
      </h2>

      <div className="flex flex-wrap gap-6 items-start justify-center">

        {/* Card 1: Profile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="glass rounded-2xl p-6 w-64 flex flex-col items-center gap-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #e85002, #c10801)' }}
          >
            G
          </div>
          <div className="text-center">
            <p className="font-semibold text-white">Gabriel Baiano</p>
            <p className="text-sm text-white/50 font-medium mt-0.5">Frontend Developer</p>
          </div>
          <div className="w-full h-px bg-white/10" />
          <div className="flex gap-4 text-center">
            <div>
              <p className="font-bold text-white">42</p>
              <p className="text-xs text-white/40">Components</p>
            </div>
            <div>
              <p className="font-bold text-white">8</p>
              <p className="text-xs text-white/40">Projects</p>
            </div>
            <div>
              <p className="font-bold text-white">3k</p>
              <p className="text-xs text-white/40">Stars</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Stat */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="glass rounded-2xl p-6 w-64 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50 font-medium">Revenue</span>
            <span className="text-xs px-2 py-1 rounded-full font-mono"
              style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
              +12.5%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">$24,500</p>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="h-1.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #e85002, #c10801)' }}
            />
          </div>
          <p className="text-xs text-white/30">72% of monthly goal</p>
        </motion.div>

        {/* Card 3: Notification */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="glass rounded-2xl p-5 w-64 flex flex-col gap-3"
        >
          <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider">Notifications</p>
          {[
            { icon: '⚡', title: 'New deployment', time: '2m ago', color: '#e85002' },
            { icon: '💬', title: 'New comment',    time: '15m ago', color: '#34d399' },
            { icon: '🔔', title: 'PR merged',      time: '1h ago',  color: '#f59e0b' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{item.title}</p>
                <p className="text-xs text-white/30">{item.time}</p>
              </div>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
