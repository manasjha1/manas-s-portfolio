import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Project {
    number: string;
    title: string;
    description: string;
    tech: string[];
    tag: string;
    liveUrl: string;
    sourceCode: string;
    imageSrc: string;
    fallbackGradient: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
    total: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const inView = useInView(cardRef, { once: true, margin: "-10% 0px" });
    const [imageError, setImageError] = useState(false);
    const isEven = index % 2 === 0;
    const isLast = index === total - 1;

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"], // tracks as this card scrolls under the next one
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
    const rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, isLast ? 0 : index % 2 === 0 ? -4 : 4]
    );
    const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.5]);

    const stickyTopOffset = 180 + index * 24;

    return (
        <div
            ref={cardRef}
            className={`relative w-full ${isLast ? "mb-12" : "mb-28 md:mb-36"}`}
        >
            <motion.div
                className="sticky w-full"
                style={{
                    top: `${stickyTopOffset}px`,
                    zIndex: (index + 1) * 10,
                }}
            >
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center rounded-lg p-6 md:p-10 bg-paper border border-ink/15 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                    style={{
                        scale,
                        rotate,
                        opacity,
                    }}
                    initial={{ opacity: 0, y: 60 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Media column */}
                    <motion.div
                        className={`lg:col-span-7 relative group cursor-pointer ${isEven ? "lg:order-1" : "lg:order-2"}`}
                        data-cursor="project"
                        data-cursor-label="Open ↗"
                    >
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block w-full"
                        >
                            <div className="relative w-full aspect-16/10 bg-neutral-900 overflow-hidden shadow-2xl rounded-[3px] border border-ink/10 group">
                                {!imageError ? (
                                    <img
                                        src={project.imageSrc}
                                        alt={project.title}
                                        onError={() => setImageError(true)}
                                        className="w-fit h-full object-cover grayscale contrast-[1.05] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full text-paper flex flex-col justify-between p-6 md:p-8 relative"
                                        style={{ background: project.fallbackGradient }}
                                    >
                                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(239,238,233,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(239,238,233,0.15)_1px,transparent_1px)] bg-size-[30px_30px]" />

                                        <div className="flex justify-between items-center relative z-10 w-full">
                                            <div className="flex items-center space-x-2">
                                                <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-60" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-60" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-60" />
                                            </div>
                                            <span className="font-sans text-[10px] uppercase tracking-widest text-paper/40">
                                                local-dashboard-preview.dev
                                            </span>
                                        </div>

                                        <div className="my-auto text-left relative z-10 flex flex-col gap-4">
                                            <span className="font-display font-medium text-4xl block uppercase tracking-tight">
                                                {project.title}
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-2 py-0.5 border border-paper/20 font-sans text-[10px] uppercase tracking-wider text-paper/70"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end relative z-10 w-full">
                                            <span className="text-[10px] font-sans uppercase tracking-widest text-acid font-semibold">
                                                {project.tag}
                                            </span>
                                            <span className="text-[11px] font-sans uppercase tracking-widest text-paper/50 flex items-center gap-1 group-hover:text-accent transition-colors duration-300">
                                                VISIT SOURCE CODE{" "}
                                                <span className="transform group-hover:translate-x-1 duration-300">
                                                    →
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                    <span className="px-8 py-3 bg-acid text-ink font-display font-semibold uppercase tracking-wider text-sm rounded-[3px] shadow-lg shadow-black/20">
                                        Open case ↗
                                    </span>
                                </div>
                            </div>
                        </a>
                    </motion.div>

                    {/* Meta column */}
                    <div
                        className={`lg:col-span-5 flex flex-col items-start text-left ${isEven ? "lg:order-2" : "lg:order-1"}`}
                    >
                        <span className="font-display font-medium text-xs text-accent uppercase tracking-widest leading-none mb-4">
                            {project.number} / {project.tag}
                        </span>

                        <h3 className="font-display font-medium text-2xl md:text-3xl uppercase tracking-wider text-ink mb-4 select-none">
                            {project.title}
                        </h3>

                        <p className="font-sans text-sm md:text-base text-ink font-light leading-relaxed mb-6 opacity-80">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-3 py-1 bg-ink/5 font-sans text-xs uppercase tracking-wider font-medium text-ink/75"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        <motion.a
                            href={project.sourceCode}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest border-b border-ink/40 pb-1"
                            whileHover={{ scale: 1.05 }}
                            data-cursor="hover"
                        >
                            <span>View GitHub Repository</span>
                            <span className="inline-block transform group-hover:translate-x-1 duration-300">
                                ↗
                            </span>
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export const SelectedWork: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const projects: Project[] = [
        {
            number: "01",
            title: "Cart Handling App",
            description:
                "A full-featured e-commerce style shopping cart module. Supports responsive grid items, add/remove functions, real-time quantity adjustments, price calculations, and component state persistence.",
            tech: ["React.js", "Tailwind CSS", "shadcn/ui", "React Router"],
            tag: "E-Commerce Cart Application",
            liveUrl: "https://cart-handling-app.vercel.app/",
            sourceCode: "https://github.com/manasjha1/Cart-Handling-app",
            imageSrc: "https://i.pinimg.com/1200x/28/b2/ba/28b2ba509812a363ef01a2dbf951d8ad.jpg",
            fallbackGradient: "linear-gradient(135deg, #c24f20 0%, #0b0b0b 100%)",
        },
        {
            number: "02",
            title: "Todo App",
            description:
                "A polished task management application with filter layouts (All/Active/Completed), empty state details, and local backup, deployed via custom Vercel pipelines directly from GitHub.",
            tech: ["React.js", "Tailwind CSS", "shadcn/ui", "Vercel"],
            tag: "Productivity",
            liveUrl: "https://todo-app-c31x.vercel.app/",
            sourceCode: "https://github.com/manasjha1/Todo_app",
            imageSrc: "https://i.pinimg.com/736x/18/4d/7d/184d7dff91dd056d7725d9f9027cece1.jpg",
            fallbackGradient: "linear-gradient(135deg, #d7ff45 0%, #0b0b0b 100%)",
        },
        {
            number: "03",
            title: "Weather Application",
            description:
                "Interactive dashboard checking real-time elements using OpenWeatherMap REST calls. Includes custom async loaders, API error notifications, and high-fidelity layouts styled in glassmorphism.",
            tech: ["React.js", "Vite", "OpenWeather API", "Tailwind"],
            tag: "API Integration",
            liveUrl: "https://manasjha1.github.io/weather-app/",
            sourceCode: "https://github.com/manasjha1/weather-app",
            imageSrc: "src/assets/weatherApp.png",
            fallbackGradient: "linear-gradient(135deg, #5b5b54 0%, #0b0b0b 100%)",
        },
    ];

    return (
        <section
            ref={containerRef}
            id="projects"
            className="relative w-full bg-paper text-ink px-6 pt-16 pb-24 md:pt-24 md:pb-36 global-border-hairline border-b"
        >
            <div className="max-w-7xl mx-auto">
                {/* Sticky Heading Container */}
                <div className="sticky top-16 md:top-20 z-50 py-4 md:py-6 mb-8 md:mb-16 transition-all duration-300 flex flex-col md:flex-row md:items-end justify-between">
                    <div>
                        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-accent leading-none block mb-2">
                            02 / PORTFOLIO
                        </span>
                        <h2 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-ink leading-none">
                            SELECTED WORK
                        </h2>
                    </div>
                    <div className="hidden md:flex items-center space-x-2 text-xs font-sans uppercase tracking-widest opacity-60 mt-2 md:mt-0">
                        <span>Featured Projects ({projects.length})</span>
                    </div>
                </div>

                {/* Projects List */}
                <div className="relative">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={project.number}
                            project={project}
                            index={idx}
                            total={projects.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

