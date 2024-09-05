'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const AsylumLandingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('main');

    const handlePageChange = (page: string) => {
        setCurrentPage(prev => prev === page ? 'main' : page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'contact':
                return <ContactForm />;
            default:
                return <MainContent handlePageChange={handlePageChange} />;
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="sm:p-2 md:p-8 lg:p-12 pb-36 flex justify-center relative z-10">
                <div className="max-w-[1440px] p-2 sm:p-1 md:p-8 lg:p-12 w-full rounded-lg mt-5" style={{
                    background: '#F2F2F0',
                }}>
                    <Head>
                        <title>Asylum Ventures</title>
                        <link rel="icon" href="/icon.ico" />
                    </Head>
                    <main className="flex flex-col items-center">
                        <div className="content">
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