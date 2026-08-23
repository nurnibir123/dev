# personal-website

React/Vite personal site designed for GitHub Pages.

## Commands

- `npm run dev` - start the local development server
- `npm run build` - create the production bundle in `dist/`
- `npm run preview` - preview the production bundle locally

The app uses `HashRouter` so client-side navigation works after refreshes on
GitHub Pages. Enable GitHub Pages with **GitHub Actions** as the source; the
workflow in `.github/workflows/deploy.yml` deploys every push to `main`.
