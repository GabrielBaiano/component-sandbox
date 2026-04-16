import type { ComponentSchema } from '../../types'

export const schema: ComponentSchema = {
  controls: [
    {
      type: 'select',
      id: 'size',
      label: 'Widget Size',
      options: [
        { label: 'Small (2×2)', value: 'small' },
        { label: 'Medium (4×2)', value: 'medium' },
        { label: 'Large (4×4)', value: 'large' },
      ],
      default: 'small',
    },
    {
      type: 'toggle',
      id: 'lightTheme',
      label: 'Light Theme',
      default: false,
    },
    {
      type: 'range',
      id: 'total',
      label: 'Total Visits',
      min: 4,
      max: 12,
      step: 1,
      default: 8,
      unit: 'visits',
    },
  ],
}
