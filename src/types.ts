export type ComponentTech = 'react' | 'tailwind' | 'framer-motion' | 'html-css' | 'typescript'

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
}

export interface RegisteredComponent {
  meta: ComponentMeta
  Component: React.ComponentType
}
