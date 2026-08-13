import React from 'react';
import { motion } from 'framer-motion';

export const Ticker: React.FC = () => {
    const words = [
        'REACT.JS',
        'TAILWIND CSS',
        'SHADCN/UI',
        'JAVASCRIPT (ES6+)',
        'NODE.JS',
        'REST APIs',
        'GIT & GITHUB',
        'RESPONSIVE DESIGN',
    ];

    // Double the array for seamless repetition
    const tickerItems = [...words, ...words, ...words, ...words];

    return (
        <div className="relative w-full overflow-hidden bg-acid text-ink py-4 md:py-6 rotate-[-1.2deg] z-20 shadow-lg border-y border-ink">
            <div className="flex whitespace-nowrap">
                {/* Animated Marquee Flex Strip */}
                <motion.div
                    className="flex space-x-12 px-6"
                    animate={{ x: [0, '-50%'] }}
                    transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration: 25,
                    }}
                >
                    {tickerItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-12 select-none"
                        >
                            <span className="font-display font-bold text-xl md:text-3xl uppercase tracking-wider">
                                {item}
                            </span>
                            <span className="font-display text-xl md:text-3xl text-accent">·</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
