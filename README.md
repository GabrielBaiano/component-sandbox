> [!IMPORTANT]
> **Aviso:** Este README foi desenvolvido com o auxílio de Inteligência Artificial. Ele é um documento temporário e as informações aqui contidas podem não estar operando de maneira adequada no momento.

<p align="center">
  <br />
  <b style="font-size: 32px;">Gabri UI</b>
  <br />
  <br />
  <b>Premium React UI components for state-of-the-art web applications.</b>
  <br />
  <span>A professional collection of copy-paste components built with React, Tailwind CSS and Framer Motion.</span>
</p>

<p align="center">
  <a href="https://github.com/GabrielBaiano/component-sandbox/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
  </a>
  <a href="https://www.npmjs.com/package/@gabri/ui">
    <img src="https://img.shields.io/badge/npm-v1.0.0-orange.svg?style=flat-square" alt="npm version">
  </a>
  <a href="https://github.com/GabrielBaiano/component-sandbox/actions">
    <img src="https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square" alt="build status">
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/react-19.x-61dafb.svg?style=flat-square" alt="react version">
  </a>
</p>

<br />

Gabri UI is a high-quality component library designed to provide beautiful, interactive, and production-ready components. Inspired by the best design practices, it focuses on performance, accessibility, and a premium aesthetic (glassmorphism, advanced animations, and fluid layouts).

## Features

- **State-of-the-Art Design**: Deep focus on HSL-tailored colors, glassmorphism, and premium aesthetics.
- **Performance First**: Minimal dependencies, optimized Framer Motion animations.
- **Interactive Documentation**: Built-in sandbox with real-time prop controls and live preview.
- **Developer Experience**: Fully typed with TypeScript, easy copy-paste structure.
- **Dark Mode Optimized**: Designed primarily for modern dark-themed interfaces.

## Documentation

The library comes with a built-in documentation site and interactive playground.

**[Explore the Documentation →](http://localhost:5173)** (Local server)

## Installation

> **Note:** The library is currently in development. NPM installation will be available soon.

```bash
npm install @gabri/ui
```

### For Development (Sandbox)

To explore the components and contribute:

```bash
# Clone the repository
git clone https://github.com/GabrielBaiano/component-sandbox.git

# Install dependencies
npm install

# Start the interactive sandbox
npm run dev
```

## Usage

Integrating Gabri UI components into your project is straightforward:

```tsx
import { ToggleSwitch } from '@gabri/ui';

function App() {
  return (
    <ToggleSwitch
      size="md"
      disabled={false}
      onChange={(val) => console.log(val)}
    />
  );
}
```

## Components

| Component                                               | Description                                      | Tech                 | Tags            |
| :------------------------------------------------------ | :----------------------------------------------- | :------------------- | :-------------- |
| **[Button Gradient](./src/components/ButtonGradient/)** | Animated gradient buttons with glow effects.     | React, Framer Motion | `button`, `cta` |
| **[Card Glass](./src/components/CardGlass/)**           | Premium glassmorphism cards for various layouts. | React, Tailwind      | `card`, `glass` |
| **[Toggle Switch](./src/components/ToggleSwitch/)**     | Modern animated switch with multiple sizes.      | React, Framer Motion | `input`, `form` |

## Project Structure

```bash
gabri-ui/
├── src/
│   ├── app/           # Documentation Site source code
│   ├── components/    # Component Library (The core)
│   │   ├── Component/
│   │   │   ├── index.tsx  # Component logic
│   │   │   ├── meta.ts   # Docs metadata & Props info
│   │   │   └── schema.ts # Sandbox controls
│   └── types.ts       # Central type definitions
├── README.md
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Licensed under the **MIT License**. See [LICENSE](./LICENSE) for more information.

---

<p align="center">
  Built by <a href="https://github.com/GabrielBaiano">Gabriel Baiano</a>
</p>
