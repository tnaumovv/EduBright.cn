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

`src/components/ui/profile-card-testimonial-carousel.tsx` adapts the supplied carousel to Vite, using native `img` and `a` elements in place of Next.js-only components. Next.js is not required for this application.

Pass the actual student records through the `testimonials` prop, as shown in `src/components/sections/StudentStory.jsx`. There are no fabricated testimonials or placeholder social links. Navigation appears for two or more entries, supports arrow keys and reduced motion, and is hidden for a single entry. An empty list renders nothing.

The Zhejiang Gongshang University logo is sourced from https://www.zjgsu.edu.cn/images/logo.png and saved locally as `public/assets/universities/zjgsu.png`.
