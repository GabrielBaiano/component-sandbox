export type ComponentTech = 'react' | 'tailwind' | 'framer-motion' | 'html-css' | 'typescript'

export interface ComponentProp {
  /** Prop name */
  name: string
  /** TypeScript type string */
  type: string
  /** Default value as a string */
  default: string
  /** Description of what the prop does */
  description: string
  /** Whether the prop is required */
  required?: boolean
}

export interface ComponentMeta {
  /** Unique slug used as identifier */
  id: string
  /** Display name shown in the sidebar */
  name: string
  /** Short description of what the component does */
  description: string
  /** Tags for filtering/search */
  tags: string[]
  /** Technologies used */
  tech: ComponentTech[]
  /** Optional creation date */
  createdAt?: string
  /** Props documentation — drives the Props Table on the component page */
  props?: ComponentProp[]
}

// ── Schema / Controls ──────────────────────────────────────────────────────────
// Each component can export a schema.ts defining sandbox controls.
// These controls are rendered in the ControlsPanel below the preview.

export interface SelectControl {
  type: 'select'
  id: string
  label: string
  options: { label: string; value: string | number }[]
  default: string | number
}

export interface ToggleControl {
  type: 'toggle'
  id: string
  label: string
  default: boolean
}

export interface RangeControl {
  type: 'range'
  id: string
  label: string
  min: number
  max: number
  step: number
  default: number
  unit?: string
}

export type ComponentControl = SelectControl | ToggleControl | RangeControl

export interface ComponentSchema {
  controls: ComponentControl[]
}

// ── Registry ───────────────────────────────────────────────────────────────────

export interface RegisteredComponent {
  meta: ComponentMeta
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>
  schema?: ComponentSchema
  source: string
}
