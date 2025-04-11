
import React, { useState } from 'react';
import { Plus, Send, Trash2, MoveRight, CheckCircle, Info, Users, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { addVendor } from '../../lib/db';
import { toast } from 'sonner';

interface VendorListDetailProps {
  currentList: any;
  setCurrentList: (list: any) => void;
}

const VendorListDetail = ({ currentList, setCurrentList }: VendorListDetailProps) => {
  const [newVendorName, setNewVendorName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddVendor = async () => {
    if (!newVendorName.trim() || !currentList.id) return;
    
    try {
      // In a real app, this would call the API
      // await addVendor(currentList.id, { name: newVendorName });
      // For demo, we'll just update the local state
      const newVendor = { id: Date.now().toString(), name: newVendorName };
      setCurrentList({
        ...currentList,
        vendors: [...(currentList.vendors || []), newVendor]
      });
      setNewVendorName('');
      toast.success('Vendor added successfully');
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast.error('Failed to add vendor');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-yellow-500 transition-colors">
            <Star size={16} />
          </button>
          <div className="flex items-center gap-1">
            <Users size={16} className="text-gray-500" />
            <span className="text-gray-700 font-medium">{currentList.vendors?.length || 0}</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <span className="sr-only">Settings</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </Button>
      </div>
      
      <div className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">{currentList.vendors?.length || 0} talents</span>
          <Button size="sm" variant="default" className="flex items-center gap-1">
            <Plus size={16} /> Add talent
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">1 Folder</span>
          <Button size="sm" variant="default" className="flex items-center gap-1">
            <Plus size={16} /> Add subfolder
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-gray-700">Select talents and...</span>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
            <Send size={14} className="mr-1" /> Send message
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
            <Trash2 size={14} className="mr-1" /> Remove
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
            <MoveRight size={14} className="mr-1" /> Move <span className="ml-1">▼</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
            <CheckCircle size={14} className="mr-1" /> Post a Job
          </Button>
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
  );
};

export default VendorListDetail;
