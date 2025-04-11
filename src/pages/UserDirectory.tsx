
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import UserSearch from '@/components/user-directory/UserSearch';
import UserSearchResults from '@/components/user-directory/UserSearchResults';
import { Button } from '@/components/ui/button';
import { SavedSearches } from '@/components/user-directory/SavedSearches';
import ListBoard from '@/components/vendor/ListBoard';
import { toast } from 'sonner';

const UserDirectory = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'saved'>('new');
  const [vendorLists, setVendorLists] = useState([
    { id: '1', name: 'My Translators', vendorCount: 5 },
    { id: '2', name: 'Proofreaders', vendorCount: 3, parentId: '1' },
    { id: '3', name: 'Preferred Vendors', vendorCount: 8 }
  ]);
  const [currentList, setCurrentList] = useState(vendorLists[0]);
  
  const handleInviteClick = () => {
    toast.info("Invite vendor feature coming soon");
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-4">
        <div className="bg-proz-board text-white py-2 px-4 flex items-center mb-4">
          <h1 className="text-lg font-medium">ProZ.com Filters</h1>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Left panel - Search filters */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="border rounded-md bg-white">
              <div className="flex border-b">
                <Button
                  variant="ghost"
                  className={`flex-1 rounded-none ${activeTab === 'new' ? 'proz-tab active' : 'proz-tab'}`}
                  onClick={() => setActiveTab('new')}
                >
                  New Search
                </Button>
                <Button
                  variant="ghost"
                  className={`flex-1 rounded-none ${activeTab === 'saved' ? 'proz-tab active' : 'proz-tab'}`}
                  onClick={() => setActiveTab('saved')}
                >
                  <span className="text-red-600 mr-1">●</span> Saved Searches
                </Button>
              </div>
              
              <div className="p-3">
                {activeTab === 'new' ? (
                  <UserSearch />
                ) : (
                  <SavedSearches />
                )}
              </div>
            </div>
          </div>
          
          {/* Center panel - Search results */}
          <div className="col-span-12 md:col-span-8 lg:col-span-6">
            <div className="border rounded-md bg-white h-full p-4">
              <UserSearchResults />
            </div>
          </div>
          
          {/* Right panel - List board */}
          <div className="hidden lg:block lg:col-span-3">
            <ListBoard 
              lists={vendorLists}
              currentList={currentList}
              setCurrentList={setCurrentList}
              onInviteClick={handleInviteClick}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDirectory;
