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
