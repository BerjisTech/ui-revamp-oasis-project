
import React, { useState } from 'react';
import { Plus, Send, Trash2, MoveRight, CheckCircle, Info, Users, Star, Settings, Copy, Archive, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addVendor } from '../../lib/db';
import { toast } from 'sonner';

interface VendorListDetailProps {
  currentList: any;
  setCurrentList: (list: any) => void;
}

const VendorListDetail = ({ currentList, setCurrentList }: VendorListDetailProps) => {
  const [newVendorName, setNewVendorName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movePopoverOpen, setMovePopoverOpen] = useState(false);
  const [folderSearchQuery, setFolderSearchQuery] = useState('');

  // Mock folders data - in a real app this would come from an API
  const [folders, setFolders] = useState([
    { id: '1', name: 'Graphic Designers' },
    { id: '2', name: 'Writers' },
    { id: '3', name: 'Developers' },
    { id: '4', name: 'Translators' },
    { id: '5', name: 'Project Managers' },
  ]);

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
    setMovePopoverOpen(false);
  };

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(folderSearchQuery.toLowerCase())
  );

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
          <button className="text-gray-400 hover:text-blue-500 transition-colors">
            <Info size={16} />
          </button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="p-2">
              <span className="sr-only">Settings</span>
              <Settings size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleCloneList}>
              <Copy className="mr-2 h-4 w-4" />
              <span>Clone list</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleArchiveList}>
              <Archive className="mr-2 h-4 w-4" />
              <span>Archive list</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteList} className="text-red-600 hover:text-red-700">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete list</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          <Popover open={movePopoverOpen} onOpenChange={setMovePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                <MoveRight size={14} className="mr-1" /> Move <span className="ml-1">▼</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium">Move to Folder</h3>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search folders..."
                    className="pl-8"
                    value={folderSearchQuery}
                    onChange={(e) => setFolderSearchQuery(e.target.value)}
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredFolders.length > 0 ? (
                    <div className="space-y-2">
                      {filteredFolders.map((folder) => (
                        <div
                          key={folder.id}
                          className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleMoveToFolder(folder.id)}
                        >
                          <span>{folder.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm py-2 text-center">No folders found</p>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the list "{currentList.name}" and remove it from all views.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteList} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VendorListDetail;
