# Content Snapshot: Contact Page (/contact)

**File**: `me/front-end/app/contact/page.tsx`
**Date**: 2026-01-24
**Purpose**: Preserve page content structure before migration

## Content Structure

### Content
- MDX content from `/content/pages/contact/`
- Rendered directly via `{content}` from getPageMdxDataByPath

### Layout
- Article wrapper: `prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4`

### SEO
- Title format: "{frontMatter.title} - {authorName}"
- Description from frontMatter
- OpenGraph support
- Canonical URL
