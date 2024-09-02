'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const AsylumLandingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('main');
    const [activeFounder, setActiveFounder] = useState<string | null>(null);

    const handlePageChange = (page: string, founder: string | null = null) => {
        if (currentPage === 'contact' && page === 'contact') {
            if (founder === activeFounder) {
                // If clicking the same founder or general contact, return to main page
                setCurrentPage('main');
                setActiveFounder(null);
            } else {
                // If clicking a different founder, update the active founder
                setActiveFounder(founder);
            }
        } else {
            // For any other case, update the page and founder as before
            setCurrentPage(page);
            setActiveFounder(founder);
        }
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'contact':
                return <ContactForm activeFounder={activeFounder} />;
            default:
                return <MainContent />;
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="sm:p-4 md:p-8 lg:p-12 pb-36 flex justify-center relative z-10">
                <div className="max-w-[1440px] p-2 sm:p-4 md:p-8 lg:p-12 w-full rounded-lg mt-5" style={{
                    background: 'radial-gradient(circle at 50% 100%, #EBFFCC 2%, #BAECFF 20%, #E2DCEF 85%)',
                }}>
                    <Head>
                        <title>Asylum Ventures</title>
                        <link rel="icon" href="/favicon.ico" />
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