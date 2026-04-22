import type { ComponentMeta } from '../../types';

export const meta: ComponentMeta = {
  id: 'toggle-switch',
  name: 'Toggle Switch',
  description: 'Animated on/off switch with size and disabled variants.',
  tags: ['input', 'toggle', 'switch', 'form', 'interactive'],
  tech: ['react', 'framer-motion'],
  createdAt: '2026-04-16',
  props: [
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: 'The vertical size and horizontal width of the switch.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is interactive.',
    },
  ],
};
