import React from 'react';
import { motion } from 'framer-motion';

export const Engagement: React.FC = () => {
    const cards = [
        {
            num: '01',
            title: 'Open to Internships',
            desc: 'Actively seeking frontend or developer internship opportunities. Perfect for teams wanting dedicated React capabilities, fast learning, and high commitment.',
            details: 'Available for immediate remote roles or Delhi-NCR hybrids. Committed to shipping clean components, fixing design bugs, and writing structured code.',
            theme: 'light',
            cta: 'Request Resume ↗',
            link: 'https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com&su=Resume%20Request&body=Hi%20Manas%2C%0A%0AI%20would%20like%20to%20request%20your%20latest%20resume.%0A%0AThanks%2C',
        },
        {
            num: '02',
            title: 'Freelance & Contract',
            desc: 'Available for standalone project builds. Recreating premium web layouts, building landing pages, frontend dashboards, and resolving UI bugs using React & Tailwind.',
            details: 'Flexible hours, project-tied deliverables. Focusing on semantic layouts, Framer Motion transitions, and fully functional API dashboard tools.',
            theme: 'light',
            cta: 'Hire as Freelancer ↗',
            link: 'mailto:manasjha384@gmail.com?subject=Freelance%20Project%20Inquiry&body=Hi%20Manas,%0A%0AI%20am%20interested%20in%20working%20with%20you%20on%20a%20freelance%20project.%0A%0AProject%20details:%0A%0ARegards,',
        },
        {
            num: '03',
            title: 'Full-Time (2029+)',
            desc: 'Long-term objective: full-stack software engineer. Contributing to production-scale platforms after graduating BCA in 2029.',
            details: 'Deepening JS engineering foundations, studying data systems, and mastering node service layer routing until graduation. Building real apps.',
            theme: 'dark',
            cta: 'Connect for Future Role ↗',
            link: 'mailto:manasjha384@gmail.com?subject=Future%20Job%20Opportunity&body=Hi%20Manas,%0A%0AI%20would%20like%20to%20connect%20with%20you%20regarding%20a%20potential%20future%20opportunity.%0A%0ACompany:%0ARole:%0A%0ARegards,',
        },
    ];

    return (
        <section
            id="engagement"
            className="w-full bg-paper text-ink px-6 py-24 md:py-36 global-border-hairline border-b overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">

                {/* Header Title */}
                <div className="text-left w-full border-b border-ink/15 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
                    <div className="flex flex-col gap-2">
                        <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-accent leading-none">
                            04 / AVAILABILITY
                        </span>
                        <h2 className="font-display font-medium text-4xl md:text-6xl uppercase tracking-tighter">
                            WAYS TO WORK
                        </h2>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-muted max-w-xs">
                        Available routes to leverage my skills. whether immediate projects or long-term growth planning, lets collaborate.
                    </p>
                </div>

                {/* Hover Expand Plans Grid */}
                <div className="flex flex-col md:flex-row md:items-stretch gap-6 w-full mt-16 min-h-120">
                    {cards.map((card) => {
                        const isDark = card.theme === 'dark';
                        return (
                            <motion.div
                                key={card.num}
                                className={`flex-1 flex flex-col justify-between p-8 border cursor-pointer select-none transition-colors duration-500 rounded-[3px] shadow-sm hover:shadow-xl relative overflow-hidden ${isDark
                                    ? 'bg-[#111] text-paper border-paper/10'
                                    : 'bg-paper text-ink border-ink/10'
                                    }`}
                                whileHover={{
                                    flexGrow: 1.32,
                                    borderColor: isDark ? 'var(--acid)' : 'var(--accent)'
                                }}
                                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                                data-cursor="link"
                            >
                                {/* Decorative visual glow for dark card */}
                                {isDark && (
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-acid/10 rounded-full blur-2xl pointer-events-none" />
                                )}

                                {/* Top Part */}
                                <div className="flex flex-col gap-8 text-left relative z-10">
                                    <div className="flex justify-between items-baseline border-b pb-4 w-full border-current opacity-80">
                                        <span className="font-display text-base font-semibold">
                                            {card.num}
                                        </span>
                                        <span className="font-sans text-[10px] uppercase tracking-widest font-medium">
                                            {isDark ? 'future expansion' : 'immediate availability'}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <h3 className="font-display font-medium text-2xl uppercase tracking-wider">
                                            {card.title}
                                        </h3>
                                        <p className={`font-sans text-sm font-light leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Details part */}
                                <div className="flex flex-col items-start gap-8 text-left mt-8 relative z-10 w-full pt-6 border-t border-dashed border-current/20">
                                    <p className={`font-sans text-xs leading-relaxed opacity-75 font-light`}>
                                        {card.details}
                                    </p>

                                    <motion.a
                                        href={card.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`w-full py-3.5 text-center text-xs font-sans uppercase font-bold tracking-widest transition-colors duration-300 rounded-[3px] border ${isDark
                                            ? 'bg-acid text-ink border-acid hover:bg-transparent hover:text-acid'
                                            : 'bg-ink text-paper border-ink hover:bg-transparent hover:text-ink'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        data-cursor="hover"
                                    >
                                        {card.cta}
                                    </motion.a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};
