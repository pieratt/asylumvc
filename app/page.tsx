'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const AsylumLandingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('main');

    const togglePage = (page: string) => {
        setCurrentPage(currentPage === page ? 'main' : page);
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'contact':
                return <ContactForm />;
            default:
                return <MainContent />;
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="p-4 md:p-8 lg:p-12 pb-36 flex justify-center relative z-10">
                <div className="max-w-[1440px] p-4 md:p-8 lg:p-12 w-full rounded-lg mt-5" style={{
                    background: 'radial-gradient(circle at 50% 100%, #EBFFCC 2%, #BAECFF 20%, #E2DCEF 85%)',
                }}>
                    <Head>
                        <title>Asylum Ventures</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <main className="flex flex-col items-center pt-2">
                        <div className="content">
                            <Header setCurrentPage={togglePage} />
                            {renderContent()}
                        </div>
                        <Footer setCurrentPage={togglePage} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AsylumLandingPage;