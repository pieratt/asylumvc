'use client';

import React, { useState, useEffect } from 'react';

// XS version of the footer (mobile)
const XSFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex flex-col items-centerspace-y-4">
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-full text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_7_black.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto mb-12" />
            </div>
        </h1>
        {/* Meta information */}
        <div className="text-sm text-center w-3/5 mx-auto">
            <p className="underline"><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" >@asylumventures</a></p>
            <p className="underline mb-10"><a href="mailto:hello@asylum.vc" >hello@asylum.vc</a></p>
            <p>"Being good in business is the most fascinating kind of art.” - Andy Warhol</p>
        </div>
    </div>
);

// SM version of the footer
const SMFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex flex-col items-centerspace-y-4">
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-full text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_7_black.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto mb-12" />
            </div>
        </h1>
{/* Meta information */}
        <div className="text-sm text-center w-3/5 mx-auto">
            <p className="underline"><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" >@asylumventures</a></p>
            <p className="underline mb-10"><a href="mailto:hello@asylum.vc" >hello@asylum.vc</a></p>
            <p>"Being good in business is the most fascinating kind of art.” - Andy Warhol</p>
        </div>
    </div>
);

// MD version of the footer
const MDFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-2/5">
            <p></p>
            <p className="underline"><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" >@asylumventures</a></p>
            <p className="underline mb-10"><a href="mailto:hello@asylum.vc" >hello@asylum.vc</a></p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-4/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_7_black.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto" />
            </div>
        </h1>
        {/* Right meta information */}
        <div className="text-sm text-right w-2/5">
            <p>"Being good in business is the most fascinating kind of art.” - Andy Warhol</p>
        </div>
    </div>
);

// LG version of the footer
const LGFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-2/5">
            <p></p>
            <p className="underline"><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" >@asylumventures</a></p>
            <p className="underline mb-10"><a href="mailto:hello@asylum.vc" >hello@asylum.vc</a></p>
            <p></p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-4/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_7_black.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto" />
            </div>
        </h1>
        {/* Right meta information */}
        <div className="text-sm text-right w-2/5">
            <p>"Being good in business is the most fascinating kind of art.” - Andy Warhol</p>
        </div>
    </div>
);

// XL version of the header
const XLFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-2/5">
            <p></p>
            <p className="underline"><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" >@asylumventures</a></p>
            <p className="underline mb-10"><a href="mailto:hello@asylum.vc" >hello@asylum.vc</a></p>
           <p></p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-4/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_7_black.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto" />
            </div>
        </h1>
        {/* Right meta information */}
        <div className="text-sm text-right w-2/5">
            <p>"Being good in business is the most fascinating kind of art.” - Andy Warhol</p>
        </div>
    </div>
);

// Breakpoint indicator component
const BreakpointIndicator: React.FC<{ breakpoint: string }> = ({ breakpoint }) => (
    <div className="fixed bottom-0 right-0 bg-black bg-opacity-50 text-white text-sm p-1 z-50">
        {breakpoint}
    </div>
);

// Main Footer component
const Footer: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            if (width < 480) setCurrentBreakpoint('XS');
            else if (width < 640) setCurrentBreakpoint('SM');
            else if (width < 768) setCurrentBreakpoint('MD');
            else if (width < 1024) setCurrentBreakpoint('LG');
            else setCurrentBreakpoint('XL');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isXS = windowWidth < 480;
    const isSM = windowWidth >= 480 && windowWidth < 640;
    const isMD = windowWidth >= 640 && windowWidth < 768;
    const isLG = windowWidth >= 768 && windowWidth < 1024;
    const isXL = windowWidth >= 1024;

    const renderFooter = () => {
        if (isXS) return <XSFooter handlePageChange={handlePageChange} />;
        if (isSM) return <SMFooter handlePageChange={handlePageChange} />;
        if (isMD) return <MDFooter handlePageChange={handlePageChange} />;
        if (isLG) return <LGFooter handlePageChange={handlePageChange} />;
        return <XLFooter handlePageChange={handlePageChange} />;
    };

    return (
        <>
            <BreakpointIndicator breakpoint={currentBreakpoint} />
            <footer className="mt-12 w-full">
                {renderFooter()}
            </footer>
        </>
    );
};

export default Footer;