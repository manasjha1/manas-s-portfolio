import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate, type Easing } from 'framer-motion';

// An animated counter component
const CounterItem: React.FC<{ value: number; suffix?: string; label: string }> = ({ value, suffix = '', label }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px 0px' });
    const count = useMotionValue(0);

    useEffect(() => {
        if (inView) {
            const controls = animate(count, value, {
                duration: 1.8,
                ease: 'easeOut',
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = Math.round(latest).toString();
                    }
                },
            });
            return () => controls.stop();
        }
    }, [inView, count, value]);

    return (
        <div className="flex flex-col border-l border-ink/10 pl-6 py-2">
            <div className="font-display font-medium text-4xl md:text-5xl text-ink leading-tight flex items-baseline">
                <span ref={ref}>0</span>
                {suffix && <span className="text-accent ml-0.5">{suffix}</span>}
            </div>
            <span className="font-sans text-[11px] uppercase tracking-wider text-muted mt-2 font-medium">
                {label}
            </span>
        </div>
    );
};

export const Intro: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, margin: '-20% 0px' });
    const [imageError, setImageError] = useState(false);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const customEase: Easing = [0.6, 0.05, 0.01, 0.9];
    const lineVariants = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: {
                duration: 0.6,
                ease: customEase,
            },
        },
    }

    return (
        <section
            ref={containerRef}
            id="about"
            className="w-full bg-paper text-ink px-6 py-24 md:py-36 global-border-hairline border-t border-b overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                {/* Intro Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Portrait Container (Grid 4) */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                        <motion.div
                            className="relative w-full max-w-[320px] aspect-4/5 bg-neutral-300 portrait-clip overflow-hidden shadow-xl"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            {!imageError ? (
                                <img
                                    src="https://images.meigen.ai/generations/2026-07/d47bc070-5252-4b89-9137-a159023356f5.webp"
                                    alt="Manas Jha"
                                    onError={() => setImageError(true)}
                                    className="w-full h-full object-cover grayscale contrast-[1.10] hover:grayscale-20 transition-all duration-700"
                                />
                            ) : (
                                // Super stylish custom CSS vector professional avatar fallback
                                <div className="w-full h-full bg-ink text-paper flex flex-col items-center justify-center p-8 relative">
                                    {/* Grid overlay */}
                                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(239,238,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,238,233,0.1)_1px,transparent_1px)] bg-size-[20px_20px]" />
                                    <svg className="w-20 h-20 text-accent relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    <span className="font-display font-medium text-lg tracking-widest mt-4 text-paper relative z-10">M. JHA</span>
                                    <span className="text-[10px] uppercase font-sans tracking-widest text-acid relative z-10 mt-1">Frontend Builder</span>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* About Copy block (Grid 8) */}
                    <div className="lg:col-span-8 flex flex-col gap-10">

                        {/* Headers */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            className="flex flex-col gap-4 text-left"
                        >
                            <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-accent leading-none">
                                01 / BIOGRAPHY
                            </span>

                            <div className="flex flex-col font-display text-3xl md:text-5xl font-medium tracking-tight leading-tight select-none">
                                {["BCA student turned frontend", "builder — self-taught through", "shipping real projects."].map((line, idx) => (
                                    <div key={idx} className="overflow-hidden">
                                        <motion.span variants={lineVariants} className="block">
                                            {line}
                                        </motion.span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Description Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={inView ? { opacity: 0.9, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="font-sans text-base md:text-lg text-ink font-light leading-relaxed max-w-2xl text-left gap-4 flex flex-col"
                        >
                            <p>
                                Hello, I’m Manas Jha, a driven React frontend developer. Currently completing my Bachelor of Computer Applications (BCA, expected graduation 2029), I have spent my time building websites that couple clean architecture with high-end creative CSS/SVG animations.
                            </p>
                            <p>
                                I thrive in the React ecosystem, leveraging Tailwind CSS, Framer Motion, and shadcn/ui to build performant web applications like shopping cart modules, task dashboards, and interactive REST API integrations. My long-term roadmap centers on deepening my JavaScript engineering skills and expanding into node/mongodb full-stack systems.
                            </p>
                        </motion.div>

                        {/* Stats Block */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-ink/10 text-left">
                            <CounterItem value={3} label="Projects Shipped" />
                            <CounterItem value={3} suffix="+" label="Frontend Stacks" />
                            <CounterItem value={2029} label="BCA Graduation" />
                            <CounterItem value={100} suffix="%" label="Self-Taught Learning" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
