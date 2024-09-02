'use client';

import React, { useState, useEffect } from 'react';

// XS version of the header (mobile)
const XSHeader: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
    <div className="flex flex-col items-center space-y-4">
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-full cursor-pointer" onClick={() => setCurrentPage('main')}>
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
        <div className="text-sm text-center space-y-0.5">
            <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
            <p>WEIRD INSIDE™</p>
            <p>EST. 2024</p>
            <p>BROOKLYN, NY</p>
        </div>
        {/* Bottom meta information */}
        <div className="text-sm text-center space-y-0.5">
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
        <h1 className="text-sm tracking-widest w-full pt-20 cursor-pointer" onClick={() => setCurrentPage('main')}>
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
        <div className="text-sm text-center space-y-0.5">
            <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
            <p>WEIRD INSIDE™</p>
            <p>EST. 2024</p>
            <p>BROOKLYN, NY</p>
        </div>
        {/* Bottom meta information */}
        <div className="text-sm text-center space-y-0.5">
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
        <div className="w-1/4 text-sm space-y-1 text-center">
            <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
            <p>WEIRD INSIDE™</p>
            <p>EST. 2024</p>
            <p>BROOKLYN, NY</p>
        </div>
        {/* ASYLUM logo */}
        <h1 className="text-sm tracking-widest w-1/2 text-center cursor-pointer" onClick={() => setCurrentPage('main')}>
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
        <div className="w-1/4 text-sm space-y-1 text-center">
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
    <div className="text-sm text-left w-1/4">

      <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>ASYLUM VENTURES</p>
      <p>WEIRD INSIDE™</p>
      <p>EST. 2024</p>
      <p>BROOKLYN, NY</p>
    </div>
    {/* ASYLUM logo */}
    <h1 className="text-sm tracking-widest w-3/4 text-center cursor-pointer" onClick={() => setCurrentPage('main')}>
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

      <p>NICK CHIRLS</p>
      <p>JON WU</p>
      <p>MACKENZIE REGENT</p>
      <p onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
    </div>
  </div>
);

// XL version of the header
const XLHeader: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => (
  <div className="flex justify-between items-start mx-auto w-full">
    {/* Left meta information */}
    <div className="text-sm text-left w-1/5">
      <p className="cursor-pointer hover:underline" onClick={() => setCurrentPage('main')}>Asylum Ventures</p>
      <p>Weird Inside™</p>
      <p>Est. 2024</p>
      <p>Brooklyn, NY</p>
    </div>
    {/* ASYLUM logo */}
    <h1 className="text-sm tracking-widest w-4/5 text-center cursor-pointer" onClick={() => setCurrentPage('main')}>
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
    <div className="text-sm text-right w-1/5">

      <p>Nick Chirls</p>
      <p>Jon Wu</p>
      <p>Mackenzie Regent</p>
      <p onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:underline">Contact Us</p>
    </div>
  </div>
);

// Breakpoint indicator component
const BreakpointIndicator: React.FC<{ breakpoint: string }> = ({ breakpoint }) => (
  <div className="fixed top-0 left-0 bg-black bg-opacity-50 text-white text-sm p-1 z-50">
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