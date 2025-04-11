
import React, { useState, useEffect } from 'react';
import { Star, Edit, Folder, Plus, Send, Trash2, MoveRight, Pencil, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getVendorLists, getVendors, addVendor, removeVendor } from '../lib/db';

const VendorManagement = () => {
  const [activeTab, setActiveTab] = useState('lists');
  const [lists, setLists] = useState<any[]>([]);
  const [currentList, setCurrentList] = useState<any>({
    id: '123', 
    name: 'Another banger',
    vendors: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newVendorName, setNewVendorName] = useState('');
  
  // Fetch vendor lists
  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would call the API
        // const listsData = await getVendorLists();
        // For demo, we'll use mock data
        const listsData = [
          { id: '123', name: 'Another banger', vendorCount: 0 },
          { id: '456', name: 'Sublist', vendorCount: 0 }
        ];
        setLists(listsData);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
      setIsLoading(false);
    };
    
    fetchLists();
  }, []);
  
  // Fetch vendors for the current list
  useEffect(() => {
    const fetchVendors = async () => {
      if (!currentList.id) return;
      
      setIsLoading(true);
      try {
        // In a real app, this would call the API
        // const vendorsData = await getVendors(currentList.id);
        // For demo, we'll use mock data
        const vendorsData: any[] = [];
        setCurrentList(prev => ({ ...prev, vendors: vendorsData }));
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
      setIsLoading(false);
    };
    
    fetchVendors();
  }, [currentList.id]);
  
  const handleAddVendor = async () => {
    if (!newVendorName || !currentList.id) return;
    
    try {
      // In a real app, this would call the API
      // await addVendor(currentList.id, { name: newVendorName });
      // For demo, we'll just update the local state
      const newVendor = { id: Date.now().toString(), name: newVendorName };
      setCurrentList(prev => ({
        ...prev,
        vendors: [...prev.vendors, newVendor]
      }));
      setNewVendorName('');
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Vendor management lists</h1>
        <p className="text-gray-700 mb-4">
          Manage your search for language professionals at ProZ.com. Organize candidates into lists and folders and track your correspondence.{' '}
          <a href="#" className="text-blue-600 hover:underline">Learn more.</a>
        </p>
        
        {/* Tabs */}
        <div className="border-b border-gray-300 mb-6">
          <div className="flex">
            <button 
              className={`px-4 py-2 border-t border-l border-r rounded-t-md ${activeTab === 'lists' ? 'proz-tab active' : 'proz-tab'}`}
              onClick={() => setActiveTab('lists')}
            >
              Lists
            </button>
            <button 
              className={`px-4 py-2 border-t border-l border-r rounded-t-md ${activeTab === 'about' ? 'proz-tab active' : 'proz-tab'}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button 
              className={`px-4 py-2 border-t border-l border-r rounded-t-md ${activeTab === 'help' ? 'proz-tab active' : 'proz-tab'}`}
              onClick={() => setActiveTab('help')}
            >
              <span className="text-blue-600">?</span> Help
            </button>
            <button 
              className={`px-4 py-2 border-t border-l border-r rounded-t-md ${activeTab === 'survey' ? 'proz-tab active' : 'proz-tab'}`}
              onClick={() => setActiveTab('survey')}
            >
              <span className="text-blue-600">✓</span> Survey
            </button>
          </div>
        </div>
        
        {/* List name and editor */}
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-medium mr-2">List name: {currentList.name}</h2>
          <button className="text-blue-600">
            <Pencil size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - List Board */}
          <div className="md:col-span-1">
            <div className="bg-proz-purple text-white px-4 py-2 flex items-center justify-between mb-2 rounded-t-md">
              <div className="flex items-center">
                <span className="mr-2">☰</span>
                <span>List Board</span>
              </div>
              <button className="bg-proz-purple text-white px-2 py-1 rounded flex items-center">
                Invite Vendor <Users size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="border border-gray-300 rounded-b-md p-4">
              <input 
                type="text" 
                className="proz-input mb-4"
                placeholder="Type a name for the new list and click enter"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Handle create new list
                    setNewListName('');
                  }
                }}
              />
              
              <div className="space-y-2">
                {lists.map((list) => (
                  <div 
                    key={list.id} 
                    className={`flex items-center justify-between p-2 rounded ${currentList.id === list.id ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setCurrentList(list)}
                  >
                    <div className="flex items-center">
                      <button className="mr-2 text-gray-400">±</button>
                      <span>{list.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-yellow-500">
                        <Star size={16} />
                      </button>
                      <button className="text-blue-500">
                        <Edit size={16} />
                      </button>
                      <span className="bg-purple-800 text-white px-2 py-0.5 rounded-full text-xs">
                        {list.vendorCount || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Middle Column - Vendor List */}
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-300 rounded-md">
              <div className="flex justify-between items-center p-3 border-b border-gray-300">
                <div className="flex items-center gap-2">
                  <button className="text-yellow-500">
                    <Star size={16} />
                  </button>
                  <button className="text-gray-500">
                    <Users size={16} />
                  </button>
                  <span>0</span>
                  <button className="text-gray-500">⋮</button>
                </div>
                <button className="bg-gray-200 text-gray-700 p-1 rounded">
                  <span className="sr-only">Settings</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </button>
              </div>
              
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold">0 talents</span>
                  <button className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md flex items-center">
                    <Plus size={16} className="mr-1" /> Add talent
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">1 Folder</span>
                  <button className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md flex items-center">
                    <Plus size={16} className="mr-1" /> Add subfolder
                  </button>
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-300">
                <div className="flex items-center gap-2 mb-3">
                  <span>Select talents and...</span>
                  <button className="text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md flex items-center">
                    <Send size={16} className="mr-1" /> Send message
                  </button>
                  <button className="text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md flex items-center">
                    <Trash2 size={16} className="mr-1" /> Remove from list
                  </button>
                  <button className="text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md flex items-center">
                    <MoveRight size={16} className="mr-1" /> Move to subfolder <span className="ml-1">▼</span>
                  </button>
                  <button className="text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md flex items-center">
                    <span className="mr-1">✓</span> Post a Job
                  </button>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-md flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  </div>
                  <div>
                    Click "Add talent" above to add people to this list.
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-300">
                <div className="flex items-center mb-2">
                  <h3 className="font-bold text-purple-900">Enter name for ne</h3>
                  <span className="ml-2 text-purple-900">◉</span>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-md">
                  <p className="text-gray-500">No talents yet. Drag and drop talents here.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Message Board */}
          <div className="md:col-span-1">
            <div className="bg-proz-purple text-white px-4 py-2 flex items-center rounded-t-md">
              <span className="mr-2">✉</span>
              <span>Message Board (0)</span>
            </div>
            
            <div className="border border-gray-300 rounded-b-md p-4 bg-white">
              <div className="flex border-b border-gray-300 mb-4">
                <button className="px-4 py-2 border-b-2 border-purple-800 font-medium">
                  <span className="mr-1">✉</span> Inbox
                </button>
                <button className="px-4 py-2 text-gray-600">
                  <span className="mr-1">→</span> Sent
                </button>
                <button className="px-4 py-2 text-gray-600">
                  <span className="mr-1">📁</span> Archived
                </button>
                <button className="px-4 py-2 text-gray-600">
                  <span className="mr-1">▤</span> Sent
                </button>
              </div>
              
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-600">There are no messages for this list.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
