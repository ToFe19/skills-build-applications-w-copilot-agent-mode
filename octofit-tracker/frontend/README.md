# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# OctoFit Tracker frontend

React 19 presentation tier for OctoFit Tracker. Start it with `npm run dev --prefix octofit-tracker/frontend`; Vite serves the app on port 5173 and proxies `/api` requests to port 8000.

## API configuration

In Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the value of the Codespace name (for example, the value of `CODESPACE_NAME`, without a protocol or port). Vite uses it to build `https://<name>-8000.app.github.dev`.

For local development, leave `VITE_CODESPACE_NAME` unset. The API client safely falls back to `http://localhost:8000`.

See `.env.example` for the variable format. Restart Vite after changing environment variables.
