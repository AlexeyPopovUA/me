# Content Snapshot: Blog Page (/blog)

**File**: `me/front-end/app/blog/page.tsx`
**Date**: 2026-01-24
**Purpose**: Preserve page content structure before migration

## Content Structure

### Header
- H1: "Blog"

### Components
- `<AllPosts />` - Displays all blog posts

### Layout
- Container: `container mx-auto px-4 py-8 sm:px-8 md:px-12`
- Prose styling: `prose prose-sm md:prose-base lg:prose-lg mb-4`

### SEO
- Title format: "{frontMatter.title} - {authorName}"
- Description from frontMatter
- OpenGraph support
- RSS feed alternate link
- Keywords from frontMatter
- Canonical URL
