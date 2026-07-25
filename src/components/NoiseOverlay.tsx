import React from 'react';

export const NoiseOverlay: React.FC = () => {
    return (
        <>
            <svg className="sr-only" aria-hidden="true">
                <filter id="n">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.07 0" />
                </filter>
            </svg>
            <div
                className="noise-overlay"
                style={{
                    filter: 'url(#n)',
                    backgroundImage: 'radial-gradient(circle, rgba(239,238,233,0) 0%, rgba(11,11,11,0.05) 100%)'
                }}
            />
        </>
    );
};
