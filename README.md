# Portfolio Landing Page 14 - React, Vite, TypeScript, Three.js, GSAP, ScrollTrigger, Rapier, Post-processing Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-green)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.7-orange)](https://gsap.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.168.0-black)](https://threejs.org/)

A single-page portfolio showcase built with React, Vite, and TypeScript. It features a 3D character on the landing section, scroll-driven animations with GSAP, a tech-stack 3D scene with physics (Rapier), and responsive layout. The project is frontend-only (no backend or API) and uses custom CSS for styling. It is intended for learning, instruction, and reuse as a portfolio template.

- **Live Demo:** [https://portfolio-ui-14.vercel.app/](https://portfolio-ui-14.vercel.app/)

<img width="1884" height="936" alt="Screenshot 2026-03-10 at 11 57 39" src="https://github.com/user-attachments/assets/9a387c09-9550-483f-8224-7220102d30c5" /> <img width="1883" height="931" alt="Screenshot 2026-03-10 at 11 57 54" src="https://github.com/user-attachments/assets/6f13844a-54b0-4875-a58a-08c66dc1eb1f" /> <img width="1893" height="934" alt="Screenshot 2026-03-10 at 11 58 09" src="https://github.com/user-attachments/assets/af03c0d0-88c3-4ebc-b38a-d35a0556ae37" /> <img width="1886" height="931" alt="Screenshot 2026-03-10 at 11 58 21" src="https://github.com/user-attachments/assets/a9057992-f240-44b7-9633-9492729e3dee" /> <img width="1877" height="937" alt="Screenshot 2026-03-10 at 11 58 34" src="https://github.com/user-attachments/assets/0afea1de-7d0d-4f43-a3ee-f1ba4154d834" /> <img width="1890" height="941" alt="Screenshot 2026-03-10 at 11 58 55" src="https://github.com/user-attachments/assets/b5867f24-8122-4da0-bfe1-4b88d9cc7cf7" />

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Architecture & Data Flow](#architecture--data-flow)
- [Components](#components)
- [Routes & Pages](#routes--pages)
- [Features & Functionalities](#features--functionalities)
- [Reusing Components in Other Projects](#reusing-components-in-other-projects)
- [Keywords](#keywords)
- [License](#license)
- [Happy Coding](#happy-coding)

---

## Project Overview

Portfolio Landing Page 14 is a **client-side only** application. It has no API endpoints, no server routes, and no backend. The app is a single HTML page that mounts a React root; all navigation is in-page (anchor links and scroll). It demonstrates:

- **3D rendering** with Three.js and React Three Fiber (character on desktop, tech-stack scene).
- **Scroll-based animations** with GSAP and ScrollTrigger.
- **Loading experience** with a progress state and post-load animations.
- **Responsive behavior** (e.g. 3D character and TechStack only on desktop).
- **Custom cursor**, hover effects, and section-based layout (Landing, About, What I Do, Career, Work, Tech Stack, Contact).

---

## Technology Stack

| Category       | Technology                                                           |
| -------------- | -------------------------------------------------------------------- |
| **Framework**  | React 18 (with hooks)                                                |
| **Build**      | Vite 5                                                               |
| **Language**   | TypeScript 5                                                         |
| **3D**         | Three.js, React Three Fiber, Drei, Rapier (physics), Post-processing |
| **Animation**  | GSAP 3, ScrollTrigger, @gsap/react                                   |
| **UI / Icons** | react-icons, react-fast-marquee                                      |
| **Styling**    | Custom CSS (no Tailwind in this repo)                                |
| **Analytics**  | @vercel/analytics (optional)                                         |

---

## Project Structure

```bash
portfolio-ui-14/
├── index.html                 # Entry HTML; root div and script to main.tsx
├── package.json
├── vite.config.ts             # Vite config; chunk size limit for 3D bundles
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── public/
│   └── models/                # 3D assets (e.g. character.glb), HDR, etc.
├── src/
│   ├── main.tsx               # React root mount
│   ├── App.tsx                 # Root component; LoadingProvider + lazy MainContainer & Character
│   ├── App.css
│   ├── index.css               # Global CSS variables, base styles, Geist font
│   ├── vite-env.d.ts
│   ├── context/
│   │   └── LoadingProvider.tsx # Loading state (percent, setIsLoading); wraps app
│   ├── data/
│   │   └── boneData.ts         # Bone names for character animations (typing, eyebrow)
│   ├── components/
│   │   ├── MainContainer.tsx   # Layout: Cursor, Navbar, SocialIcons, sections, lazy TechStack
│   │   ├── Landing.tsx
│   │   ├── About.tsx
│   │   ├── WhatIDo.tsx
│   │   ├── Career.tsx
│   │   ├── Work.tsx            # Horizontal scroll section (GSAP pin + scrub)
│   │   ├── Contact.tsx
│   │   ├── TechStack.tsx       # 3D canvas with physics spheres (Rapier)
│   │   ├── Loading.tsx         # Loader UI; exports setProgress for character load
│   │   ├── Navbar.tsx          # Header + smooth scroll; exports smoother for initialFX
│   │   ├── Cursor.tsx          # Custom cursor
│   │   ├── SocialIcons.tsx
│   │   ├── HoverLinks.tsx      # Reusable hover link text effect
│   │   ├── WorkImage.tsx       # Work item image (optional video on hover)
│   │   ├── Character/          # 3D character
│   │   │   ├── index.tsx       # Wraps Scene
│   │   │   ├── Scene.tsx      # Three.js scene, camera, renderer, character load, animations
│   │   │   └── utils/          # character loading, lighting, animations, mouse, resize, decrypt
│   │   ├── utils/
│   │   │   ├── splitText.ts    # GSAP split-text on .para / .title
│   │   │   ├── initialFX.ts   # Post-load landing animations; uses smoother
│   │   │   └── GsapScroll.ts  # ScrollTrigger timelines for character + career
│   │   └── styles/             # Component-specific CSS files
│   └── utils/
│       └── splitTextFree.ts    # Split text into chars/words/lines for GSAP
```

---

## Getting Started

### Prerequisites

- **Node.js** (e.g. 18+)
- **npm** (or yarn/pnpm)

### Install and run

```bash
# Clone the repository (or use your own fork)
git clone <repository-url>
cd portfolio-ui-14

# Install dependencies
npm install

# Start development server (with host so you can open from other devices)
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

### Build and preview

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

This project **does not use any environment variables** in the source code. There are no `import.meta.env` or `process.env` references for app configuration.

- You **do not need** a `.env` file to run or build the project.
- For deployment (e.g. Vercel), you can leave environment variables empty unless you add your own (e.g. analytics IDs, feature flags).
- If you later add env vars (e.g. `VITE_ANALYTICS_ID`), create a `.env` or `.env.local` and prefix them with `VITE_` so Vite exposes them to the client. Never commit secrets to the repo.

---

## Scripts

| Command           | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Start Vite dev server (`vite --host`)                             |
| `npm run build`   | TypeScript build + Vite production build (`tsc -b && vite build`) |
| `npm run preview` | Serve the `dist` folder locally                                   |
| `npm run lint`    | Run ESLint on the project                                         |

---

## Architecture & Data Flow

- **Entry:** `index.html` loads `/src/main.tsx`. `main.tsx` renders `<App />` inside React’s `createRoot`.
- **App:** `App.tsx` wraps the tree in `LoadingProvider` and lazy-loads `MainContainer` and `Character`. No router; one page.
- **Loading:** `LoadingProvider` holds `isLoading` and loading percent. It shows `<Loading percent={loading} />` until loading is done. The 3D character load uses `setProgress` from `Loading.tsx` to drive the percentage; when ready, `initialFX` runs and `setIsLoading(false)` hides the loader.
- **Layout:** `MainContainer` renders Cursor, Navbar, SocialIcons, and a scroll wrapper containing Landing, About, WhatIDo, Career, Work, TechStack (desktop only, lazy), and Contact. On desktop it also renders the Character as a sibling (inside the same parent as the scroll content).
- **3D:** Character is built in `Character/Scene.tsx` with a raw Three.js scene (no R3F in Scene). TechStack is a separate React Three Fiber `<Canvas>` with Rapier physics. Both use GSAP for scroll-linked or time-based animations where needed.

---

## Components

### Core layout

- **MainContainer** – Wraps the whole page: cursor, navbar, social icons, smooth-scroll div, and all sections. Responsive: character and TechStack only when `isDesktopView` (e.g. width > 1024).
- **Navbar** – Header with logo, email link, and nav links (About, Work, Contact). Uses `data-href` for in-page smooth scroll. Exports `smoother` (no-op) for compatibility with `initialFX`.
- **Cursor** – Custom cursor that follows the mouse and reacts to `data-cursor="icons"` and `data-cursor="disable"`.

### Sections

- **Landing** – Hero with “John Doe”, “A Creative Designer / Developer” and placeholder for children (e.g. character on mobile).
- **About** – Section with title “About Me” and paragraph.
- **WhatIDo** – “What I Do” title and content boxes; touch devices get click-to-expand behavior.
- **Career** – Timeline-style list of roles and descriptions.
- **Work** – Horizontal scrolling gallery of work items (GSAP ScrollTrigger pin + scrub).
- **TechStack** – R3F canvas with physics-enabled spheres and tech logos; desktop only.
- **Contact** – Email, phone, social links, and “Designed and Developed by John Doe”.

### UI and utilities

- **Loading** – Progress-based loader; exports `setProgress` so the character loader can update the same progress.
- **HoverLinks** – Text link with hover “clone” effect; used in Navbar and SocialIcons.
- **SocialIcons** – Side social links + resume button.
- **WorkImage** – Image (and optional video on hover) for work items.

### Character (3D)

- **Character/index.tsx** – Thin wrapper around `Scene`.
- **Character/Scene.tsx** – Creates Three.js scene, WebGLRenderer, camera; loads character via `setCharacter`, applies lighting and animations; handles resize and mouse/touch for head movement. Uses `setProgress` and `useLoading` to tie into the global loading state.

---

## Routes & Pages

There are **no routes** in this project. It is a single-page application:

- The only “page” is the index. All content is in one scroll (Landing → About → What I Do → Career → Work → Tech Stack → Contact).
- Navigation is done with anchor links (`#about`, `#work`, `#contact`) and `scrollIntoView({ behavior: 'smooth' })` in the Navbar.

---

## Features & Functionalities

| Feature                | How it works                                                                                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loading screen**     | `LoadingProvider` shows `<Loading>` until percent reaches 100 and post-load animation runs; character loader calls `setProgress(callback)` to update the same percent. |
| **3D character**       | Loaded in `Character/Scene` (GLB), with lighting, intro animation, and head tracking (mouse/touch). Desktop only.                                                      |
| **Tech stack 3D**      | R3F + Rapier physics; spheres with tech logos; N8AO post-processing. Lazy-loaded, desktop only.                                                                        |
| **Scroll animations**  | GSAP ScrollTrigger on character position/rotation, career timeline, work horizontal scroll; `splitText`/`splitTextFree` for text reveal on `.para` and `.title`.       |
| **Landing animations** | After load, `initialFX` runs: split text on landing, GSAP timelines, and “Designer / Developer” loop.                                                                  |
| **Custom cursor**      | `Cursor` component; `requestAnimationFrame` + GSAP for smooth follow; `data-cursor` for state.                                                                         |
| **Responsive**         | Sections reflow; character and TechStack hidden on small screens; WhatIDo uses touch-friendly click.                                                                   |

---

## How It’s Working (Summary)

1. **Boot:** Vite serves `index.html` → loads `main.tsx` → React mounts `App`.
2. **Loading:** `LoadingProvider` shows the loader; `setProgress` is passed to the character loader so the same 0–100 value updates the UI. When the model is ready, `progress.loaded()` resolves and intro animations run; then `setIsLoading(false)` hides the loader.
3. **Sections:** All sections live in one scroll. Navbar links use `data-href="#about"` (etc.) and smooth-scroll to the corresponding section. No router.
4. **3D:** Character uses a single Three.js scene/renderer in `Scene.tsx`; TechStack uses a separate R3F `<Canvas>` with physics. Both are optional on small screens.
5. **Animations:** GSAP + ScrollTrigger drive scroll-linked timelines (e.g. character move, work horizontal scroll); `splitText` / `splitTextFree` split text for reveal animations; `initialFX` runs once after load for landing text effects.

---

## Reusing Components in Other Projects

### Using a single component

1. Copy the component file and its `styles/*.css` (if any).
2. Install the same dependencies the component uses (e.g. `gsap`, `react-icons`, `three`, `@react-three/fiber`).
3. Replace any project-specific imports (e.g. `useLoading`, `setProgress`) with your own context or props.

**Example: reuse HoverLinks**

```tsx
// In your project
import HoverLinks from "./HoverLinks";

<a href="#about">
  <HoverLinks text="ABOUT" />
</a>;
```

You also need the styles from `components/styles/style.css` (or the part that affects `.hover-link` / `.hover-in`).

### Using the Loading pattern

- Copy `LoadingProvider`, `Loading`, and the usage of `setProgress`.
- Where you load heavy assets (e.g. 3D), call `setProgress(updateCallback)` and invoke the callback with a number 0–100, then call the “loaded” promise when done so the loader can finish and run post-load logic.

**Example: wrap your app with LoadingProvider**

```tsx
import { LoadingProvider } from "./context/LoadingProvider";

function App() {
  return (
    <LoadingProvider>
      <main>{/* your content */}</main>
    </LoadingProvider>
  );
}
```

**Example: drive progress from an async loader**

```tsx
const progress = setProgress((percent) => setLoading(percent));
// Later, when asset is ready:
progress.loaded().then(() => {
  // Run post-load animations, then:
  setIsLoading(false);
});
```

### Using the Character + GSAP scroll

- Copy the `Character` folder (Scene + utils), `data/boneData.ts`, and the parts of `GsapScroll` that you need.
- Ensure your HTML has the same section class names (e.g. `.landing-section`, `.about-section`) or adjust `GsapScroll` and Scene to your DOM.
- Provide the same GLB and HDR paths (or change them in `character.ts` and `lighting.ts`).

### Using TechStack in another app

- Copy `TechStack.tsx` and its dependencies (R3F, Drei, Rapier, Post-processing, Three).
- Place your own images in `public/images/` and update the `imageUrls` array in `TechStack.tsx`.

---

## Keywords

Portfolio, landing page, React, Vite, TypeScript, Three.js, React Three Fiber, GSAP, ScrollTrigger, 3D character, physics, Rapier, custom cursor, loading screen, single-page application, frontend only, no backend, responsive, Vercel, demo, template, open source.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
