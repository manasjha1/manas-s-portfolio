import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import manasPortrait from '/src/assets/manasJhaPortrait.png'

export const Footer: React.FC = () => {
    const cinematicRef = useRef<HTMLDivElement>(null);
    const [imageError, setImageError] = useState(false);

    // Scroll tracking for cinematic effects
    const { scrollYProgress } = useScroll({
        target: cinematicRef,
        offset: ["start end", "end start"],
    });

    // Background texture scales from 1.12 to 1.0 as it scrolls through
    const bgScale = useTransform(scrollYProgress, [0, 0.6], [1.12, 1.0]);

    // Cinematic card moves from xPercent: 120 to 0 and rotates
    const cardX = useTransform(scrollYProgress, [0, 0.5], ["60%", "0%"]);
    const cardOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <footer className="w-full flex flex-col bg-ink text-paper relative overflow-hidden">
            {/* 1. Cinematic Closing Statement Section */}
            <div
                ref={cinematicRef}
                className="w-full min-h-[70vh] md:min-h-screen relative flex items-center justify-center p-6 md:p-12 overflow-hidden border-b border-paper/10"
            >
                {/* Parallax Background Code/UI Texture */}
                <motion.div
                    className="absolute inset-0 z-0 overflow-hidden opacity-30 select-none pointer-events-none"
                    style={{ scale: bgScale }}
                >
                    {!imageError ? (
                        <img
                            src="src/assets/meigen-ced89d0f-270f-4f60-b41d-8cf52c9492eb.png"
                            alt="Cinematic background"
                            onError={() => setImageError(true)}
                            className="w-full h-full object-cover grayscale brightness-50"
                        />
                    ) : (
                        // Pure CSS abstract programming texture loop fallback
                        <div className="w-full h-full bg-ink relative flex items-center justify-center">
                            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(239,238,233,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(239,238,233,0.15)_1px,transparent_1px)] bg-size-[40px_40px]" />
                            <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, #0b0b0b 90%)" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-acid opacity-20">
                                development.environment.terminal.sandbox.main.tsx
                            </span>
                        </div>
                    )}
                </motion.div>

                {/* Cinematic Card element */}
                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10 text-left">
                    {/* Statement text */}
                    <div className="max-w-2xl">
                        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-accent block mb-4">
                            06 / CLOSING
                        </span>
                        <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-7xl uppercase tracking-tighter leading-none select-none">
                            STILL EARLY IN THE JOURNEY — BUT BUILDING FAST, LEARNING FASTER.
                        </h2>
                    </div>

                    {/* Animated card: Rotated ~18deg, translates on scroll */}
                    <motion.div
                        className="w-60 sm:w-72 aspect-3/4 bg-paper text-ink p-5 sm:p-6 border border-paper/10 rounded-[3px] shadow-2xl relative flex flex-col justify-between self-center lg:self-auto -rotate-12 sm:rotate-[-18deg] scale-90 sm:scale-100"
                        style={{
                            x: cardX,
                            opacity: cardOpacity,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Top row */}
                        <div className="flex justify-between items-center w-full border-b border-ink/10 pb-4">
                            <span className="font-mono text-[10px] uppercase font-bold text-accent">
                                M. JHA
                            </span>
                            <span className="font-sans text-[9px] tracking-widest opacity-60">
                                DELHI, INDIA
                            </span>
                        </div>

                        {/* Middle logo / graphic */}
                        <div className="my-10 flex flex-col justify-center items-center text-center">
                            <img
                                src={manasPortrait}
                                alt="Manas Jha Photo"
                            />
                        </div>

                        {/* Bottom row info */}
                        <div className="flex justify-between items-end border-t border-ink/10 pt-4 w-full">
                            <span className="font-mono text-[9px] text-ink/60">
                                STATUS: AVAILABLE
                            </span>
                            <span className="font-display font-semibold text-lg hover:text-accent duration-200">
                                2029 &copy;
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 2. Contact Grid Section */}
            <div
                id="contact"
                className="w-full px-6 py-24 md:py-40 border-b border-paper/10"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 text-left">
                    {/* Big Let's build text (span 6) */}
                    <div className="lg:col-span-6 flex flex-col gap-4">
                        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-accent leading-none">
                            07 / CONTACT
                        </span>
                        <h2 className="font-display font-bold text-3xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-none select-none">
                            LET'S BUILD
                            <br />
                            SOMETHING.
                        </h2>
                        {/* <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-sm mt-4 lowercase">
                            seeking an internships, project development collaboration, or just
                            looking to say hello. drop me a message below.
                        </p> */}
                    </div>

                    {/* Contact Details grid (span 6) */}
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {/* Email column */}
                        <div className="flex flex-col gap-3">
                            <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-accent">
                                email address
                            </span>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=manasjha384@gmail.com"
                                className="font-display font-medium text-base sm:text-lg md:text-2xl uppercase tracking-wide hover:text-accent transition-colors duration-300 break-all"
                                data-cursor="hover"
                            >
                                manasjha384@gmail.com
                            </a>
                        </div>

                        {/* Phone column */}
                        <div className="flex flex-col gap-3">
                            <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-accent">
                                phone line
                            </span>
                            <a
                                href="tel:8826929757"
                                className="font-display font-medium text-lg md:text-2xl uppercase tracking-wide hover:text-accent transition-colors duration-300"
                                data-cursor="hover"
                            >
                                +91 8826929757
                            </a>
                        </div>

                        {/* Github Link */}
                        <div className="flex flex-col gap-3">
                            <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-accent">
                                version control
                            </span>
                            <a
                                href="https://github.com/manasjha1"
                                target="_blank"
                                rel="noreferrer"
                                className="font-display font-medium text-lg md:text-2xl uppercase tracking-wide hover:text-accent transition-colors duration-300"
                                data-cursor="hover"
                            >
                                github.com/manasjha1
                            </a>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-1">
                            <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-accent">
                                base location
                            </span>
                            <span className="font-display font-medium text-lg md:text-xl uppercase tracking-wide text-neutral-400 select-none">
                                Delhi, India
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Global Bottom Navigation Recap */}
            <div className="w-full px-6 py-8 border-t border-paper/5 text-left bg-[#090909] text-xs font-sans text-neutral-500 font-light select-none">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        <a
                            href="#hero"
                            className="hover:text-accent transition-colors duration-200"
                        >
                            BACK TO TOP
                        </a>
                        <a
                            href="#projects"
                            className="hover:text-accent transition-colors duration-200"
                        >
                            SELECTED WORK
                        </a>
                        <a
                            href="#skills"
                            className="hover:text-accent transition-colors duration-200"
                        >
                            CAPABILITIES
                        </a>
                        <a
                            href="#engagement"
                            className="hover:text-accent transition-colors duration-200"
                        >
                            WAYS TO WORK
                        </a>
                        <a
                            href="#archive"
                            className="hover:text-accent transition-colors duration-200"
                        >
                            LOGBOOK
                        </a>
                    </div>

                    <div className="flex items-center gap-6">
                        <span>
                            © {new Date().getFullYear()} MANAS JHA. ALL RIGHTS RECREATED.
                        </span>
                        {/* <span className="text-[10px] text-accent tracking-widest font-bold">NORTH/FORM STYLE DIRECTORY</span> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};
