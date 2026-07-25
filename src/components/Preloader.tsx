import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 800; // ms
        const intervalTime = 10;
        const increment = 100 / (duration / intervalTime);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return Math.min(prev + increment, 100);
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 bg-[#0b0b0b] text-[#efeee9] z-[1000] flex flex-col justify-between p-8 md:p-12 select-none pointer-events-none"
            initial={{ y: 0 }}
            exit={{
                y: '-100vh',
                opacity: 0.8,
                transition: {
                    duration: 0.9,
                    // GSAP power4.inOut equivalent cubic bezier
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.2
                }
            }}
        >
            <div className="flex justify-between items-start w-full">
                <span className="font-display font-medium text-sm tracking-widest opacity-60">
                    MANAS JHA
                </span>
                <span className="font-sans text-xs tracking-widest opacity-60">
                    DELHI, IN
                </span>
            </div>

            <div className="w-full flex flex-col items-start gap-4">
                {/* Overflow hidden mask for staggered text reveal */}
                <div className="overflow-hidden h-[clamp(44px,7.5vw,100px)]">
                    <motion.h1
                        className="font-display font-semibold uppercase leading-none tracking-tight text-[clamp(40px,7vw,96px)]"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                        PORTFOLIO&copy;
                    </motion.h1>
                </div>
                <p className="font-sans text-xs uppercase tracking-widest opacity-40 max-w-sm">
                    Recreating high-fidelity studio aesthetics with React, Tailwind and Framer Motion.
                </p>
            </div>

            <div className="w-full flex justify-between items-end">
                <span className="font-sans text-xs tracking-wider opacity-40">
                    INITIATING ENVIRONMENT
                </span>

                {/* Count progress */}
                <div className="font-display text-8xl md:text-9xl font-semibold leading-none tabular-nums select-none flex items-baseline">
                    <span>{Math.round(progress)}</span>
                    <span className="text-xl md:text-2xl font-light opacity-50 relative bottom-[0.5em] ml-1">%</span>
                </div>
            </div>
        </motion.div>
    );
};
