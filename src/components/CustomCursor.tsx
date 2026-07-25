import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState('');
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isMobile, setIsMobile] = useState(true);

    // Motion values for raw coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring configurations for lerped motion
    const springConfig = { damping: 30, stiffness: 250, mass: 0.6 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Check if tablet/mobile (screen width < 900px)
        const checkDevice = () => {
            const mobile = window.innerWidth < 900;
            setIsMobile(mobile);
            if (mobile) setIsVisible(false);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        if (isMobile) return;

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Track mouse over interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Look up parent chain for cursor attributes
            const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
            if (cursorTarget) {
                const type = cursorTarget.getAttribute('data-cursor') || 'hover';
                setCursorVariant(type);
                const label = cursorTarget.getAttribute('data-cursor-label') || '';
                setCursorText(label);
                return;
            }

            // Check if it is a link or button
            const interactiveTarget = target.closest('a, button, [role="button"]') as HTMLElement | null;
            if (interactiveTarget) {
                setCursorVariant('hover');
                setCursorText('');
                return;
            }

            // Reset to default
            setCursorVariant('default');
            setCursorText('');
        };

        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, isVisible, isMobile]);

    if (isMobile || !isVisible) return null;

    interface CursorStyle {
        width: number;
        height: number;
        backgroundColor: string;
        borderColor: string;
        borderWidth?: number;
        mixBlendMode?: 'difference' | 'normal';
    }

    // Variants for cursor styling
    const variants: Record<string, CursorStyle> = {
        default: {
            width: 14,
            height: 14,
            backgroundColor: 'var(--accent)',
            borderColor: 'transparent',
        },
        hover: {
            width: 50,
            height: 50,
            backgroundColor: 'transparent',
            borderColor: 'var(--ink)',
            borderWidth: 1.5,
        },
        project: {
            width: 96,
            height: 96,
            backgroundColor: 'var(--acid)',
            borderColor: 'transparent',
            mixBlendMode: 'difference',
        },
        link: {
            width: 82,
            height: 82,
            backgroundColor: 'var(--accent)',
            borderColor: 'transparent',
        }
    };

    const activeVariant = variants[cursorVariant] || variants.default;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center text-center z-200"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
                willChange: 'transform, width, height, background-color',
                borderStyle: 'solid',
                mixBlendMode: cursorVariant === 'project' ? 'difference' : 'normal',
            }}
            animate={{
                width: activeVariant.width,
                height: activeVariant.height,
                backgroundColor: activeVariant.backgroundColor,
                borderColor: activeVariant.borderColor,
                borderWidth: activeVariant.borderWidth || 0,
            }}
            transition={{
                width: { type: 'spring', stiffness: 200, damping: 25 },
                height: { type: 'spring', stiffness: 200, damping: 25 },
                backgroundColor: { duration: 0.15 },
                borderColor: { duration: 0.15 },
            }}
        >
            {cursorText && (
                <span className="text-ink font-display font-medium text-xs leading-none uppercase tracking-widest pointer-events-none select-none">
                    {cursorText}
                </span>
            )}
        </motion.div>
    );
};
