# SEO Audit Report — `me`
Date: 2026-01-28  
Scope: Local static export vs production (`https://oleksiipopov.com/`)

## Summary
- Audited 22 URLs from `front-end/out/sitemap.xml`.
- Local vs prod: all metadata and JSON-LD are identical for every audited page.
- Key issues: missing `og:url` and `og:type` on 21 pages, missing share images on `social-profiles`, missing structured data on 12 pages, and overly long titles/descriptions on several pages.
- Optional improvements: `og:site_name` and `twitter:site` are missing on all pages.

## Methodology
1. Built the front-end static export with `next build` and used `front-end/out/` HTML as the local baseline.
2. Parsed URLs from the generated `front-end/out/sitemap.xml`.
3. Fetched production HTML for each URL from `https://oleksiipopov.com/`.
4. Extracted: title, meta description, canonical, Open Graph tags, Twitter tags, and JSON-LD blocks.
5. Stored snapshots for comparison in `.tmp-seo-snapshots/`.

Note: Running `next dev` is a long-lived process and is not supported here, so the audit used the static export.

## URL inventory (22 total)
Top-level pages:
- `https://oleksiipopov.com/`
- `https://oleksiipopov.com/contact/`
- `https://oleksiipopov.com/blog/`
- `https://oleksiipopov.com/portfolio/`
- `https://oleksiipopov.com/resume/`
- `https://oleksiipopov.com/social-profiles/`

Blog posts (8):
- `https://oleksiipopov.com/blog/essential-skills-ai-era-software-engineering/`
- `https://oleksiipopov.com/blog/npm-package-managers-comparison/`
- `https://oleksiipopov.com/blog/npm-release-automation/`
- `https://oleksiipopov.com/blog/nextjs-images/`
- `https://oleksiipopov.com/blog/react-18-vs-react-19/`
- `https://oleksiipopov.com/blog/serving-environment-specific-configurations-to-web-applications/`
- `https://oleksiipopov.com/blog/simple-static-web-hosting-aws-infrastructure-with-protected-dev-environment/`
- `https://oleksiipopov.com/blog/feature-branches-approach-in-ci-cd-of-npm-libraries/`

Portfolio detail pages (8):
- `https://oleksiipopov.com/portfolio/dynatrace-kubernetes-app/`
- `https://oleksiipopov.com/portfolio/portfolio-website/`
- `https://oleksiipopov.com/portfolio/tomtom-web-sdk-demo-catalog/`
- `https://oleksiipopov.com/portfolio/tomtom-route-planner-web/`
- `https://oleksiipopov.com/portfolio/zapiski-mami/`
- `https://oleksiipopov.com/portfolio/advanced-logger/`
- `https://oleksiipopov.com/portfolio/tomtom-road-trips-web/`
- `https://oleksiipopov.com/portfolio/albelli-online-photo-products-editor/`

## Findings

### 1) Core meta tags
- Title, description, and canonical are present on **all 22 pages**.
- `og:site_name` is missing on **all 22 pages**.
- `twitter:site` is missing on **all 22 pages**.

### 2) Open Graph completeness
Missing `og:url` (21 pages):
- `https://oleksiipopov.com/`
- `https://oleksiipopov.com/contact/`
- `https://oleksiipopov.com/blog/`
- `https://oleksiipopov.com/portfolio/`
- `https://oleksiipopov.com/resume/`
- All blog posts (8 URLs)
- All portfolio detail pages (8 URLs)

Missing `og:type` (21 pages):
- Same set as above.

The only page with `og:url` and `og:type` is:
- `https://oleksiipopov.com/social-profiles/` (sets `og:type=profile`)

### 3) Share images
Missing `og:image` and `twitter:image`:
- `https://oleksiipopov.com/social-profiles/`

All other pages include both OG and Twitter images.

### 4) Structured data (JSON-LD)
Present:
- Home page: `Person`
- Resume page: `Person`
- Blog posts (8): `BlogPosting`

Missing JSON-LD (12 pages):
- `https://oleksiipopov.com/contact/`
- `https://oleksiipopov.com/blog/`
- `https://oleksiipopov.com/portfolio/`
- `https://oleksiipopov.com/social-profiles/`
- All portfolio detail pages (8 URLs)

### 5) Title length issues
Titles longer than 65 characters (8 pages):
- `https://oleksiipopov.com/blog/essential-skills-ai-era-software-engineering/` (80)
- `https://oleksiipopov.com/blog/npm-package-managers-comparison/` (68)
- `https://oleksiipopov.com/blog/npm-release-automation/` (110)
- `https://oleksiipopov.com/blog/nextjs-images/` (95)
- `https://oleksiipopov.com/blog/react-18-vs-react-19/` (68)
- `https://oleksiipopov.com/blog/serving-environment-specific-configurations-to-web-applications/` (79)
- `https://oleksiipopov.com/blog/simple-static-web-hosting-aws-infrastructure-with-protected-dev-environment/` (91)
- `https://oleksiipopov.com/blog/feature-branches-approach-in-ci-cd-of-npm-libraries/` (67)

### 6) Description length issues
Descriptions longer than 160 characters (9 pages):
- `https://oleksiipopov.com/` (261)
- `https://oleksiipopov.com/blog/npm-package-managers-comparison/` (226)
- `https://oleksiipopov.com/blog/npm-release-automation/` (194)
- `https://oleksiipopov.com/blog/nextjs-images/` (238)
- `https://oleksiipopov.com/blog/serving-environment-specific-configurations-to-web-applications/` (235)
- `https://oleksiipopov.com/blog/feature-branches-approach-in-ci-cd-of-npm-libraries/` (164)
- `https://oleksiipopov.com/portfolio/tomtom-web-sdk-demo-catalog/` (166)
- `https://oleksiipopov.com/portfolio/zapiski-mami/` (252)
- `https://oleksiipopov.com/portfolio/advanced-logger/` (237)

### 7) Sitemap coverage
`/resume-print/` is not in `sitemap.xml`. If it should be indexed, include it; otherwise consider adding `noindex` to that page to avoid accidental indexing.

## Recommendations
1. **Add `og:url` and `og:type` on all pages.**
   - Static pages: use `website`.
   - Blog posts: use `article`.
   - Portfolio detail pages: use `article` or `website` consistently.
2. **Add default OG/Twitter images** for pages without thumbnails (at least `social-profiles`).
3. **Fill structured data gaps**:
   - `contact`: `ContactPage` or `WebPage`
   - `blog` and `portfolio` listing pages: `CollectionPage` + `ItemList`
   - Portfolio detail pages: `CreativeWork` / `SoftwareApplication` / `WebApplication` (pick best fit)
   - `social-profiles`: `ProfilePage` or `Person`
4. **Shorten titles and descriptions** to improve SERP display.
5. **Optional**: add `og:site_name` and `twitter:site` for richer social previews.
6. **Sitemap decision** for `/resume-print/`: include it or explicitly `noindex`.

## Artifacts
- Local HTML (static export): `front-end/out/`
- Sitemap used: `front-end/out/sitemap.xml`
- Snapshots: `.tmp-seo-snapshots/local/` and `.tmp-seo-snapshots/prod/`
- Raw audit data: `.tmp-seo-snapshots/report.json`

