
import React from 'react';
import VendorManagement from '../components/VendorManagement';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <VendorManagement />
      </main>
    </div>
  );
};

export default Index;
