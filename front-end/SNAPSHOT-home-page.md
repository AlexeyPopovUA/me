# Content Snapshot: Home Page (/)

**File**: `me/front-end/app/page.tsx`
**Date**: 2026-01-24
**Purpose**: Preserve page content structure before migration

## Content Structure

### Hero Section
- Profile image: `/pages/home/me-w-square-bg.jpg`
  - Circular with amber border
  - Size: 300x300 (w-72 on mobile, sm:w-52 md:w-60 lg:w-64)
- Heading: "Hi, I'm Oleksii Popov,"
- Subheading: "Front End Leaning Full-Stack Software Developer"
- Description: "with 14 years of experience crafting robust software solutions using React, Node.js, JavaScript, TypeScript, and AWS."

### Links & CTAs
- Link to CV/resume: `/resume`
- Link to portfolio: `/portfolio`
- Link to blog: `/blog`

### Components
- `<FeaturedProjects />` - Shows featured work
- `<LatestArticles />` - Shows latest blog posts
- `<HomePageStructuredData />` - SEO structured data

### Layout
- Main container: `prose` classes with responsive sizing
- Flexbox layout: vertical on mobile, horizontal on larger screens
- Max-width container with auto margins
- Padding: px-8 py-4

## Key Features
- Responsive image with blur placeholder
- SEO metadata with OpenGraph
- RSS feed alternate link
- Structured data for search engines
