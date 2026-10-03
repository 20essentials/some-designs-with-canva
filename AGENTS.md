# Agent Instructions
- Usamos pnpm
- No pyhton. Solo Nodejs

## Dev server management
- Always close processes you open. Never leave `pnpm dev`, `astro dev`, or any long-running dev/watch server running after verification.
- If you see "Another astro dev server is already running", stop it before starting a new one:
  1. Try `npx --yes kill-port 4321` (preferred)
  2. If still in use, find the PID: `netstat -ano | findstr :4321` then run `taskkill /PID <PID> /F /T`
- When testing a dev server, always use a short timeout (e.g. `timeout 10 pnpm dev`) instead of blocking the session.
- Prefer `pnpm build` + `pnpm preview` for static verification unless interactive dev is explicitly requested.
