# LinkedIn post

**Account limits (free):** up to **3,000 characters** per post. Link previews are automatic when you paste the URL on its own line.

**Attach:** `.tmp/linkedin-hero-1200x627.jpg` (1200×627, cover crop via `images.oleksiipopov.com` from `static-hosting-platform-hero.png`). Regenerate:

```bash
curl -fsSL -H "Accept: image/jpeg" \
  "https://images.oleksiipopov.com/$(node -e "
    const t={bucket:'serverless-image-handler-image-source',key:'me/articles/static-hosting-for-vibe-coders/static-hosting-platform-hero.png',edits:{jpeg:{quality:85},resize:{width:1200,height:627,fit:'cover',position:'centre'}}};
    process.stdout.write(Buffer.from(JSON.stringify(t)).toString('base64'));
  ")" \
  -o .tmp/linkedin-hero-1200x627.jpg
```

**Draft length:** ~2,190 characters (comfortable to read; well under the cap).

---

## Recommended post

```
Static hosting for vibe coders: one platform, many apps

New blog post — architecture, S3 layout, SPA 404s, reusable GitHub workflows: https://oleksiipopov.com/blog/static-hosting-for-vibe-coders/

A while back, the ask sounded simple: a lightweight space where someone (or an AI agent) could sketch a static idea, get a live URL, and iterate without a deployment lecture.

Not a full PaaS — just HTML/CSS/JS (or any build that outputs static files), branch previews, and almost no ceremony per new app.

What I shipped on my own AWS account:

→ One S3 bucket + one CloudFront distribution for every app
→ One production subdomain per app slug (hello, palette, hosting-demo, …)
→ Pull requests get their own preview subdomain on a dev host (app slug + branch name)
→ Thin app repos: deploy.yml calls a reusable GitHub Actions workflow with parameters only (app-slug, build command, output dir)
→ No bucket IDs or distribution IDs in app secrets — the platform workflow reads them from SSM

The split that kept it small:

• Platform repo — CDK, DNS, subdomain routing, reusable workflows
• App repo — source code, pnpm build → dist/, two small workflow files

It's a follow-up to my 2023 post on simple static hosting with a protected dev environment — same S3 + CloudFront + GitHub Actions spine, but many tenants and public preview URLs instead of a WAF-gated dev distribution.

Explicit non-goals: APIs, databases, auth backends. If you need a backend, bring it elsewhere.

Links:

Live hello demo (bundled app): https://hello.demo.oleksiipopov.com

Live palette demo (bundled app): https://palette.demo.oleksiipopov.com

Live hosting-demo production (external app): https://hosting-demo.demo.oleksiipopov.com

Live hosting-demo branch preview (PR feature branch): https://hosting-demo--test-feature-branch-hosting.dev.demo.oleksiipopov.com

GitHub — platform repo (CDK + reusable workflows): https://github.com/AlexeyPopovUA/static-hosting-for-vibe-coders

GitHub — demo consumer app: https://github.com/AlexeyPopovUA/static-hosting-demo-app

If you're juggling many small front ends or agent-driven demos, how are you handling preview URLs today?
```

---

## Shorter variant (~750 characters)

```
New article: static hosting for vibe coders — one platform, many apps.

Blog post: https://oleksiipopov.com/blog/static-hosting-for-vibe-coders/

The goal was small: draft a static idea, get a URL, iterate on branch previews. No PaaS, no backend — just shared S3 + CloudFront, subdomain routing, and thin app repos that call a reusable GitHub Actions workflow.

Production + PR preview URLs per app. App repos pass parameters only; platform owns deploy logic.

Live hello demo: https://hello.demo.oleksiipopov.com
Live palette demo: https://palette.demo.oleksiipopov.com
Live hosting-demo production: https://hosting-demo.demo.oleksiipopov.com
Live hosting-demo branch preview: https://hosting-demo--test-feature-branch-hosting.dev.demo.oleksiipopov.com

Curious how others handle demo links for AI-assisted or throwaway front-end experiments.
```

---

## Suggested hashtags (paste below the post; stay within 3,000 total)

`#AWS` `#CloudFront` `#GitHubActions` `#SolutionDesign` `#WebDevelopment`

---

## Posting checklist

- [ ] Paste the **recommended** or **shorter** body (plain text only — no markdown, no `{app}` placeholders; **label and URL on the same line** so lnkd.in short links stay readable)
- [ ] Attach `.tmp/linkedin-hero-1200x627.jpg` before or after paste
- [ ] Post from a personal profile (free) — no character limit issues with either draft
- [ ] Optional: link to the 2023 hosting article in a comment if the main post feels long
