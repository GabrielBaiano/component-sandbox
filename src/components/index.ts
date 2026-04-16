// ─────────────────────────────────────────────────────────────────────────────
// Central component registry
// To add a new component:
//   1. Create a folder under src/components/YourComponent/
//   2. Add index.tsx (the component) and meta.ts (metadata)
//   3. Import both below and add to the `components` array
// ─────────────────────────────────────────────────────────────────────────────

import type { RegisteredComponent } from '../types'

import ButtonGradient from './ButtonGradient'
import { meta as ButtonGradientMeta } from './ButtonGradient/meta'

import CardGlass from './CardGlass'
import { meta as CardGlassMeta } from './CardGlass/meta'

export const components: RegisteredComponent[] = [
  { meta: ButtonGradientMeta, Component: ButtonGradient },
  { meta: CardGlassMeta, Component: CardGlass },
]
