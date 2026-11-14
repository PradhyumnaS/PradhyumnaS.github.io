# Pradhyumna — N° 01

Personal portfolio, designed as one issue of a black editorial magazine.
Live at **https://pradhyumnas.github.io**.

## Stack
Next.js 16 (static export) · React 19 · Tailwind CSS 4 · GSAP (ScrollTrigger, SplitText) · Lenis · OGL (WebGL shader)

## Editing content
Every word on the site lives in [`content/site.ts`](content/site.ts): profile, work, experience, research, toolkit and links.
To show the Résumé link, paste a URL into `links.resume`.

Project images live in `public/work/<project>/`.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
