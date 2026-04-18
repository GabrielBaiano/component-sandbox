import { motion } from 'framer-motion'
import type { ComponentSchema, ComponentControl } from '../types'

interface ControlsPanelProps {
  schema: ComponentSchema
  values: Record<string, unknown>
  onChange: (id: string, value: unknown) => void
}

// ── Individual controls ───────────────────────────────────────────────────────

function SelectControl({
  control,
  value,
  onChange,
}: {
  control: Extract<ComponentControl, { type: 'select' }>
  value: string | number
  onChange: (v: string | number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] text-white/35 uppercase tracking-wider font-mono">
        {control.label}
      </label>
      <div className="flex rounded-xl overflow-hidden border border-white/[0.08] bg-surface-950/50">
        {control.options.map((opt, i) => {
          const active = value === opt.value
          return (
            <button
              key={String(opt.value)}
              onClick={() => onChange(opt.value)}
              className={`flex-1 py-2 text-xs font-medium transition-all relative
                ${i > 0 ? 'border-l border-white/[0.06]' : ''}
                ${active ? 'text-white' : 'text-white/35 hover:text-white/60'}`}
            >
              {active && (
                <motion.div
                  layoutId={`select-active-${control.id}`}
                  className="absolute inset-0"
                  style={{ background: 'rgba(232,80,2,0.12)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ToggleControl({
  control,
  value,
  onChange,
}: {
  control: Extract<ComponentControl, { type: 'toggle' }>
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-[10px] text-white/35 uppercase tracking-wider font-mono">
        {control.label}
      </label>
      <button
        onClick={() => onChange(!value)}
        className="relative flex-shrink-0"
        style={{ width: 40, height: 22 }}
      >
        <motion.div
          animate={{ background: value ? '#e85002' : 'rgba(255,255,255,0.08)' }}
          className="absolute inset-0 rounded-full"
        />
        <motion.div
          animate={{ x: value ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-[3px] w-4 h-4 bg-white rounded-full shadow"
        />
      </button>
    </div>
  )
}

function RangeControl({
  control,
  value,
  onChange,
}: {
  control: Extract<ComponentControl, { type: 'range' }>
  value: number
  onChange: (v: number) => void
}) {
  const pct = ((value - control.min) / (control.max - control.min)) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-white/35 uppercase tracking-wider font-mono">
          {control.label}
        </label>
        <span className="text-xs font-mono text-accent-400">
          {value}{control.unit ? ` ${control.unit}` : ''}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        {/* Track */}
        <div className="w-full h-1.5 rounded-full bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.1 }}
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #e85002, #c10801)' }}
          />
        </div>
        {/* Native range (invisible, on top) */}
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        {/* Thumb */}
        <div
          className="absolute w-4 h-4 rounded-full bg-white shadow-lg pointer-events-none border-2 border-accent-400"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-white/20 font-mono">
        <span>{control.min}</span>
        <span>{control.max}</span>
      </div>
    </div>
  )
}

// ── Panel ─────────────────────────────────────────────────────────────────────

export default function ControlsPanel({ schema, values, onChange }: ControlsPanelProps) {
  if (!schema.controls.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 mt-2 flex-shrink-0 bg-surface-900/60 backdrop-blur-md border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
    >
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <svg className="text-accent-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
            Component Controls
          </span>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-5">
          {schema.controls.map(control => {
            const val = values[control.id] ?? control.default

            if (control.type === 'select') {
              return (
                <div key={control.id} className="min-w-[200px]">
                  <SelectControl
                    control={control}
                    value={val as string | number}
                    onChange={v => onChange(control.id, v)}
                  />
                </div>
              )
            }

            if (control.type === 'toggle') {
              return (
                <div key={control.id} className="min-w-[160px]">
                  <ToggleControl
                    control={control}
                    value={val as boolean}
                    onChange={v => onChange(control.id, v)}
                  />
                </div>
              )
            }

            if (control.type === 'range') {
              return (
                <div key={control.id} className="min-w-[200px]">
                  <RangeControl
                    control={control}
                    value={val as number}
                    onChange={v => onChange(control.id, v)}
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </motion.div>
  )
}
