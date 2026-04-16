# 📦 How to Save Components

> Personal guide for keeping the sandbox organized.

---

## Component Structure

Each component lives in its own folder inside `src/components/`:

```
src/components/
└── ComponentName/
    ├── index.tsx   ← the component itself
    └── meta.ts     ← metadata (name, tags, tech...)
```

---

## 1. Create `meta.ts`

```ts
import type { ComponentMeta } from '../../types'

export const meta: ComponentMeta = {
  id: 'component-name',          // unique slug, kebab-case
  name: 'Component Name',        // display name
  description: 'What it does.', // short description
  tags: ['ui', 'card', 'hover'], // keywords for search
  tech: ['react', 'tailwind'],   // technologies used
  createdAt: '2025-04-16',       // creation date (optional)
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

---

## 3. Register in `src/components/index.ts`

Add **two lines** to the file:

```ts
// 1. import the component and meta
import ComponentName from './ComponentName'
import { meta as ComponentNameMeta } from './ComponentName/meta'

// 2. add to the array
export const components: RegisteredComponent[] = [
  // ...existing components...
  { meta: ComponentNameMeta, Component: ComponentName }, // ← here
]
```

---

## Quick Rules

| ✅ Do | ❌ Don't |
|---|---|
| `id` in unique kebab-case | Duplicate IDs |
| Descriptive tags (`button`, `form`, `animation`) | Tags too generic (`ui`, `component`) |
| Self-contained component (no deps outside installed ones) | Import libraries not installed |
| Short and direct description | Leave description empty |
| Folder named in PascalCase | Loose files outside a folder |

---

## Available Techs and Their Badges

| Tech | Badge (color) |
|---|---|
| `react` | cyan |
| `tailwind` | sky blue |
| `framer-motion` | purple |
| `html-css` | orange |
| `typescript` | blue |

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

**`src/components/ToggleSwitch/index.tsx`**
```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ToggleSwitch() {
  const [on, setOn] = useState(false)

  return (
    <div className="flex items-center justify-center p-12 gap-4">
      <button
        onClick={() => setOn(p => !p)}
        className="w-12 h-6 rounded-full relative transition-colors duration-200"
        style={{ background: on ? '#8b5cf6' : 'rgba(255,255,255,0.15)' }}
      >
        <motion.div
          animate={{ x: on ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
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

// in the array:
{ meta: ToggleSwitchMeta, Component: ToggleSwitch },
```
