
import React, { useState } from 'react';
import ListHeader from './list-detail/ListHeader';
import ActionsBar from './list-detail/ActionsBar';
import BulkActions from './list-detail/BulkActions';
import FolderSection from './list-detail/FolderSection';
import DeleteConfirmDialog from './list-detail/DeleteConfirmDialog';
import { toast } from 'sonner';

interface VendorListDetailProps {
  currentList: any;
  setCurrentList: (list: any) => void;
}

const VendorListDetail = ({ currentList, setCurrentList }: VendorListDetailProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Mock folders data - in a real app this would come from an API
  const [folders] = useState([
    { id: '1', name: 'Graphic Designers' },
    { id: '2', name: 'Writers' },
    { id: '3', name: 'Developers' },
    { id: '4', name: 'Translators' },
    { id: '5', name: 'Project Managers' },
  ]);

  const handleCloneList = () => {
    toast.success('List cloned successfully');
    // In a real app, this would call API to clone the list
  };

  const handleArchiveList = () => {
    toast.success('List archived successfully');
    // In a real app, this would call API to archive the list
  };

  const handleDeleteList = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDeleteList = () => {
    // In a real app, this would call API to delete the list
    toast.success('List deleted successfully');
    setDeleteDialogOpen(false);
  };

  const handleMoveToFolder = (folderId: string) => {
    // In a real app, this would call API to move the list to another folder
    toast.success(`Moved to folder successfully`);
  };

  const handleSendMessage = (subject: string, body: string) => {
    if (!subject.trim() || !body.trim()) {
      toast.error('Please fill in both subject and message');
      return;
    }
    
    // In a real app, this would call API to send the message
    toast.success('Message sent successfully');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm h-full">
      <ListHeader 
        vendorCount={currentList.vendors?.length || 0}
        onCloneList={handleCloneList}
        onArchiveList={handleArchiveList}
        onDeleteList={handleDeleteList}
      />
      
      <ActionsBar vendorCount={currentList.vendors?.length || 0} />
      
      <BulkActions 
        folders={folders}
        onMoveToFolder={handleMoveToFolder}
        onSendMessage={handleSendMessage}
        listName={currentList.name}
      />
      
      <FolderSection />

      <DeleteConfirmDialog 
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        listName={currentList.name}
        onConfirmDelete={confirmDeleteList}
      />
    </div>
  );
};

export default VendorListDetail;
