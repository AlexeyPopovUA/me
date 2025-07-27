import type { Metadata } from 'next';
import { content } from '@/app/configuration/content';

export const metadata: Metadata = {
  title: 'Social Profiles - Oleksii Popov',
  description: 'Find Oleksii Popov on various social media platforms and professional networks including GitHub, LinkedIn, Twitter, Medium, NPM, and more.',
  keywords: [
    'Oleksii Popov',
    'social profiles',
    'GitHub',
    'LinkedIn',
    'Twitter',
    'Medium',
    'NPM',
    'GitLab',
    'Gumroad',
    'RemoteOK',
    'Dev.to',
    'Braintrust',
    'WKO',
    'full-stack developer',
    'React developer',
    'TypeScript developer',
    'AWS developer',
    'Node.js developer',
    'software engineer',
    'web developer',
    'frontend developer',
    'backend developer',
    'Austria developer',
    'Klagenfurt developer',
    'freelancer',
    'consultant',
    'technical interview',
    'web development consultation',
    'DevOps consultation'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Social Profiles - Oleksii Popov',
    description: 'Connect with Oleksii Popov on various social media platforms and professional networks.',
    type: 'profile',
    url: '/social-profiles/',
  },
  alternates: {
    canonical: '/social-profiles/',
  },
};

export default function SocialProfilesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Social Profiles</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          Connect with {content.authorName} on various social media platforms and professional networks.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="text-xl font-semibold mb-4">Professional Networks</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={content.socialLinks.linkedin}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  LinkedIn - Professional Profile
                </a>
              </li>
              <li>
                <a
                  href={content.socialLinks.braintrust}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Braintrust - Freelance Profile
                </a>
              </li>
              <li>
                <a
                  href={content.socialLinks.rok}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  RemoteOK - Remote Work Profile
                </a>
              </li>
              <li>
                <a
                  href={content.socialLinks.wko}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  WKO Austria - Business Profile
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Development Platforms</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={content.socialLinks.github}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  GitHub - Open Source Projects
                </a>
              </li>
              <li>
                <a
                  href={content.socialLinks.gitlab}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  GitLab - Code Repository
                </a>
              </li>
              <li>
                <a
                  href={content.socialLinks.npm}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  NPM - Published Packages
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Content & Social</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={content.socialLinks.medium}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Medium - Technical Articles
                </a>
              </li>
              <li>
                <a
                  href={content.socialLinks.devto}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Dev.to - Developer Community
                </a>
              </li>
              <li>
                <a
                  href={content.socialLinks.twitter}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Twitter (X) - Updates & Insights
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Services & Products</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={content.socialLinks.gumroad}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Gumroad - Digital Products & Services
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">About {content.authorName}</h3>
          <p className="text-gray-700">
            Full-Stack Software Developer specializing in React, TypeScript, AWS, and Node.js.
            Based in Klagenfurt am Wörthersee, Austria. Available for consulting, technical interviews,
            and web development projects.
          </p>
        </div>
      </div>
    </div>
  );
}
