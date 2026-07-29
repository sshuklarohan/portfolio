# Portfolio


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

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Select the repo. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Deploy. Every push to your main branch redeploys automatically.
4. Add your custom domain under the Pages project's **Custom domains** tab
   (if the domain is already on Cloudflare, this is a couple of clicks —
   DNS and SSL are handled for you).