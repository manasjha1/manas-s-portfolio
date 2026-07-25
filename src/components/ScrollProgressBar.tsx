import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
    const { scrollYProgress } = useScroll();

    // Spring drive for smooth scroll bar translation
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="scroll-progress"
            style={{ scaleX }}
        />
    );
};
