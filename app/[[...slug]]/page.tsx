'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Header = dynamic(() => import('../../components/Header'), { ssr: false });
const MainContent = dynamic(() => import('../../components/MainContent'), { ssr: false });
const ContactForm = dynamic(() => import('../../components/ContactForm'), { ssr: false });

const LoadingPlaceholder = () => (
  <div className="w-full h-[800px] flex items-center justify-center">
    <p className="text-2xl font-montserrat">Loading...</p>
  </div>
);

const PageTransition: React.FC<{ children: React.ReactNode; currentPage: string }> = ({ children, currentPage }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full min-h-[800px]" // Adjust this height as needed
            >
                <Suspense fallback={<LoadingPlaceholder />}>
                    {children}
                </Suspense>
            </motion.div>
        </AnimatePresence>
    );
};

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
        <>
            <div className="fixed inset-0 bg-gradient-to-b from-[#DBEFDA] via-[#DEE8E7] to-[#F5F4E6] -z-10"></div>
            <div className="min-h-screen p-4 md:p-8 lg:p-12 flex justify-center">
                <div className="max-w-[1900px] w-full">
                    <Head>
                        <title>Asylum Ventures</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <main className="flex flex-col items-center">
                        <Header setCurrentPage={togglePage} />

                        <PageTransition currentPage={currentPage}>
                            {renderContent()}
                        </PageTransition>

                        <footer className="py-20 mt-12 w-full font-monsterrat">
                            <div className="flex justify-between">
                                <div className="w-full text-s space-y-1 text-center">
                                    <p>ASYLUM VENTURES</p>
                                    <p>WEIRD INSIDE™</p>
                                    <p>EST. 2024</p>
                                    <p>BROOKLYN, NY</p>
                                    <p onClick={() => togglePage('contact')} className="cursor-pointer hover:underline">CONTACT US</p>
                                </div>
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AsylumLandingPage;