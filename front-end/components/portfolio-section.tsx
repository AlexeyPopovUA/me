'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PortfolioSectionProps {
    children: ReactNode;
}

export const PortfolioSection = ({ children }: PortfolioSectionProps) => {
    return (
        <section className="py-20 px-6">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Work</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore examples of my work in the{' '}
                        <Link href="/portfolio" className="text-primary hover:underline">
                            portfolio
                        </Link>
                        .
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{children}</div>
            </div>
        </section>
    );
};

interface ProjectCardProps {
    title: string;
    href: string;
    image: ReactNode;
    index: number;
}

export const ProjectCard = ({ title, href, image, index }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={href} className="group relative overflow-hidden rounded-xl bg-card border border-border hover-lift block">
                <div className="aspect-square overflow-hidden">{image}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                        <span className="text-foreground font-medium text-sm">{title}</span>
                        <ExternalLink size={16} className="text-primary" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
