# Portfolio

Next.js + Tailwind + GSAP/Lenis + Framer Motion.

## Links
- Live site: https://omri-tamir.vercel.app
- GitHub: https://github.com/TaOmri/my-portfolio
- Vercel dashboard: https://vercel.com/omri-tamir/my-portfolio

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Editing content
- **Personal details** (name, email, socials, skills): `lib/site.ts`
- **Projects** (text, stack, colours, media): `lib/projects.ts`

## Adding screenshots / videos
1. Originals go in `images/` (git-ignored). Put optimized copies in `public/projects/<slug>/`.
   - Images: `sips -s format jpeg -s formatOptions 85 -Z 1800 in.png --out out.jpg`
   - Videos: `ffmpeg -ss 4 -t 20 -i in.mp4 -an -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart out.mp4`
2. Reference them in `lib/projects.ts` (`cover`, `gallery`, or `debutDrills`) with their pixel `width`/`height`.

## Deploy
Pushing to `main` deploys to production on Vercel automatically.
