'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const AsylumLandingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('main');

    const handlePageChange = (page: string) => {
        setCurrentPage(prev => prev === page ? 'main' : page);
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
            <div className="sm:p-4 md:p-8 lg:p-12 pb-36 flex justify-center relative z-10">
                <div className="max-w-[1440px] min-w-[440px] p-2 sm:p-4 md:p-8 lg:p-12 w-full rounded-lg mt-5" style={{
                    background: 'radial-gradient(circle at 50% 100%, #F2F2F0 2%, #F2F2F0 20%, #F2F2F0 85%)',
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