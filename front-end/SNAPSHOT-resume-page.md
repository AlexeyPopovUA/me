# Content Snapshot: Resume Page (/resume)

**File**: `me/front-end/app/resume/page.tsx`
**Date**: 2026-01-24
**Purpose**: Preserve page content structure before migration

## Content Structure

### Components (in order)
1. `<ResumeStructuredData />` - SEO structured data
2. `<Header />` - user info and contacts
3. `<Intro />` - introduction section
4. `<Skills />` - skills section
5. `<WorkHistory />` - work experience
6. `<Education />` - education section

### Data Source
- All data from `@/app/resume/data/data` (renderData object)
  - `renderData.user`
  - `renderData.contacts`
  - `renderData.intro`
  - `renderData.skills`
  - `renderData.experience`
  - `renderData.education`

### Layout
- Article wrapper with prose classes
- Print-specific styles included: `print:prose-xs`, `print:p-0`, `print:pt-2`, `print:space-y-2`, `print:leading-tight`, `print:prose-a:no-underline`
- Regular: `prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4`

### SEO
- Title format: "{frontMatter.title} - {authorName}"
- Description from frontMatter
- OpenGraph support
- Canonical URL
- Keywords from frontMatter
- Structured data for resume/person
