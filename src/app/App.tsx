import { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { components } from '../components';
import Sidebar from './Sidebar';
import HomePage from './HomePage';
import ComponentPage from './ComponentPage';

const DEFAULT_BG = '#0d0d0d';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Dynamically extract all unique tags and tech from components
  const allTags = useMemo(
    () => Array.from(new Set(components.flatMap((c) => c.meta.tags))).sort(),
    [],
  );
  const allTech = useMemo(
    () => Array.from(new Set(components.flatMap((c) => c.meta.tech))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    let result = components;

    // 1. Filter by active tags (ALL active tags must be present)
    if (activeTags.length > 0) {
      result = result.filter((reg) =>
        activeTags.every(
          (active) =>
            reg.meta.tags.some(
              (t) => t.toLowerCase() === active.toLowerCase(),
            ) ||
            reg.meta.tech.some((t) => t.toLowerCase() === active.toLowerCase()),
        ),
      );
    }

    // 2. Filter by search text
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter(
        (reg) =>
          reg.meta.name.toLowerCase().includes(q) ||
          reg.meta.description.toLowerCase().includes(q),
      );
    }

    return result;
  }, [searchText, activeTags]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#020202] selection:bg-accent-500/30">
      {/* Animated Blurry Blobs Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Blob 1: Primary Glow (Top Right) */}
        <div
          className="animate-blob-pulse absolute right-[5%] top-[5%] h-[600px] w-[600px] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle, #e85002 0%, rgba(232, 80, 2, 0) 70%)',
            filter: 'blur(100px)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Blob 2: Secondary Glow (Center Right) */}
        <div
          className="animate-blob-pulse-delayed absolute right-[-10%] top-[30%] h-[800px] w-[800px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, #c10801 0%, rgba(193, 8, 1, 0) 70%)',
            filter: 'blur(120px)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Blob 3: Accent Glow (Bottom Left) */}
        <div
          className="animate-blob-pulse absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, #ffcc00 0%, rgba(255, 204, 0, 0) 70%)',
            filter: 'blur(100px)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Cinema Film Grain Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Depth shadow vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      <style>{`
        @keyframes blob-pulse {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          50% { transform: scale(1.1) translate(-20px, 20px); opacity: 0.5; }
        }
        @keyframes blob-pulse-delayed {
          0%, 100% { transform: scale(1.1) translate(0, 0); opacity: 0.3; }
          50% { transform: scale(1) translate(20px, -20px); opacity: 0.4; }
        }
        .animate-blob-pulse {
          animation: blob-pulse 15s ease-in-out infinite;
        }
        .animate-blob-pulse-delayed {
          animation: blob-pulse-delayed 20s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar
          components={filtered}
          searchText={searchText}
          onSearchChange={setSearchText}
          activeTags={activeTags}
          onTagsChange={setActiveTags}
          allTags={allTags}
          allTech={allTech}
        />

        <main className="flex h-full flex-1 flex-col bg-surface-950/20 backdrop-blur-[2px]">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  query={searchText}
                  filtered={filtered}
                  activeTags={activeTags}
                />
              }
            />
            <Route path="/components/:id" element={<ComponentPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
