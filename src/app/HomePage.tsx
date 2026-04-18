import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { RegisteredComponent } from '../types'
import { components } from '../components'
import ToggleSwitch from '../components/ToggleSwitch'

const TECH_DOT: Record<string, string> = {
  react:           '#61dafb',
  tailwind:        '#38bdf8',
  'framer-motion': '#e85002',
  'html-css':      '#f97316',
  typescript:      '#3b82f6',
}

interface HomePageProps {
  query: string
  filtered: RegisteredComponent[]
  activeTags: string[]
}

export default function HomePage({ query, filtered, activeTags }: HomePageProps) {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {/* Hero Section */}
      <section className="px-8 pt-16 pb-12 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] font-mono uppercase tracking-widest shadow-lg shadow-accent-900/10">
            {components.length} Components
          </div>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
            </svg>
            739 Stars
          </div>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
            </svg>
            1.2k Downloads
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          Build faster with <span className="gradient-brand-text">Gabri UI</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A professional collection of copy-paste components for React and Tailwind CSS. 
          Beautifully designed, fully customizable, and production-ready.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.25 }}
           className="flex items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="https://github.com/GabrielBaiano/component-sandbox"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all shadow-xl"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GitHub Repo
          </motion.a>

          <motion.div
            title="NPM package coming soon!"
            whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-accent-500/10 border border-accent-500/20 text-accent-400 font-medium cursor-help opacity-60 transition-all shadow-xl"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.666H5.334v-4H4V14H1.334V8.667h5.332v5.333zm4 0H9.334v-4h-1.334V14H6.666V8.667h4v5.333zm12 0h-1.334v-4h-1.332v4H16V14h-1.334v-4h-1.334V14H12V8.667h10.666v5.333zM16 10h1.332v2.667H16V10z"/>
            </svg>
            NPM Package
            <span className="text-[9px] uppercase tracking-tighter ml-1 opacity-50 px-1.5 py-0.5 bg-accent-500/20 rounded-md">Soon</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Mini Demo / Docs Section */}
      <section className="px-8 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
            <p className="text-white/40 mb-8 leading-relaxed">
              Install the library and start building amazing interfaces in minutes. 
              Our components are fully typed and optimized for performance.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-mono mb-2">Installation</p>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-sm group relative overflow-hidden">
                  <span className="text-accent-400">$</span> <span className="text-white/80">npm install</span> <span className="text-accent-300">@gabri/ui</span>
                  <div className="absolute inset-0 bg-accent-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-mono mb-2">Usage Demo</p>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-[11px] leading-relaxed overflow-hidden">
                  <p className="text-white/30 truncate"><span className="text-accent-400">import</span> &#123; <span className="text-white/80">ToggleSwitch</span> &#125; <span className="text-accent-400">from</span> <span className="text-accent-300">'@gabri/ui'</span></p>
                  <p className="mt-2 text-white/30 truncate"><span className="text-accent-400">function</span> <span className="text-white/80">App</span>() &#123;</p>
                  <p className="ml-4 text-white/30 truncate"><span className="text-accent-400">return</span> (</p>
                  <p className="ml-8 text-white/80">&lt;<span className="text-accent-400">ToggleSwitch</span></p>
                  <p className="ml-12 text-white/30 truncate"><span className="text-accent-400">size</span>=<span className="text-accent-300">"md"</span></p>
                  <p className="ml-12 text-white/30 truncate"><span className="text-accent-400">onChange</span>=&#123;<span className="text-white/60">v =&gt; console.log(v)</span>&#125;</p>
                  <p className="ml-8 text-white/80">/&gt;</p>
                  <p className="ml-4 text-white/30">);</p>
                  <p className="text-white/30">&#125;</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-12 bg-black/40 border border-white/10 rounded-[2rem] min-h-[300px] relative overflow-hidden group">
             {/* Background Decoration */}
             <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             
             <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
                   <ToggleSwitch size="md" />
                </div>
                <div className="text-center">
                   <span className="text-xs font-medium text-white/60">Live Demonstration</span>
                   <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest leading-none">Try the component</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-8 pb-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-xl font-bold text-white">Component Gallery</h2>
           {(activeTags.length > 0 || query) && (
             <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold mr-1">Filtering by:</span>
                <div className="flex gap-1.5">
                   {activeTags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] font-mono">
                         #{tag}
                      </span>
                   ))}
                   {query && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/60 text-[10px] font-mono italic">
                         "{query}"
                      </span>
                   )}
                </div>
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((reg, i) => (
            <motion.div
              key={reg.meta.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={`/components/${reg.meta.id}`}
                className="group relative block bg-surface-900/40 border border-white/[0.05] rounded-3xl overflow-hidden hover:border-accent-500/30 transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] active:scale-[0.98]"
              >
                {/* Preview Area (Static) */}
                <div className="h-48 bg-black/40 flex items-center justify-center p-6 border-b border-white/[0.03] overflow-hidden">
                  <div className="scale-75 pointer-events-none origin-center group-hover:scale-[0.8] transition-transform duration-500">
                    <reg.Component />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
                      {reg.meta.name}
                    </h3>
                    <div className="flex gap-1">
                      {reg.meta.tech.map(t => (
                        <div
                          key={t}
                          className="w-2 h-2 rounded-full"
                          style={{ background: TECH_DOT[t] ?? '#646464' }}
                          title={t}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/30 line-clamp-2 leading-relaxed h-10">
                    {reg.meta.description}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {reg.meta.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/20 border border-white/5 uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-white/10 text-xl font-medium">No results found for your search.</div>
            <p className="text-white/20 text-sm mt-2">Try selecting a different tag in the sidebar.</p>
          </div>
        )}
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(232, 80, 2, 0.2);
        }
      `}</style>
    </div>
  )
}
