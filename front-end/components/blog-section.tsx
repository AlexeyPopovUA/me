'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface BlogSectionProps {
    children: ReactNode;
}

export const BlogSection = ({ children }: BlogSectionProps) => {
    return (
        <section className="py-20 px-6 bg-card/50">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Articles</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        I share insights on front-end, cloud, and back-end development{' '}
                        <Link href="/blog" className="text-primary hover:underline">
                            on my blog
                        </Link>
                        .
                    </p>
                </motion.div>

                <div className="space-y-4">{children}</div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                        See more articles
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

interface BlogPostCardProps {
    title: string;
    href: string;
    image: ReactNode;
    index: number;
}

export const BlogPostCard = ({ title, href, image, index }: BlogPostCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                href={href}
                className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover-lift"
            >
                <div className="flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden">{image}</div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-medium text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </div>
                <ArrowRight size={20} className="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
        </motion.div>
    );
};
