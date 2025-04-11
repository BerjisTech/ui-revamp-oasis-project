import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { getVendorLists, getVendors } from '../lib/db';
import ListBoard from './vendor/ListBoard';
import VendorListDetail from './vendor/VendorListDetail';
import MessageBoard from './vendor/MessageBoard';
import InviteVendorsModal from './vendor/InviteVendorsModal';
import AddToListDemo from './vendor/AddToListDemo';

interface VendorList {
  id: string;
  name: string;
  vendorCount: number;
  parentId?: string | null;
  vendors?: any[];
}

const VendorManagement = () => {
  const [lists, setLists] = useState<VendorList[]>([]);
  const [currentList, setCurrentList] = useState<VendorList>({
    id: '123', 
    name: 'Another banger',
    vendorCount: 0,
    vendors: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  
  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true);
      try {
        const listsData: VendorList[] = [
          { id: '123', name: 'Another banger', vendorCount: 3 },
          { id: '456', name: 'Sublist', vendorCount: 0, parentId: '123' },
          { id: '789', name: 'Technical Translators', vendorCount: 5 },
          { id: '012', name: 'Preferred Vendors', vendorCount: 2, parentId: '789' },
          { id: '345', name: 'Spanish Translators', vendorCount: 7 },
          { id: '678', name: 'Latin America', vendorCount: 3, parentId: '345' },
          { id: '901', name: 'Spain', vendorCount: 4, parentId: '345' }
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
  
  useEffect(() => {
    const fetchVendors = async () => {
      if (!currentList.id) return;
      
      setIsLoading(true);
      try {
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
  
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-proz-purple">Vendor management lists</h1>
        <p className="text-gray-700 mb-6">
          Manage your search for language professionals at ProZ.com. Organize candidates into lists and folders and track your correspondence.{' '}
          <a href="#" className="text-blue-600 hover:underline">Learn more.</a>
        </p>
        
        <div className="mb-6">
          <AddToListDemo />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <ListBoard 
              lists={lists} 
              currentList={currentList} 
              setCurrentList={setCurrentList}
              onInviteClick={() => setShowInviteModal(true)}
            />
          </div>
          
          <div className="md:col-span-6">
            <VendorListDetail 
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </div>
          
          <div className="md:col-span-3">
            <MessageBoard listId={currentList.id} />
          </div>
        </div>
      </div>

      <InviteVendorsModal 
        isOpen={showInviteModal} 
        onClose={() => setShowInviteModal(false)}
        listId={currentList.id}
      />
    </div>
  );
};

export default VendorManagement;
