'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const AsylumLandingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('main');
    const pageTopRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (page: string) => {
        setCurrentPage(prev => prev === page ? 'main' : page);
    };

    useEffect(() => {
        if (pageTopRef.current) {
            pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    const renderContent = () => {
        switch (currentPage) {
            case 'contact':
                return <ContactForm />;
            default:
                return <MainContent handlePageChange={handlePageChange} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#F2F2F0]">
            <div ref={pageTopRef} /> {/* Add this line */}
            <div className="flex-grow sm:p-2 md:p-8 lg:p-12 pb-36 flex justify-center relative z-10">
                <div className="max-w-[1440px] p-2 sm:p-1 md:p-8 lg:p-12 w-full rounded-lg mt-5 flex flex-col">
                    <Head>
                        <title>Asylum Ventures</title>
                        <link rel="icon" href="/icon.ico" />
                    </Head>
                    <main className="flex-grow flex flex-col items-center">
                        <div className="content w-full">
                            <Header handlePageChange={handlePageChange} currentPage={currentPage} />
                            {renderContent()}
                        </div>
                        <Footer handlePageChange={handlePageChange} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AsylumLandingPage;