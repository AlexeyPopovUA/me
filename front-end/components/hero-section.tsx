'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { imageLoader } from '@/components/image/image-loader';

const techStack = ['React', 'Node.js', 'TypeScript', 'JavaScript', 'AWS', 'CI/CD'];

interface HeroSectionProps {
    src: string;
    blurDataURL: string;
    name: string;
    title: string;
    description: string;
}

export const HeroSection = ({ src, blurDataURL, name, title, description }: HeroSectionProps) => {
    return (
        <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative"
                    >
                        <div className="relative w-64 h-64 lg:w-72 lg:h-72">
                            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-glow" />
                            <Image
                                src={src}
                                alt={`Profile photo of ${name}`}
                                width={288}
                                height={288}
                                className="relative z-10 w-full h-full rounded-full object-cover border-4 border-primary/50 glow-amber"
                                placeholder="blur"
                                blurDataURL={blurDataURL}
                                loader={imageLoader}
                                priority
                            />
                            {/* Decorative ring */}
                            <div className="absolute -inset-3 rounded-full border border-primary/20 animate-float" />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <p className="text-primary font-mono text-sm mb-3">Hi, I'm</p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">{name}</h1>
                            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                                <span className="gradient-text font-semibold">Front-End Leaning</span> Full-Stack Developer
                            </p>
                            <p className="text-muted-foreground max-w-xl mb-8 leading-relaxed">{description}</p>
                        </motion.div>

                        {/* Tech Stack Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
                        >
                            {techStack.map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-mono border border-border hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4"
                        >
                            <Link
                                href="/resume"
                                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all glow-amber hover:glow-amber-strong"
                            >
                                View My CV
                            </Link>
                            <Link
                                href="/portfolio"
                                className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-all"
                            >
                                Explore Portfolio
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
