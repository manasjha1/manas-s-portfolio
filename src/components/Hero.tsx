import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LineDotRightHorizontal } from 'lucide-react';

export const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

    const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
    const portraitScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.12]);
    const portraitOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0.35]);
    const scanLineY = useTransform(scrollYProgress, [0, 1], ['38%', '52%']);
    const scanGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.2]);
    const heroFade = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.9, 0.6]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        interface Point {
            x: number;
            y: number;
            speed: number;
            length: number;
            opacity: number;
        }
        const points: Point[] = [];
        for (let i = 0; i < 40; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 0.2 + Math.random() * 0.4,
                length: 40 + Math.random() * 80,
                opacity: 0.05 + Math.random() * 0.15,
            });
        }

        const draw = () => {
            ctx.fillStyle = '#0b0b0b';
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = 'rgba(239, 238, 233, 0.02)';
            ctx.lineWidth = 1;
            const gridSize = 80;
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            ctx.lineWidth = 1.5;
            points.forEach((p) => {
                const gradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.length);
                gradient.addColorStop(0, `rgba(194, 79, 32, 0)`);
                gradient.addColorStop(0.5, `rgba(194, 79, 32, ${p.opacity})`);
                gradient.addColorStop(1, `rgba(215, 255, 69, 0)`);

                ctx.strokeStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x, p.y + p.length);
                ctx.stroke();

                p.y += p.speed;
                if (p.y > height) {
                    p.y = -p.length;
                    p.x = Math.random() * width;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-ink text-paper overflow-hidden flex flex-col justify-between p-6 md:p-12"
            id="hero"
        >
            {/* Background */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                style={{ y: mediaY, scale: mediaScale, opacity: heroFade }}
            >
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-transparent z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/40 z-10" />
            </motion.div>

            {/* Portrait — right side, scroll parallax */}
            <motion.div
                className="absolute right-0 top-0 bottom-0 w-full md:w-[52%] lg:w-[46%] z-5 pointer-events-none"
                style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
            >
                <motion.div
                    className="relative h-full w-full"
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                >
                    <img
                        src={`https://images.meigen.ai/generations/2026-07/a543b085-dc25-4ed3-94e2-b091bacab9a8.webp`}
                        alt="Manas Jha portrait"
                        className="absolute inset-0 w-full h-full object-cover object-top md:object-[center_15%]"
                    />

                    {/* Scroll-driven scan line echoing the portrait's red beam */}
                    <motion.div
                        className="absolute inset-0 bg-linear-to-t from-[#131313] via-[#131313]/20 to-transparent"
                        style={{
                            top: scanLineY,
                            opacity: scanGlow,
                        }}
                    />

                    {/* Soft edge blend into background */}
                    <div className="absolute inset-0 bg-linear-to-r from-ink via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/30" />
                </motion.div>
            </motion.div>

            {/* Left text column */}
            <div className="relative z-10 flex flex-col justify-between flex-1 w-full">
                <motion.div
                    className="pt-[19vh] w-full md:w-[50%] lg:w-[44%] flex flex-col items-start text-left"
                    style={{ y: textY }}
                >
                    {/* Eyebrow */}
                    <div className="overflow-hidden flex mb-6 md:mb-8">
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                            className="flex items-center gap-2 group cursor-pointer"
                            data-cursor="hover"
                        >
                            {/* <Dot className="w-1.5 h-1.5 rounded-full text-accent bg-accent animate-ping" /> */}
                            <span className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-semibold text-accent">
                                <LineDotRightHorizontal /> Frontend Developer
                            </span>
                            <span className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-semibold text-accent">
                                <LineDotRightHorizontal /> UI Designer
                            </span>
                        </motion.div>
                    </div>

                    {/* Title */}
                    <div className="w-full font-display leading-[0.80] uppercase tracking-tighter">
                        <div className="overflow-hidden py-1 select-none">
                            <motion.h1
                                className="text-[17vw] md:text-[11vw] lg:text-[9vw] font-bold tracking-tighter text-paper"
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.9, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            >
                                MANAS
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden py-1 select-none">
                            <motion.h1
                                className="text-[17vw] md:text-[11vw] lg:text-[9vw] font-bold tracking-tighter text-transparent"
                                style={{ WebkitTextStroke: '1.5px #efeee9' }}
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.9, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
                            >
                                JHA
                            </motion.h1>
                        </div>
                    </div>

                    {/* Subtitle */}
                    <motion.div
                        className="mt-6 md:mt-8 max-w-sm md:max-w-md"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        <p className="font-sans text-xs md:text-sm text-muted leading-relaxed tracking-wider font-light">
                            Building responsive web apps with react, tailwind & shadcn/ui. currently exploring full-stack integration.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Bottom CTAs */}
                <div className="w-full md:w-[50%] lg:w-[44%] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-paper/10 pt-6 mt-8">
                    <div className="flex gap-4">
                        <motion.a
                            href="#projects"
                            className="px-6 py-2.5 bg-accent text-paper text-xs font-sans font-medium uppercase tracking-widest hover:bg-neutral-800 transition-colors duration-300 rounded-[3px]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            data-cursor="hover"
                        >
                            View Work ↗
                        </motion.a>

                        <motion.a
                            href="#contact"
                            className="px-6 py-2.5 border border-paper/20 text-paper text-xs font-sans font-medium uppercase tracking-widest hover:border-accent transition-colors duration-300 rounded-[3px]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            data-cursor="hover"
                        >
                            Contact
                        </motion.a>
                    </div>

                    <span className="font-sans text-xs tracking-widest opacity-40 lowercase">
                        scroll to explore · based in india
                    </span>
                </div>
            </div>
        </section>
    );
};
