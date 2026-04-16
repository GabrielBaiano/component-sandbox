# 🧱 Component Sandbox

A personal UI component playground — a place to build, store, and preview reusable frontend components.

<!--
  💡 SCREENSHOT: Replace the line below with your screenshot once you have a good one.

  ![Preview](./docs/preview.png)
-->

> **Preview coming soon** — take a screenshot of the running app and place it at `docs/preview.png`

---

## ✨ Features

- 🔍 **Real-time search** by name, tags, description and technology
- 🌓 **Background toggle** between dark and light preview
- 🏷️ **Tech badges** color-coded by technology type
- ✨ **Animations** with Framer Motion throughout the interface
- 📁 **Folder-based organization** — each component is isolated and self-contained

---

## 🛠 Stack

| Tech | Version | Purpose |
|---|---|---|
| [Vite](https://vitejs.dev/) | ^6 | Bundler / Dev server |
| [React](https://react.dev/) | ^19 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^3 | Styling |
| [Framer Motion](https://www.framer.com/motion/) | ^12 | Animations |

---

## 🚀 Running Locally

```bash
# Clone the repo
git clone https://github.com/GabrielBaiano/component-sandbox.git
cd component-sandbox

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Opens at **http://localhost:5173**

---

## 📦 Adding a Component

Read the full guide in **[COMPONENTS.md](./COMPONENTS.md)**.

Quick summary:

```
src/components/
└── MyComponent/
    ├── index.tsx   ← the component
    └── meta.ts     ← metadata (name, tags, tech)
```

Then register it in `src/components/index.ts` — that's it.

---

## 🗂 Components

| Component | Tags | Tech |
|---|---|---|
| [Button Gradient](./src/components/ButtonGradient/) | button, gradient, animation | React, Tailwind, Framer Motion |
| [Card Glass](./src/components/CardGlass/) | card, glass, glassmorphism | React, Tailwind, Framer Motion |

<!-- Add a new row here every time you create a component -->

---

## 📁 Project Structure

```
component-sandbox/
├── src/
│   ├── components/          ← All components
│   │   ├── index.ts         ← Central registry
│   │   ├── ButtonGradient/
│   │   └── CardGlass/
│   ├── app/
│   │   ├── App.tsx          ← Main layout
│   │   ├── Sidebar.tsx      ← Search and component list
│   │   └── Preview.tsx      ← Preview area
│   ├── types.ts             ← Types (ComponentMeta, etc.)
│   └── index.css            ← Global styles + Tailwind
├── COMPONENTS.md            ← Guide for adding components
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

<p align="center">
  Made by <a href="https://github.com/GabrielBaiano">Gabriel Baiano</a>
</p>
