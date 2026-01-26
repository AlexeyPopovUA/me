'use client';

import React from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Linkedin, Globe } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "For any inquiries, opportunities, or collaboration",
    link: "mailto:opportunities@oleksiipopov.com",
    linkText: "opportunities@oleksiipopov.com",
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a time that works for you",
    link: "https://cal.com/oleksii-popov-software-developer",
    linkText: "Schedule a call with me",
    external: true,
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect with me professionally",
    link: "https://linkedin.com/in/oleksii-popov",
    linkText: "linkedin.com/in/oleksii-popov",
    external: true,
  },
];

const languages = ["English", "Ukrainian", "Russian", "Dutch"];

export default function ContactPageClient() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Contacts
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              If you have any questions, ideas, comments, advises, feedback or job opportunities, 
              then just drop me a message. I'll be happy to have a chat.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-2xl mx-auto">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={method.link}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="block group"
                  >
                    <div className="glass-panel border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover-lift">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          <Icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {method.title}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-3">
                            {method.description}
                          </p>
                          <span className="text-primary font-medium inline-flex items-center gap-2">
                            {method.linkText}
                            {method.external && (
                              <svg 
                                className="w-4 h-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                />
                              </svg>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Languages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="glass-panel border border-border/50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Globe size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <span
                        key={language}
                        className="px-3 py-1.5 rounded-full bg-muted text-foreground text-sm font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Connect CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap justify-center gap-4">
              <a
                href="mailto:opportunities@oleksiipopov.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Mail size={18} />
                Send Email
              </a>
              <a
                href="https://cal.com/oleksii-popov-software-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:border-primary/50 transition-colors"
              >
                <Calendar size={18} />
                Book a Call
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
