import type {Metadata} from "next";

import {content} from "@/app/configuration/content";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getOGImageURL} from "@/lib/image";
import {ProfilePageStructuredData} from "@/components/ProfilePageStructuredData";

const pageTitle = `Social Profiles - ${content.authorName}`;
const pageDescription = "Find Oleksii Popov on various social media platforms and professional networks including GitHub, LinkedIn, Twitter, Medium, NPM, and more.";
const pageSlug = "social-profiles";

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = getOGImageURL({src: "/shared/default_thumbnail_o_p.png"});

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "Oleksii Popov",
      "social profiles",
      "GitHub",
      "LinkedIn",
      "Twitter",
      "Medium",
      "NPM",
      "GitLab",
      "Gumroad",
      "RemoteOK",
      "Dev.to",
      "Braintrust",
      "WKO",
      "full-stack developer",
      "React developer",
      "TypeScript developer",
      "AWS developer",
      "Node.js developer",
      "software engineer",
      "web developer",
      "frontend developer",
      "backend developer",
      "Austria developer",
      "Klagenfurt developer",
      "freelancer",
      "consultant",
      "technical interview",
      "web development consultation",
      "DevOps consultation"
    ],
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL(environment.url),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "profile",
      url: ensurePathSlash(`/${pageSlug}`),
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage]
    },
    alternates: {
      canonical: ensurePathSlash(`/${pageSlug}`),
    },
  };
}

export default function SocialProfilesPage() {
  const sameAs = Object.values(content.socialLinks);
  const pageUrl = `${environment.url}${ensurePathSlash(`/${pageSlug}`)}`;
  const ogImage = getOGImageURL({src: "/shared/default_thumbnail_o_p.png"});

  return (
    <>
      <ProfilePageStructuredData
        pageName={pageTitle}
        personName={content.authorName}
        description={pageDescription}
        url={pageUrl}
        sameAs={sameAs}
        image={ogImage}
        personUrl={environment.url}
      />
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Social Profiles</h1>
              <p className="text-lg text-muted-foreground">
                Connect with {content.authorName} on various social media platforms and professional networks.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Professional Networks</h2>
                <div className="space-y-3">
                  <a
                    href={content.socialLinks.linkedin}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">LinkedIn</span>
                    <p className="text-sm text-muted-foreground mt-1">Professional Profile</p>
                  </a>
                  <a
                    href={content.socialLinks.braintrust}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">Braintrust</span>
                    <p className="text-sm text-muted-foreground mt-1">Freelance Profile</p>
                  </a>
                  <a
                    href={content.socialLinks.freelancetribes}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">Freelancetribes</span>
                    <p className="text-sm text-muted-foreground mt-1">Freelance Profile</p>
                  </a>
                  <a
                    href={content.socialLinks.buffer_start_page}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">Buffer</span>
                    <p className="text-sm text-muted-foreground mt-1">Start Page Profile</p>
                  </a>
                  <a
                    href={content.socialLinks.rok}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">RemoteOK</span>
                    <p className="text-sm text-muted-foreground mt-1">Remote Work Profile</p>
                  </a>
                  <a
                    href={content.socialLinks.wko}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">WKO Austria</span>
                    <p className="text-sm text-muted-foreground mt-1">Business Profile</p>
                  </a>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Development Platforms</h2>
                <div className="space-y-3">
                  <a
                    href={content.socialLinks.github}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">GitHub</span>
                    <p className="text-sm text-muted-foreground mt-1">Open Source Projects</p>
                  </a>
                  <a
                    href={content.socialLinks.gitlab}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">GitLab</span>
                    <p className="text-sm text-muted-foreground mt-1">Code Repository</p>
                  </a>
                  <a
                    href={content.socialLinks.npm}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">NPM</span>
                    <p className="text-sm text-muted-foreground mt-1">Published Packages</p>
                  </a>
                </div>

                <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">Content & Social</h2>
                <div className="space-y-3">
                  <a
                    href={content.socialLinks.medium}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">Medium</span>
                    <p className="text-sm text-muted-foreground mt-1">Technical Articles</p>
                  </a>
                  <a
                    href={content.socialLinks.devto}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">Dev.to</span>
                    <p className="text-sm text-muted-foreground mt-1">Developer Community</p>
                  </a>
                  <a
                    href={content.socialLinks.twitter}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">Twitter (X)</span>
                    <p className="text-sm text-muted-foreground mt-1">Updates & Insights</p>
                  </a>
                </div>

                <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">Services & Products</h2>
                <div className="space-y-3">
                  <a
                    href={content.socialLinks.gumroad}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">Gumroad</span>
                    <p className="text-sm text-muted-foreground mt-1">Digital Products & Services</p>
                  </a>
                  <a
                    href={content.socialLinks.cal_com}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover-lift"
                  >
                    <span className="text-foreground hover:text-primary font-medium">Cal.com</span>
                    <p className="text-sm text-muted-foreground mt-1">Schedule a Quick Call</p>
                  </a>
                </div>
              </section>
            </div>

            <div className="mt-12 p-6 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-semibold text-foreground mb-3">About {content.authorName}</h3>
              <p className="text-muted-foreground">
                Full-Stack Software Developer specializing in React, TypeScript, AWS, and Node.js.
                Based in Klagenfurt am Wörthersee, Austria. Available for consulting, technical interviews,
                and web development projects.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
