'use client';

import React, { useState, useEffect } from 'react';

// XS version of the footer (mobile)
const XSFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex flex-col items-centerspace-y-4">
        {/* ASYLUM logo */}

        <h1 className="text-sm mt-4 mb-16 tracking-widest w-5/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_6.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto" />
            </div>
        </h1>
        {/* Meta information */}
        <div className="w-full text-sm">
            <div className="flex  w-5/5 justify-between">
                <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>ASYLUM VENTURES</p>
                <p>NICK CHIRLS</p>
            </div>
            <div className="flex justify-between">
                <p>WEIRD INSIDE™</p>
                <p>JON WU</p>
            </div>
            <div className="flex justify-between">
                <p>EST. 2024</p>
                <p>MACKENZIE REGENT</p>
            </div>
            <div className="flex justify-between">
                <p>BROOKLYN, NY</p>
                <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
            </div>
        </div>
    </div>
);

// SM version of the footer
const SMFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex flex-col items-centerspace-y-4">
        {/* Meta information */}
        <div className="w-full text-sm">
            <div className="flex  w-full justify-between">
                <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>ASYLUM VENTURES</p>
                <p>NICK CHIRLS</p>
            </div>
            <div className="flex justify-between">
                <p>WEIRD INSIDE™</p>
                <p>JON WU</p>
            </div>
            <div className="flex justify-between">
                <p>EST. 2024</p>
                <p>MACKENZIE REGENT</p>
            </div>
            <div className="flex justify-between">
                <p>BROOKLYN, NY</p>
                <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
            </div>
        </div>
        {/* ASYLUM logo */}

        <h1 className="text-sm mt-16 mb-16 tracking-widest w-full text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_6.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto" />
            </div>
        </h1>
    </div>
);

// MD version of the footer
const MDFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-1/5">
            <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>Asylum Ventures</p>
            <p>Weird Inside™</p>
            <p>Est. 2024</p>
            <p>Brooklyn, NY</p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-4/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_6.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto" />
            </div>
        </h1>
        {/* Right meta information */}
        <div className="text-sm text-right w-1/5">

            <p>Nick Chirls</p>
            <p>Jon Wu</p>
            <p>Mackenzie Regent</p>
            <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">Contact Us</p>
        </div>
    </div>
);

// LG version of the footer
const LGFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-1/5">
            <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>Asylum Ventures</p>
            <p>Weird Inside™</p>
            <p>Est. 2024</p>
            <p>Brooklyn, NY</p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-4/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_6.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto" />
            </div>
        </h1>
        {/* Right meta information */}
        <div className="text-sm text-right w-1/5">

            <p>Nick Chirls</p>
            <p>Jon Wu</p>
            <p>Mackenzie Regent</p>
            <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">Contact Us</p>
        </div>
    </div>
);

// XL version of the header
const XLFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-2/5">
            <p></p>
            <p></p>
            <p>hello@asylum.vc</p>
            <p>@asylumventures</p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-4/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="flex justify-center w-full">
                <img src="/asylum_logo_6.png" alt="Asylum Logo" className="mx-auto max-h-[128px] w-auto" />
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