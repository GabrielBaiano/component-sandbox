# 📦 How to Save Components

> Personal guide for keeping the sandbox organized.

---

## Component Structure

Each component lives in its own folder inside `src/components/`:

```
src/components/
└── ComponentName/
    ├── index.tsx    ← the component itself (self-contained, copyable)
    ├── meta.ts      ← sandbox metadata (name, tags, tech)
    ├── schema.ts    ← sandbox controls (optional — only if the component has props to tweak)
    └── *.tsx        ← sub-components, each in its own file
```

> **Philosophy:** `index.tsx` must be fully self-contained. Sub-components go into their own files so anyone can download the folder and copy individual pieces.

---

## 1. Create `meta.ts`

```ts
import type { ComponentMeta } from '../../types'

export const meta: ComponentMeta = {
  id: 'component-name',           // unique slug, kebab-case
  name: 'Component Name',         // display name
  description: 'What it does.',  // short description
  tags: ['ui', 'card', 'hover'],  // keywords for search
  tech: ['react', 'tailwind'],    // technologies used
  createdAt: '2025-04-16',        // creation date (optional)
}
```

**Available `tech` values:** `react` · `tailwind` · `framer-motion` · `html-css` · `typescript`

---

## 2. Create `index.tsx`

```tsx
export default function ComponentName() {
  return (
    <div className="flex items-center justify-center p-12">
      {/* your component here */}
    </div>
  )
}
```

> **Tip:** always wrap in a container with `p-12` and center the content. The preview renders the component standalone, so padding prevents it from hugging the edges.

If the component accepts props from the schema, declare them with defaults:

```tsx
interface Props {
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

export default function ComponentName({ theme = 'dark', size = 'md' }: Props) {
  // ...
}
```

---

## 3. Create `schema.ts` (optional)

Add this file only if your component exposes tweakable props. The sandbox will automatically render a **Controls Panel** below the preview.

```ts
import type { ComponentSchema } from '../../types'

export const schema: ComponentSchema = {
  controls: [
    // ── Select (segmented buttons) ──────────────────────────────────────
    {
      type: 'select',
      id: 'size',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      default: 'medium',
    },

    // ── Toggle (on/off switch) ──────────────────────────────────────────
    {
      type: 'toggle',
      id: 'lightTheme',
      label: 'Light Theme',
      default: false,
    },

    // ── Range (slider) ─────────────────────────────────────────────────
    {
      type: 'range',
      id: 'count',
      label: 'Item Count',
      min: 1,
      max: 20,
      step: 1,
      default: 8,
      unit: 'items',   // optional unit label shown next to the value
    },
  ],
}
```

The control `id` must match **exactly** the prop name in your component.

---

## 4. Register in `src/components/index.ts`

```ts
import ComponentName from './ComponentName'
import { meta as ComponentNameMeta } from './ComponentName/meta'
// only if you created a schema.ts:
import { schema as ComponentNameSchema } from './ComponentName/schema'

export const components: RegisteredComponent[] = [
  // ...existing components...
  {
    meta: ComponentNameMeta,
    Component: ComponentName,
    schema: ComponentNameSchema, // omit this line if no schema
  },
]
```

---

## Quick Rules

| ✅ Do | ❌ Don't |
|---|---|
| `id` in unique kebab-case | Duplicate IDs |
| Schema `id` matches the prop name exactly | Mismatched prop names |
| Sub-components each in their own `.tsx` file | Large monolithic `index.tsx` files |
| Descriptive tags (`button`, `form`, `animation`) | Tags too generic (`ui`, `component`) |
| Self-contained component (no deps outside installed ones) | Import libraries not installed |
| Short and direct description | Leave description empty |
| Folder named in PascalCase | Loose files outside a folder |

---

## Available Control Types

| Type | UI | Use for |
|---|---|---|
| `select` | Segmented buttons | Size variants, layout modes, named options |
| `toggle` | On/off switch | Booleans: dark/light, enabled/disabled |
| `range` | Slider | Numbers: count, size in px, opacity, duration |

---

## Full Example: Toggle Switch

**`src/components/ToggleSwitch/meta.ts`**
```ts
import type { ComponentMeta } from '../../types'

export const meta: ComponentMeta = {
  id: 'toggle-switch',
  name: 'Toggle Switch',
  description: 'Animated switch with on/off state.',
  tags: ['input', 'toggle', 'switch', 'form'],
  tech: ['react', 'framer-motion'],
  createdAt: '2025-04-16',
}
```

**`src/components/ToggleSwitch/schema.ts`**
```ts
import type { ComponentSchema } from '../../types'

export const schema: ComponentSchema = {
  controls: [
    {
      type: 'select',
      id: 'size',
      label: 'Size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      default: 'md',
    },
    {
      type: 'toggle',
      id: 'disabled',
      label: 'Disabled',
      default: false,
    },
  ],
}
```

**`src/components/ToggleSwitch/index.tsx`**
```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const SIZE = {
  sm: { track: 'w-8 h-4',  thumb: 'w-3 h-3', on: 16, iconSize: 8  },
  md: { track: 'w-12 h-6', thumb: 'w-5 h-5', on: 24, iconSize: 12 },
  lg: { track: 'w-16 h-8', thumb: 'w-7 h-7', on: 32, iconSize: 16 },
}

type SizeKey = keyof typeof SIZE

interface Props {
  size?: SizeKey
  disabled?: boolean
}

export default function ToggleSwitch({ size = 'md', disabled = false }: Props) {
  const [on, setOn] = useState(false)
  const s = SIZE[size]

  return (
    <div className="flex items-center justify-center p-12 gap-4">
      <button
        onClick={() => !disabled && setOn(p => !p)}
        disabled={disabled}
        className={`relative rounded-full transition-opacity ${s.track} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        style={{ background: on ? '#e85002' : 'rgba(255,255,255,0.15)' }}
      >
        <motion.div
          animate={{ x: on ? s.on : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute top-0.5 bg-white rounded-full shadow ${s.thumb}`}
        />
      </button>
      <span className="text-sm text-white/60">{on ? 'On' : 'Off'}</span>
    </div>
  )
}
```

**`src/components/index.ts`** — add:
```ts
import ToggleSwitch from './ToggleSwitch'
import { meta as ToggleSwitchMeta } from './ToggleSwitch/meta'
import { schema as ToggleSwitchSchema } from './ToggleSwitch/schema'

// in the array:
{ meta: ToggleSwitchMeta, Component: ToggleSwitch, schema: ToggleSwitchSchema },
```
