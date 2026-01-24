'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

const navLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Link href="/" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                            Oleksii Popov
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <motion.div key={link.href} whileHover={{ y: -2 }}>
                                <Link
                                    href={link.href}
                                    className="text-muted-foreground hover:text-primary transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </motion.div>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button className="text-foreground p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 py-6">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors text-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};
