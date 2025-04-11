
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDirectoryPage = location.pathname === '/directory';
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isDirectoryPage && <Header />}
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      {!isDirectoryPage && <Footer />}
    </div>
  );
};
