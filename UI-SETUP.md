# UI components

This is a React 18 + Vite application. TypeScript, Tailwind CSS 4, and shadcn-compatible aliases are configured without migrating the existing JavaScript pages.

## Paths

- Reusable UI: `src/components/ui` (`@/components/ui`). This is the project's equivalent of `/components/ui`; keeping one shared folder makes imports and shadcn CLI output consistent. Do not create a second root-level components folder.
- Page sections: `src/components/sections`.
- Existing global styles: `src/styles.css`.
- Tailwind entry: `src/tailwind.css`. It imports the theme and utilities without Preflight to preserve the site's existing reset. Utilities are scanned from `src/components/ui/**/*.tsx`; add a source directive when introducing utilities elsewhere.
- Class utility: `src/lib/utils.ts` (`cn`).
- Vite and TypeScript resolve `@/*` to `src/*`; `components.json` configures the shadcn CLI.

## Install and run

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm test
```

The setup dependencies are `tailwindcss`, `@tailwindcss/vite`, `typescript`, `@types/react`, `@types/react-dom`, `clsx`, and `tailwind-merge`. The carousel uses `framer-motion` and the existing `lucide-react` icons.

For future shadcn components, use `npx shadcn@latest add <component>` and review the generated styles. For a new unconfigured Vite project, follow the [shadcn Vite setup](https://ui.shadcn.com/docs/installation/vite) and run `npx shadcn@latest init`. This project already has the configuration, so reinitialization is unnecessary.

## Student case

`src/components/ui/circular-testimonials.tsx` adapts the supplied circular carousel to Vite, with overlapping portraits, animated content, and university logos. Portraits use the reference's 0.8-second spring curve, scale, elevation, and perspective rotation. Content fades and moves vertically; university names reveal word by word. It uses the existing Framer Motion and Lucide dependencies; Next.js and `react-icons` are not required. Component styles live alongside it in `circular-testimonials.css`, and `src/vite-env.d.ts` provides Vite's asset import types.

Pass the student records through the `testimonials` prop, as shown in `src/components/sections/StudentStory.jsx`. The section includes Damir and Natalia, with their photographs and admission details.

Navigation appears for two or more entries, supports arrow keys while focus is inside the carousel, and is hidden for a single entry. An empty list renders nothing. On mobile, tapping the portrait area advances to the next student; arrow buttons are hidden and dots remain available. The portrait action is a native button, so Enter and Space work too. Desktop retains the arrow buttons. Autoplay changes stories every five seconds, pauses on hover, stops on keyboard focus or manual navigation, and respects reduced motion. There is no play/pause button.

The Zhejiang Gongshang University logo is sourced from https://www.zjgsu.edu.cn/images/logo.png and saved locally as `public/assets/universities/zjgsu.png`.

The Zhejiang University of Finance and Economics logo is sourced from https://english.zufe.edu.cn/images2021/logo.png and reused from `public/assets/universities/zufe.png`. Natalia's photo was supplied by the site owner and is saved as `public/assets/natalia-zufe.jpg`.
