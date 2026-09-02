# AGENTS.md

Personal blog and portfolio monorepo (pnpm workspaces). Packages:

- `front-end` — Next.js 16 (App Router, Turbopack) static site. The primary product. Scripts in `front-end/package.json`.
- `cloud` — AWS CDK infrastructure (TypeScript). Scripts in `cloud/package.json`.
- `back-end/demo` — a demo AWS Lambda (Express) that is bundled by the `cloud` stack and, separately, containerized for AWS Lambda via `back-end/docker-compose.yaml`.

## Cursor Cloud specific instructions

### Runtime / toolchain
- Node is pinned to `24.20.0` (current Active LTS) and pnpm to `11.25.0` (see `mise.toml` / `.nvmrc` / `package.json#packageManager`). `mise` is not installed here; Node 24 is provided via `nvm` and pnpm via `corepack`. The base image ships a different Node (`/exec-daemon/node`, v22) earlier on `PATH`; a one-time `~/.bashrc` edit prepends the nvm Node 24 bin so interactive agent shells default to Node 24. The startup update script also activates Node 24 + pnpm itself, so it does not rely on that shell config.
- Always run repo commands with pnpm workspace filters, e.g. `pnpm --filter front-end <script>`.

### front-end (main app)
- Dev server: `pnpm --filter front-end dev` (serves on `http://localhost:3000`). The `predev`/`prebuild` step (`generate-llm-assets.ts`) regenerates `public/llms*.txt` and `public/blog|portfolio/**/index.md` on every dev/build — do not hand-edit those generated files.
- Lint / test / build: `pnpm --filter front-end lint`, `pnpm --filter front-end test` (vitest), `pnpm --filter front-end build`. `output: 'export'` so the build emits a static site to `front-end/out/`.
- The build renders Mermaid diagrams with Puppeteer. Locally it uses Puppeteer's bundled Chromium (downloaded during `pnpm install`), so no `PUPPETEER_EXECUTABLE_PATH` is needed — unlike CI (`.github/workflows/front-end.yml`), which points it at a system Chrome.

### cloud (AWS CDK)
- Type-check (the CI gate): `pnpm --filter cloud type-check`.
- `cdk synth` / `cdk diff` / `deploy` read AWS settings from env vars (see `cloud/cfg/configuration.ts`): `AWS_ACCOUNT`, `AWS_DEPLOYMENT_REGION`, `HOSTED_ZONE_ID`. Without them, `cdk synth` fails with an invalid S3 bucket name (`cdk-hnb659fds-assets--`). With any placeholder account/region it synths fine (Lambda is bundled via esbuild — no Docker required for synth). Actual `deploy` additionally needs real AWS credentials (CI uses OIDC).

### back-end/demo
- Type-check with `cd back-end/demo && npx tsc -p tsconfig.json --noEmit`. It is a Lambda, not a local dev server. Its container flow (`back-end/docker-compose.yaml`) needs Docker, which is not installed in this environment.

### Git hook
- `.husky/pre-commit` runs `pnpm test` only when files under `front-end/content/` or `front-end/lib/image-manifest.json` are staged.
