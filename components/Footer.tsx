'use client';

import React, { useState, useEffect } from 'react';

// XS version of the footer (mobile)
const XSFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex flex-col items-centerspace-y-4">
        {/* ASYLUM logo */}
        <h1 className="text-sm px-24 pb-12 tracking-widest w-full text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="grid grid-cols-6 grid-rows-4">
                <span className="col-start-1 row-start-1">A</span>
                <span className="col-start-3 row-start-2">Y</span>
                <span className="col-start-2 row-start-4">S</span>
                <span className="col-start-5 row-start-3">U</span>
                <span className="col-start-5 row-start-2">L</span>
                <span className="col-start-6 row-start-4">M</span>
            </div>
        </h1>
        {/* Meta information */}
        <div className="text-sm text-center w-3/5 mx-auto">
            <p><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">@asylumventures</a></p>
            <p className="mb-10"><a href="mailto:hello@asylum.vc" className="no-underline hover:underline">hello@asylum.vc</a></p>
            <p>"Being good in business is the most fascinating kind of art." - Andy Warhol</p>
        </div>
    </div>
);

// SM version of the footer
const SMFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex flex-col items-centerspace-y-4">
        {/* ASYLUM logo */}

        <h1 className="text-sm px-24 pb-12 tracking-widest w-full text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="grid grid-cols-6 grid-rows-4">
                <span className="col-start-2 row-start-1">A</span>
                <span className="col-start-5 row-start-2">Y</span>
                <span className="col-start-3 row-start-2">S</span>
                <span className="col-start-1 row-start-3">L</span>
                <span className="col-start-4 row-start-4">U</span>
                <span className="col-start-6 row-start-5">M</span>
            </div>
        </h1>

{/* Meta information */}
        <div className="text-sm text-center w-3/5 mx-auto">
            <p><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">@asylumventures</a></p>
            <p className="mb-10"><a href="mailto:hello@asylum.vc" className="no-underline hover:underline">hello@asylum.vc</a></p>
            <p>"Being good in business is the most fascinating kind of art." - Andy Warhol</p>
        </div>
    </div>
);

// MD version of the footer
const MDFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-1/4">
            <p></p>
            <p><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">@asylumventures</a></p>
            <p className="mb-10"><a href="mailto:hello@asylum.vc" className="no-underline hover:underline">hello@asylum.vc</a></p>
            <p></p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-1/4 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="grid grid-cols-6 grid-rows-4">
                <span className="col-start-1 row-start-1">A</span>
                <span className="col-start-3 row-start-2">Y</span>
                <span className="col-start-2 row-start-4">S</span>
                <span className="col-start-5 row-start-3">U</span>
                <span className="col-start-5 row-start-2">L</span>
                <span className="col-start-6 row-start-4">M</span>
            </div>
        </h1>
        {/* Right meta information */}
        <div className="text-sm text-right w-1/4">
            <p>"Being good in business is the most fascinating kind of art." - Andy Warhol</p>
        </div>
    </div>
);

// LG version of the footer
const LGFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-1/4">
            <p></p>
            <p><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">@asylumventures</a></p>
            <p className="mb-10"><a href="mailto:hello@asylum.vc" className="no-underline hover:underline">hello@asylum.vc</a></p>
            <p></p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-1/4 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="grid grid-cols-6 grid-rows-4">
                <span className="col-start-2 row-start-1">A</span>
                <span className="col-start-5 row-start-1">S</span>
                <span className="col-start-3 row-start-2">Y</span>
                <span className="col-start-1 row-start-3">L</span>
                <span className="col-start-4 row-start-3">U</span>
                <span className="col-start-6 row-start-4">M</span>
            </div>
        </h1>
        {/* Right meta information */}
        <div className="text-sm text-right w-1/4">
            <p>"Being good in business is the most fascinating kind of art." - Andy Warhol</p>
        </div>
    </div>
);

// XL version of the header
const XLFooter: React.FC<{ handlePageChange: (page: string) => void }> = ({ handlePageChange }) => (
    <div className="flex justify-between items-start mx-auto w-full">
        {/* Left meta information */}
        <div className="text-sm text-left w-1/5">
            <p></p>
            <p><a href="https://x.com/asylumventures" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">@asylumventures</a></p>
            <p className="mb-10"><a href="mailto:hello@asylum.vc" className="no-underline hover:underline">hello@asylum.vc</a></p>
           <p></p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-1/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
            <div className="grid grid-cols-6 grid-rows-4">
                <span className="col-start-1 row-start-1">A</span>
                <span className="col-start-6 row-start-1">S</span>
                <span className="col-start-6 row-start-2">Y</span>
                <span className="col-start-1 row-start-4">L</span>
                <span className="col-start-2 row-start-3">U</span>
                <span className="col-start-4 row-start-2">M</span>
            </div>
        </h1>
        {/* Right meta information */}
        <div className="text-sm text-center w-1/5">
            <p>"Being good in business is the most fascinating kind of art." - Andy Warhol</p>
        </div>
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
        <footer className="mt-12 w-full">
            {renderFooter()}
        </footer>
    );
};

export default Footer;