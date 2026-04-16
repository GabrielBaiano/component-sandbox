import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CodeViewerProps {
  source: string
  filename: string
}

export default function CodeViewer({ source, filename }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([source], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Simple highlight logic
  const highlight = (code: string) => {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-emerald-400">$1</span>') // strings
      .replace(/\b(import|export|default|function|const|let|var|return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|new|this|super|extends|implements|interface|type|enum|as|is|keyof|readonly|public|private|protected|static|async|await|yield|from|of|in)\b/g, '<span class="text-accent-400">$1</span>') // keywords
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-300">$1</span>') // literals
      .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="text-blue-300">$1</span>') // Capitalized (Components/Types)
      .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-white/20 italic">$1</span>') // comments
  }

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-2">
            {filename}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${copied
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'hover:bg-white/5 text-white/60 border border-transparent'
              }`}
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v4a2 2 0 012-2h14" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-auto p-6 font-mono text-[13px] leading-relaxed custom-scrollbar">
        <pre className="text-white/80">
          <code
            dangerouslySetInnerHTML={{ __html: highlight(source) }}
          />
        </pre>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(232, 80, 2, 0.3);
        }
      `}</style>
    </div>
  )
}
