'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag as TagIcon } from 'lucide-react';
import { PostType } from '@/lib/posts';
import { ThumbnailImage } from '@/components/image/animated-image-loading/thumbnail-image';

type PostCardClientProps = {
    type: PostType;
    slug: string;
    title: string;
    date?: string;
    description: string;
    link: string;
    tags?: string[];
    projectType?: string;
    index: number;
    imageURL: string;
    blurDataURL: string;
    ratio: number;
};

export function PostCardClient({ type, title, date, description, link, tags, projectType, index, imageURL, blurDataURL }: PostCardClientProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Link href={link} className="group block h-full">
                <article className="h-full bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover-lift">
                    {/* Image */}
                    <div className="aspect-video overflow-hidden bg-muted relative">
                        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110">
                            <ThumbnailImage
                                imageClassName="w-full h-full object-cover"
                                unoptimized={true}
                                src={imageURL}
                                blurDataURL={blurDataURL}
                                alt={title}
                                loading="lazy"
                                width={560}
                                height={315}
                            />
                        </div>
                        {/* Category Badge for Projects */}
                        {projectType && (
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 rounded-md bg-background/80 backdrop-blur-sm text-foreground border border-border text-sm font-medium">
                                    {projectType}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Date for Blog Posts */}
                        {date && (
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                                <Calendar size={14} />
                                <span>{date}</span>
                            </div>
                        )}

                        {/* Title */}
                        <h2 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{title}</h2>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{description}</p>

                        {/* Tags */}
                        {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4 items-center">
                                {tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                        <TagIcon size={10} />
                                        {tag}
                                    </span>
                                ))}
                                {tags.length > 3 && <span className="text-muted-foreground text-xs">+{tags.length - 3}</span>}
                            </div>
                        )}

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                            {type === 'article' ? 'Read article' : 'View project'}
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
