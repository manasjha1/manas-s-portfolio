import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface SkillRow {
    id: string;
    num: string;
    name: string;
    details: string;
    codeSnippet: string;
}

export const Capabilities: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress through capabilities section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    // Map scroll progress to subtle vertical translation for interactive feel
    const yTranslate = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    const skillRows: SkillRow[] = [
        {
            id: 'frontend',
            num: '01',
            name: 'Frontend Engineering',
            details: 'React.js, component-based architectures, hooks, custom state management (Context API), and optimized rendering loops.',
            codeSnippet: `const useProjects = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setData);
  }, []);
  return useMemo(() => data, [data]);
};`
        },
        {
            id: 'styling',
            num: '02',
            name: 'Styling Systems',
            details: 'Tailwind CSS v4 styling, shadcn/ui library customizations, responsive layout design, and smooth CSS transitions/animations.',
            codeSnippet: `@theme {
  --color-accent: #c24f20;
  --color-ink: #0b0b0b;
}
.button-custom {
  @apply bg-accent text-paper px-6 py-2 rounded-[3px] transition-all;
}`
        },
        {
            id: 'fundamentals',
            num: '03',
            name: 'Core Web Fundamentals',
            details: 'ES6+ JavaScript (async/await, promises, fetch), semantic HTML5 components, and cross-browser CSS styling standards.',
            codeSnippet: `async function fetchWeatherData(city) {
  try {
    const url = \`$/api/weather?q=\${city}\`;
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}`
        },
        {
            id: 'backend',
            num: '04',
            name: 'Backend Familiarity',
            details: 'Growing competence in Node.js server building, Express.js middleware REST handlers, and basic MongoDB CRUD queries.',
            codeSnippet: `const express = require('express');
const app = express();
app.use(express.json());
app.post('/api/contact', (req, res) => {
  const { email, message } = req.body;
  res.status(201).json({ sent: true });
});`
        },
        {
            id: 'workflow',
            num: '05',
            name: 'Tooling & Workflow',
            details: 'Git branching version control, GitHub projects collaboration, continuous deployment via Vercel integration, and VS Code configurations.',
            codeSnippet: `git checkout -b feature/interactive-nav
git add .
git commit -m "feat: implement header scroll"
git push origin feature/interactive-nav`
        }
    ];

    const [activeSnippet, setActiveSnippet] = useState<string | null>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section
            ref={containerRef}
            id="skills"
            className="w-full bg-[#101010] text-paper px-6 py-24 md:py-36 relative overflow-hidden"
        >
            {/* Decorative abstract elements */}
            <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-acid/5 blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-left w-full border-b border-paper/10 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-accent leading-none">
                            03 / EXPERTISE
                        </span>
                        <h2 className="font-display font-bold text-4xl md:text-6xl uppercase tracking-tighter">
                            CAPABILITIES
                        </h2>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-neutral-400 max-w-sm">
                        Technical skills developed by building actual applications, resolving design challenges, and applying modern frameworks.
                    </p>
                </div>

                {/* Capabilities Content Grid */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                    style={{ y: yTranslate }}
                >

                    {/* Row list of skills (Sizes: span 7) */}
                    <div className="lg:col-span-7 flex flex-col w-full border-t border-paper/10">
                        {skillRows.map((row, idx) => (
                            <div
                                key={row.id}
                                className="w-full border-b border-paper/10 py-6 md:py-8 flex flex-col group cursor-crosshair text-left relative overflow-hidden"
                                onMouseEnter={() => {
                                    setActiveSnippet(row.codeSnippet);
                                    setHoveredIdx(idx);
                                }}
                                onMouseLeave={() => {
                                    setActiveSnippet(null);
                                    setHoveredIdx(null);
                                }}
                                data-cursor="hover"
                            >
                                {/* Custom backdrop hover scale reveal */}
                                <div className="absolute inset-0 bg-neutral-900/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0 pointer-events-none" />

                                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    {/* Left block */}
                                    <div className="flex items-start gap-4">
                                        <span className="font-display text-sm md:text-base font-semibold text-accent opacity-60">
                                            {row.num}
                                        </span>
                                        <div className="flex flex-col gap-2 max-w-md">
                                            <h3 className="font-display font-medium text-xl md:text-2xl uppercase tracking-wider text-paper group-hover:text-acid transition-colors duration-300">
                                                {row.name}
                                            </h3>
                                            <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                                                {row.details}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Cross sign */}
                                    <div className="hidden md:block self-center mr-4">
                                        <div className="w-5 h-5 flex items-center justify-center relative">
                                            <span className="absolute w-3.5 h-[1.5px] bg-paper/55 group-hover:bg-acid group-hover:rotate-90 transition-transform duration-500" />
                                            <span className="absolute w-[1.5px] h-3.5 bg-paper/55 group-hover:bg-acid group-hover:rotate-90 transition-transform duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Snippet Preview container (Sizes: span 5) */}
                    <div className="lg:col-span-5 w-full h-80 md:h-112.5 sticky top-37.5 pointer-events-none hidden lg:block">
                        <AnimatePresence mode="wait">
                            {activeSnippet ? (
                                <motion.div
                                    key={hoveredIdx}
                                    className="w-full h-full bg-[#161616] border border-paper/10 p-6 flex flex-col justify-between font-mono text-[11px] md:text-xs leading-relaxed text-paper/80 shadow-2xl relative"
                                    initial={{ opacity: 0, scale: 0.95, rotate: -4 }}
                                    animate={{ opacity: 1, scale: 1, rotate: -3 }}
                                    exit={{ opacity: 0, scale: 0.95, rotate: -4 }}
                                    transition={{ duration: 0.25 }}
                                    style={{ transformOrigin: 'center center' }}
                                >
                                    {/* Top Bar window decorations */}
                                    <div className="flex justify-between items-center border-b border-paper/5 pb-3 mb-4 w-full">
                                        <div className="flex items-center space-x-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-paper/15" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-paper/15" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-paper/15" />
                                        </div>
                                        <span className="text-[10px] uppercase font-sans tracking-widest text-paper/30">
                                            snippet.ts
                                        </span>
                                    </div>

                                    {/* Pre content block */}
                                    <pre className="flex-1 overflow-x-auto select-none overflow-y-hidden text-left py-2 font-mono scrollbar-none">
                                        <code className="text-muted">
                                            {activeSnippet}
                                        </code>
                                    </pre>

                                    {/* Bottom bar */}
                                    <div className="flex justify-between items-center border-t border-paper/5 pt-3 mt-4 w-full text-[9px] uppercase font-sans tracking-widest text-accent">
                                        <span>source script code</span>
                                        <span>manas.dev &copy;</span>
                                    </div>
                                </motion.div>
                            ) : (
                                // Elegant empty state matching styling rules
                                <motion.div
                                    className="w-full h-full border border-dashed border-paper/15 flex flex-col items-center justify-center p-8 select-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg className="w-12 h-12 text-paper/20 stroke-1 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                    </svg>
                                    <span className="font-display font-medium text-xs text-paper/45 uppercase tracking-wider text-center">
                                        hover over capabilities to inspect code execution
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};
