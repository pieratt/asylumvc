'use client';

import React, { useState, useEffect } from 'react';

// XS version of the header (mobile)
const XSHeader: React.FC<{ handlePageChange: (page: string) => void, currentPage: string }> = ({ handlePageChange, currentPage }) => (
  <div className="flex flex-col items-center space-y-4">
    {/* ASYLUM logo */}

    <h1 className="text-sm mt-4 mb-8 tracking-widest w-2/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
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
    <div className="w-full text-sm">
      <div className="flex  w-5/5 justify-between">
        <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>ASYLUM VENTURES</p>
        <p><a href="https://x.com/nchirls" target="_blank" rel="noopener noreferrer">NICK CHIRLS</a></p>
      </div>
      <div className="flex justify-between">
        <p>WEIRD INSIDE™</p>
        <p><a href="https://x.com/jonwu_" target="_blank" rel="noopener noreferrer">JON WU</a></p>
      </div>
      <div className="flex justify-between">
        <p>EST. 2024</p>
        <p><a href="https://x.com/kenzieregent" target="_blank" rel="noopener noreferrer">MACKENZIE REGENT</a></p>
      </div>
      <div className="flex justify-between">
        <p>BROOKLYN, NY</p>
        <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">GET IN TOUCH</p>
      </div>
    </div>
  </div>
);

// SM version of the header
const SMHeader: React.FC<{ handlePageChange: (page: string) => void, currentPage: string }> = ({ handlePageChange, currentPage }) => (
    <div className="flex flex-col items-center space-y-4">
        {/* ASYLUM logo */}
        <h1 className="text-sm mt-4 mb-8 tracking-widest w-1/3 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
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
        <div className="w-full text-sm">
            <div className="flex  w-5/5 justify-between">
                <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>ASYLUM VENTURES</p>
                <p><a href="https://x.com/nchirls" target="_blank" rel="noopener noreferrer">NICK CHIRLS</a></p>
            </div>
            <div className="flex justify-between">
                <p>WEIRD INSIDE™</p>
                <p><a href="https://x.com/jonwu_" target="_blank" rel="noopener noreferrer">JON WU</a></p>
            </div>
            <div className="flex justify-between">
                <p>EST. 2024</p>
                <p><a href="https://x.com/kenzieregent" target="_blank" rel="noopener noreferrer">MACKENZIE REGENT</a></p>
            </div>
            <div className="flex justify-between">
                <p>BROOKLYN, NY</p>
                <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">GET IN TOUCH</p>
            </div>
        </div>
    </div>
);

// MD version of the header
const MDHeader: React.FC<{ handlePageChange: (page: string) => void, currentPage: string }> = ({ handlePageChange, currentPage }) => (
  <div className="flex justify-between items-start">
    {/* Left meta information */}
    <div className="text-sm text-left w-1/3">

      <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>ASYLUM VENTURES</p>
      <p>WEIRD INSIDE™</p>
      <p>EST. 2024</p>
      <p>BROOKLYN, NY</p>
    </div>
    {/* ASYLUM logo */}
    <h1 className="text-sm tracking-widest w-1/3 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
      <div className="grid grid-cols-6 grid-rows-4">
        <span className="col-start-6 row-start-2">L</span>
        <span className="col-start-5 row-start-1">S</span>
        <span className="col-start-4 row-start-4">M</span>
        <span className="col-start-3 row-start-3">U</span>
        <span className="col-start-2 row-start-2">Y</span>
        <span className="col-start-1 row-start-1">A</span>
      </div>
    </h1>
    {/* Right meta information */}
    <div className="text-sm text-right w-1/3">

      <p><a href="https://x.com/nchirls" target="_blank" rel="noopener noreferrer">NICK CHIRLS</a></p>
      <p><a href="https://x.com/jonwu_" target="_blank" rel="noopener noreferrer">JON WU</a></p>
      <p><a href="https://x.com/kenzieregent" target="_blank" rel="noopener noreferrer">MACKENZIE REGENT</a></p>
      <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">GET IN TOUCH</p>
    </div>
  </div>
);

// LG version of the header
const LGHeader: React.FC<{ handlePageChange: (page: string) => void, currentPage: string }> = ({ handlePageChange, currentPage }) => (
  <div className="flex justify-between items-start">
    {/* Left meta information */}
    <div className="text-sm text-left w-1/4">

      <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>ASYLUM VENTURES</p>
      <p>WEIRD INSIDE™</p>
      <p>EST. 2024</p>
      <p>BROOKLYN, NY</p>
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

      <p><a href="https://x.com/nchirls" target="_blank" rel="noopener noreferrer">NICK CHIRLS</a></p>
      <p><a href="https://x.com/jonwu_" target="_blank" rel="noopener noreferrer">JON WU</a></p>
      <p><a href="https://x.com/kenzieregent" target="_blank" rel="noopener noreferrer">MACKENZIE REGENT</a></p>
      <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">GET IN TOUCH</p>
    </div>
  </div>
);

// XL version of the header
const XLHeader: React.FC<{ handlePageChange: (page: string) => void, currentPage: string }> = ({ handlePageChange, currentPage }) => (
  <div className="flex justify-between items-start mx-auto w-full">
    {/* Left meta information */}
    <div className="text-sm text-center w-1/5">
      <p className="cursor-pointer hover:underline" onClick={() => handlePageChange('main')}>Asylum Ventures</p>
      <p>Weird Inside™</p>
      <p>Est. 2024</p>
      <p>Brooklyn, NY</p>
    </div>
    {/* ASYLUM logo */}
    <h1 className="text-sm tracking-widest w-1/5 text-center cursor-pointer" onClick={() => handlePageChange('main')}>
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
    <div className="text-sm text-center w-1/5">

      <p><a href="https://x.com/nchirls" target="_blank" rel="noopener noreferrer">NICK CHIRLS</a></p>
      <p><a href="https://x.com/jonwu_" target="_blank" rel="noopener noreferrer">JON WU</a></p>
      <p><a href="https://x.com/kenzieregent" target="_blank" rel="noopener noreferrer">MACKENZIE REGENT</a></p>
      <p onClick={() => handlePageChange('contact')} className="cursor-pointer hover:underline">GET IN TOUCH</p>
    </div>
  </div>
);

// Breakpoint indicator component
const BreakpointIndicator: React.FC<{ breakpoint: string }> = ({ breakpoint }) => (
  <div className="fixed bottom-0 right-0 bg-black bg-opacity-50 text-white text-sm p-1 z-50">
    {breakpoint}
  </div>
);

// Main Header component
const Header: React.FC<{ handlePageChange: (page: string) => void, currentPage: string }> = ({ handlePageChange, currentPage }) => {
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
    if (isXS) return <XSHeader handlePageChange={handlePageChange} currentPage={currentPage} />;
    if (isSM) return <SMHeader handlePageChange={handlePageChange} currentPage={currentPage} />;
    if (isMD) return <MDHeader handlePageChange={handlePageChange} currentPage={currentPage} />;
    if (isLG) return <LGHeader handlePageChange={handlePageChange} currentPage={currentPage} />;
    return <XLHeader handlePageChange={handlePageChange} currentPage={currentPage} />;
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