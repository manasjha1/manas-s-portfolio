import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchiveItem {
    id: string;
    category: string;
    title: string;
    date: string;
    source: string;
    summary: string;
    iconBg: string;
}

export const Archive: React.FC = () => {
    const archiveItems: ArchiveItem[] = [
        {
            id: 'node-sys',
            category: 'Backend development',
            title: 'Node.js & Express API Architectures',
            date: 'ACTIVE STUDY',
            source: 'GitHub repos',
            summary: 'Exploring backend services, request routers, async middleware validations, and writing modular rest controller routes.',
            iconBg: 'bg-accent',
        },
        {
            id: 'mongo-db',
            category: 'Database systems',
            title: 'MongoDB Schema Design & CRUD operations',
            date: 'ACTIVE STUDY',
            source: 'Local sandbox',
            summary: 'Setting up schema validators, mongoose hooks, and modeling document relationships for web products.',
            iconBg: 'bg-neutral-800',
        },
        {
            id: 'fluid-grids',
            category: 'Design principles',
            title: 'Headless UI Design Systems & Fluid Layouts',
            date: 'COMPLETED IN LAB',
            source: 'CSS modules',
            summary: 'Replicating complex grid layouts, clip-paths, and implementing consistent modular scale systems.',
            iconBg: 'bg-[#d7ff45]',
        },
        {
            id: 'dsa-logic',
            category: 'Problem solving',
            title: 'Algorithms & Core JavaScript Data Structs',
            date: 'CONTINUOUS',
            source: 'LeetCode routines',
            summary: 'Reviewing arrays, objects structures, recursive loops, sorting, and complexity metrics for clean logic paths.',
            iconBg: 'bg-neutral-600',
        },
    ];

    const [hoveredItem, setHoveredItem] = useState<ArchiveItem | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        // Relative position track
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section
            id="archive"
            className="w-full bg-paper text-ink px-6 py-24 md:py-36 global-border-hairline border-b relative"
            onMouseMove={handleMouseMove}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Title */}
                <div className="text-left w-full border-b border-ink/15 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
                    <div className="flex flex-col gap-2">
                        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-accent leading-none">
                            05 / LOGBOOK
                        </span>
                        <h2 className="font-display font-medium text-4xl md:text-6xl uppercase tracking-tighter">
                            LEARNING LOG
                        </h2>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-muted max-w-xs">
                        A log of core subjects currently studying, small sandboxes, and structural experiments completed.
                    </p>
                </div>

                {/* Row Table list */}
                <div className="w-full flex flex-col mt-8 border-t border-ink/10 relative">
                    {archiveItems.map((item) => (
                        <div
                            key={item.id}
                            className="w-full border-b border-ink/10 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between text-left group cursor-pointer relative overflow-hidden transition-all duration-300"
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                            data-cursor="hover"
                        >
                            {/* Row hover block transition */}
                            <motion.div
                                className="absolute inset-0 bg-acid z-0 origin-bottom"
                                initial={{ scaleY: 0 }}
                                whileHover={{ scaleY: 1 }}
                                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                            />

                            {/* Group columns layout */}
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full">

                                {/* Topic / Category (span 3) */}
                                <div className="md:col-span-3 flex items-center gap-3">
                                    <span className={`w-2.5 h-2.5 rounded-full ${item.iconBg} border border-ink/20`} />
                                    <span className="font-sans text-[11px] uppercase tracking-wider text-muted font-semibold group-hover:text-ink transition-colors duration-300">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Title (span 6) */}
                                <div className="md:col-span-6">
                                    <h3 className="font-display font-medium text-lg md:text-xl uppercase tracking-wide text-ink group-hover:pl-2 transition-all duration-300 select-none">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Source (span 2) */}
                                <div className="md:col-span-2 hidden md:block">
                                    <span className="font-sans text-xs lowercase text-muted group-hover:text-ink transition-colors duration-300">
                                        {item.source}
                                    </span>
                                </div>

                                {/* Date (span 1) */}
                                <div className="md:col-span-1 text-left md:text-right">
                                    <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-accent group-hover:text-ink transition-colors duration-300">
                                        {item.date}
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))}

                    {/* Hover dynamic Preview follow mouse inside bounds (Tablet/Desktop only) */}
                    <div className="hidden lg:block pointer-events-none">
                        <AnimatePresence>
                            {hoveredItem && (
                                <motion.div
                                    className="absolute w-80 bg-ink text-paper p-5 shadow-2xl rounded-[3px] border border-paper/10 z-150 flex flex-col gap-4 text-left"
                                    initial={{ opacity: 0, scale: 0.85, y: -20 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: mousePosition.x + 80,
                                        y: mousePosition.y - 280, // Offset above cursor
                                    }}
                                    exit={{ opacity: 0, scale: 0.85, y: -20 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 30,
                                        opacity: { duration: 0.15 },
                                    }}
                                    style={{
                                        left: 0,
                                        top: 0,
                                        transform: 'translate3d(0,0,0)',
                                    }}
                                >
                                    <div className="flex justify-between items-center border-b border-paper/10 pb-2 w-full text-[9px] uppercase tracking-widest text-acid font-semibold font-sans">
                                        <span>{hoveredItem.category}</span>
                                        <span>preview info</span>
                                    </div>

                                    <p className="font-sans text-xs leading-relaxed text-neutral-300 font-light">
                                        {hoveredItem.summary}
                                    </p>

                                    <div className="text-[10px] tracking-wider text-muted font-mono flex items-center justify-between border-t border-paper/10 pt-2 mt-1">
                                        <span>SOURCE: {hoveredItem.source}</span>
                                        <span>&copy; M.J</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    );
};
