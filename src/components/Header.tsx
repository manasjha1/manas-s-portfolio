import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Trigger scrolled state after 50px
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Selected Work', href: '#projects' },
        { name: 'Capabilities', href: '#skills' },
        { name: 'Ways to Work', href: '#engagement' },
        { name: 'Learning Log', href: '#archive' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 w-full z-90 px-6 py-4 transition-all duration-500 global-border-hairline border-b ${isScrolled
                        ? 'bg-[#0b0b0b]/80 backdrop-blur-md py-4 text-[#efeee9]'
                        : 'bg-transparent text-[#0b0b0b]'
                    }`}
                style={{
                    // Apply difference blend mode until scrolled (looks great over dark background)
                    mixBlendMode: isScrolled ? 'normal' : 'difference',
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a
                        href="#"
                        className="font-display font-medium text-lg leading-none uppercase tracking-wider group"
                    >
                        <span>MANAS JHA</span>
                        <span className="text-accent ml-1 group-hover:scale-150 inline-block transition-transform duration-300">·</span>
                    </a>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-sans text-xs uppercase tracking-widest font-medium opacity-80 hover:opacity-100 transition-opacity duration-200 relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c24f20] group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative group"
                        aria-label="Toggle Menu"
                    >
                        <span
                            className={`w-5 h-[1.5px] bg-current transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-1'
                                }`}
                        />
                        <span
                            className={`w-5 h-[1.5px] bg-current transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-1'
                                }`}
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-[#0b0b0b] text-[#efeee9] z-[85] flex flex-col justify-center px-8"
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 + idx * 0.05 }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-display font-medium text-4xl uppercase tracking-wider block hover:text-accent transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </motion.div>
                            ))}
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs tracking-wider opacity-60 font-sans border-t border-[#efeee9]/10 pt-6">
                            <span>DELHI, IN</span>
                            <span>© {new Date().getFullYear()}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
