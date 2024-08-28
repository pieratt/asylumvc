'use client';

import React, { useState, useEffect } from 'react';

// XS version of the header (mobile)
const XSHeader: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
    <div className="flex flex-col items-center space-y-4">
        {/* ASYLUM logo */}
        <h1 className="text-3xl font-bold tracking-widest w-full font-montserrat cursor-pointer" onClick={() => setCurrentPage('main')}>
            <div className="asylum-logo flex-col">
                <div className="asylum-logo">
                    <span>A</span>
                    <span>S</span>
                    <span>Y</span>
                </div>
                <div className="asylum-logo py-20"> 
                    <span>L</span>
                    <span>U</span>
                    <span>M</span>
                </div>
            </div>
        </h1>
        {/* Top meta information */}
        <div className="text-xs text-center space-y-0.5 font-montserrat leading-tight">
            <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
            <p>WEIRD INSIDE™</p>
            <p>EST. 2024</p>
            <p>BROOKLYN, NY</p>
        </div>
        {/* Bottom meta information */}
        <div className="text-xs text-center space-y-0.5 font-montserrat leading-tight">
            <p>NICK CHIRLS</p>
            <p>JON WU</p>
            <p>MACKENZIE REGENT</p>
            <p onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
        </div>
    </div>
);

// SM version of the header
const SMHeader: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
    <div className="flex flex-col items-centerspace-y-4">
        {/* ASYLUM logo */}
        <h1 className="text-3xl font-bold tracking-widest w-full pt-20 font-montserrat cursor-pointer" onClick={() => setCurrentPage('main')}>
            <div className="asylum-logo flex-col">
                <div className="asylum-logo">
                    <span>A</span>
                    <span>S</span>
                    <span>Y</span>
                </div>
                <div className="asylum-logo py-20"> 
                    <span>L</span>
                    <span>U</span>
                    <span>M</span>
                </div>
            </div>
        </h1>
        {/* Top meta information */}
        <div className="text-xs text-center space-y-0.5 font-montserrat leading-tight">
            <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
            <p>WEIRD INSIDE™</p>
            <p>EST. 2024</p>
            <p>BROOKLYN, NY</p>
        </div>
        {/* Bottom meta information */}
        <div className="text-xs text-center space-y-0.5 font-montserrat leading-tight">
            <p>NICK CHIRLS</p>
            <p>JON WU</p>
            <p>MACKENZIE REGENT</p>
            <p onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
        </div>
    </div>
);

// MD version of the header
const MDHeader: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
    <div className="flex justify-between items-start">
        {/* Left meta information */}
        <div className="w-1/4 text-xs space-y-1 text-center font-montserrat">
            <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
            <p>WEIRD INSIDE™</p>
            <p>EST. 2024</p>
            <p>BROOKLYN, NY</p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-3xl font-bold tracking-widest w-1/2 text-center font-montserrat cursor-pointer" onClick={() => setCurrentPage('main')}>
            <div className="asylum-logo pt-5 pb-1">
                <span>A</span>
                <span>S</span>
                <span>Y</span>
            </div>
            <div className="asylum-logo py-20"> 
                <span>L</span>
                <span>U</span>
                <span>M</span>
            </div>
        </h1>
        {/* Right meta information */}
        <div className="w-1/4 text-xs space-y-1 text-center font-montserrat">
            <p>NICK CHIRLS</p>
            <p>JON WU</p>
            <p>MACKENZIE REGENT</p>
            <p onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
        </div>
    </div>
);

// LG version of the header
const LGHeader: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
  <div className="flex justify-between items-start">
    {/* Left meta information */}
        <div className="w-1/4 text-xs space-y-1 text-center font-montserrat">
      <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
      <p>WEIRD INSIDE™</p>
      <p>EST. 2024</p>
      <p>BROOKLYN, NY</p>
    </div>
    {/* ASYLUM logo */}
        <h1 className="text-3xl font-bold tracking-widest w-1/2 text-center font-montserrat cursor-pointer" onClick={() => setCurrentPage('main')}>
      <div className="asylum-logo">
        <span>A</span>
        <span>S</span>
        <span>Y</span>

        <span>L</span>
        <span>U</span>
        <span>M</span>
      </div>
    </h1>
    {/* Right meta information */}
        <div className="w-1/4 text-xs space-y-1 text-center font-montserrat">
      <p>NICK CHIRLS</p>
      <p>JON WU</p>
      <p>MACKENZIE REGENT</p>
      <p onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
    </div>
  </div>
);

// XL version of the header
const XLHeader: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
  <div className="flex justify-between items-start">
    {/* Left meta information */}
        <div className="w-1/6 text-sm space-y-2 text-center font-montserrat">
      <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
      <p>WEIRD INSIDE™</p>
      <p>EST. 2024</p>
      <p>BROOKLYN, NY</p>
    </div>
    {/* ASYLUM logo */}
        <h1 className="text-3xl font-bold tracking-widest w-2/3 text-center font-montserrat cursor-pointer" onClick={() => setCurrentPage('main')}>
      <div className="asylum-logo pt-8">
        <span>A</span>
        <span>S</span>
        <span>Y</span>

        <span>L</span>
        <span>U</span>
        <span>M</span>
      </div>
    </h1>
    {/* Right meta information */}
        <div className="w-1/6 text-sm space-y-2 text-center font-montserrat">
      <p>NICK CHIRLS</p>
      <p>JON WU</p>
      <p>MACKENZIE REGENT</p>
      <p onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
    </div>
  </div>
);

// Breakpoint indicator component
const BreakpointIndicator: React.FC<{ breakpoint: string }> = ({ breakpoint }) => (
  <div className="fixed top-0 left-0 bg-black bg-opacity-50 text-white text-xs p-1 z-50">
    {breakpoint}
  </div>
);

// Main Header component
const Header: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
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

  const renderHeader = () => {
    if (isXS) return <XSHeader setCurrentPage={setCurrentPage} />;
    if (isSM) return <SMHeader setCurrentPage={setCurrentPage} />;
    if (isMD) return <MDHeader setCurrentPage={setCurrentPage} />;
    if (isLG) return <LGHeader setCurrentPage={setCurrentPage} />;
    return <XLHeader setCurrentPage={setCurrentPage} />;
  };

  return (
    <>
      <BreakpointIndicator breakpoint={currentBreakpoint} />
      <header className="mb-12 w-full">
        {renderHeader()}
      </header>
    </>
  );
};

export default Header;