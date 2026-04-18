// ─────────────────────────────────────────────────────────────────────────────
// Central component registry
// To add a new component:
//   1. Create a folder under src/components/YourComponent/
//   2. Add index.tsx (the component) and meta.ts (metadata)
//   3. Optionally add schema.ts to define sandbox controls
//   4. Import everything below and add to the `components` array
// ─────────────────────────────────────────────────────────────────────────────

import type { RegisteredComponent } from '../types'

import ButtonGradient from './ButtonGradient'
import ButtonGradientSource from './ButtonGradient/index.tsx?raw'
import { meta as ButtonGradientMeta } from './ButtonGradient/meta'

import CardGlass from './CardGlass'
import CardGlassSource from './CardGlass/index.tsx?raw'
import { meta as CardGlassMeta } from './CardGlass/meta'

import BarberLoyaltyWidget from './BarberLoyaltyWidget'
import BarberLoyaltyWidgetSource from './BarberLoyaltyWidget/index.tsx?raw'
import { meta as BarberLoyaltyWidgetMeta } from './BarberLoyaltyWidget/meta'
import { schema as BarberLoyaltyWidgetSchema } from './BarberLoyaltyWidget/schema'

import ToggleSwitch from './ToggleSwitch'
import ToggleSwitchSource from './ToggleSwitch/index.tsx?raw'
import { meta as ToggleSwitchMeta } from './ToggleSwitch/meta'
import { schema as ToggleSwitchSchema } from './ToggleSwitch/schema'



export const components: RegisteredComponent[] = [
  { meta: ButtonGradientMeta, Component: ButtonGradient, source: ButtonGradientSource },
  { meta: CardGlassMeta, Component: CardGlass, source: CardGlassSource },
  { meta: BarberLoyaltyWidgetMeta, Component: BarberLoyaltyWidget, source: BarberLoyaltyWidgetSource, schema: BarberLoyaltyWidgetSchema },
  { meta: ToggleSwitchMeta, Component: ToggleSwitch, source: ToggleSwitchSource, schema: ToggleSwitchSchema },

]
