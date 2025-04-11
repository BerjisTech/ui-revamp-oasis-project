
import React, { useState, useEffect } from 'react';
import { Star, Edit, Folder, Plus, Send, Trash2, MoveRight, Pencil, Users, Info, HelpCircle, CheckCircle } from 'lucide-react';
import { getVendorLists, getVendors, addVendor, removeVendor } from '../lib/db';
import { toast } from 'sonner';

const VendorManagement = () => {
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
        toast.error('Failed to load vendor lists');
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
        toast.error('Failed to load vendors');
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
      toast.success('Vendor added successfully');
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast.error('Failed to add vendor');
    }
  };

  const handleCreateList = () => {
    if (!newListName) return;
    
    const newList = {
      id: Date.now().toString(),
      name: newListName,
      vendorCount: 0
    };
    
    setLists(prev => [...prev, newList]);
    setNewListName('');
    toast.success('List created successfully');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-proz-purple">Vendor management lists</h1>
        <p className="text-gray-700 mb-6">
          Manage your search for language professionals at ProZ.com. Organize candidates into lists and folders and track your correspondence.{' '}
          <a href="#" className="text-blue-600 hover:underline">Learn more.</a>
        </p>
        
        {/* List name and editor */}
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-medium mr-2 text-gray-800">List name: {currentList.name}</h2>
          <button className="text-blue-600 hover:bg-blue-50 p-1 rounded-full transition-colors">
            <Pencil size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - List Board */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-r from-proz-purple to-proz-purpleLight text-white px-4 py-3 flex items-center justify-between mb-2 rounded-t-md shadow-sm">
              <div className="flex items-center font-medium">
                <span className="mr-2">☰</span>
                <span>List Board</span>
              </div>
              <button className="bg-white/20 text-white px-3 py-1 rounded-md flex items-center text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors">
                Invite Vendor <Users size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-b-md p-4 bg-white shadow-sm">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proz-purple/50 focus:border-proz-purple transition-colors"
                  placeholder="Type a name for the new list"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateList();
                    }
                  }}
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-proz-purple"
                  onClick={handleCreateList}
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="space-y-1">
                {lists.map((list) => (
                  <div 
                    key={list.id} 
                    className={`flex items-center justify-between p-2 rounded transition-colors ${currentList.id === list.id ? 'bg-purple-100 border-l-4 border-proz-purple' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                    onClick={() => setCurrentList(list)}
                  >
                    <div className="flex items-center">
                      <button className="mr-2 text-gray-400 hover:text-gray-600">±</button>
                      <span className={currentList.id === list.id ? 'font-medium text-proz-purple' : ''}>
                        {list.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                        <Star size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-500 transition-colors">
                        <Edit size={16} />
                      </button>
                      <span className="bg-proz-purple text-white px-2 py-0.5 rounded-full text-xs">
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
            <div className="bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex justify-between items-center p-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                    <Star size={16} />
                  </button>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-gray-700 font-medium">0</span>
                  </div>
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-md transition-colors">
                  <span className="sr-only">Settings</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </button>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">0 talents</span>
                  <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm font-medium">
                    <Plus size={16} className="mr-1" /> Add talent
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">1 Folder</span>
                  <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm font-medium">
                    <Plus size={16} className="mr-1" /> Add subfolder
                  </button>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-gray-700">Select talents and...</span>
                  <button className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md flex items-center transition-colors text-sm">
                    <Send size={14} className="mr-1" /> Send message
                  </button>
                  <button className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md flex items-center transition-colors text-sm">
                    <Trash2 size={14} className="mr-1" /> Remove
                  </button>
                  <button className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md flex items-center transition-colors text-sm">
                    <MoveRight size={14} className="mr-1" /> Move <span className="ml-1">▼</span>
                  </button>
                  <button className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md flex items-center transition-colors text-sm">
                    <CheckCircle size={14} className="mr-1" /> Post a Job
                  </button>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-md flex items-start">
                  <div className="text-blue-600 mr-3 mt-1 flex-shrink-0">
                    <Info size={16} />
                  </div>
                  <div className="text-blue-700 text-sm">
                    Click "Add talent" above to add people to this list.
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center mb-3">
                  <h3 className="font-bold text-proz-purple">Enter name for new folder</h3>
                  <span className="ml-2 text-proz-purple">◉</span>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md">
                  <p className="text-gray-500">No talents yet. Drag and drop talents here.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Message Board */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-r from-proz-purple to-proz-purpleLight text-white px-4 py-3 flex items-center rounded-t-md shadow-sm">
              <span className="mr-2">✉</span>
              <span className="font-medium">Message Board (0)</span>
            </div>
            
            <div className="border border-gray-200 rounded-b-md p-4 bg-white shadow-sm">
              <div className="flex border-b border-gray-200 mb-4">
                <button className="px-4 py-2 border-b-2 border-proz-purple font-medium text-proz-purple">
                  <span className="mr-1">✉</span> Inbox
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <span className="mr-1">→</span> Sent
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <span className="mr-1">📁</span> Archived
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <span className="mr-1">▤</span> All
                </button>
              </div>
              
              <div className="h-64 flex flex-col items-center justify-center">
                <div className="text-gray-400 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <p className="text-gray-600">There are no messages for this list.</p>
                <button className="mt-4 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md flex items-center transition-colors border border-blue-200">
                  <Send size={16} className="mr-2" /> Compose New Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
