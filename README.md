# Portfolio

A fully static React + TypeScript portfolio site — no backend, no server,
no Docker. All content (projects, experience, skills) lives in
`src/data.ts`. Edit that file to update the site.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploy on Cloudflare Pages

**Recommended: Git integration (no CLI needed)**

1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Select the repo. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. Every push to your main branch redeploys automatically.
5. Add your custom domain under the Pages project's **Custom domains** tab
   (if the domain is already on Cloudflare, this is a couple of clicks —
   DNS and SSL are handled for you).

**Alternative: Wrangler CLI (deploy without connecting a git repo)**

```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist --project-name=your-project-name
```

Both paths serve the same static output — pick whichever fits your workflow.
