
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VendorManagement from '../components/VendorManagement';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <VendorManagement />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
