
import React, { useState } from 'react';
import { X, Plus, Trash, ExternalLink, Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Note {
  id: string;
  text: string;
  time_added: string;
}

interface AddToListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  vendorLists: { id: string; name: string }[];
  notes: Note[];
}

const AddToListDialog = ({ isOpen, onClose, vendorName, vendorLists, notes: initialNotes }: AddToListDialogProps) => {
  const [showAddToMoreLists, setShowAddToMoreLists] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>(initialNotes || []);
  const [availableLists, setAvailableLists] = useState<{ id: string; name: string }[]>([
    { id: '789', name: 'English to Spanish' },
    { id: '101', name: 'Technical Writers' },
    { id: '112', name: 'Medical Specialists' }
  ]);
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const newNoteObj = {
      id: Date.now().toString(),
      text: newNote,
      time_added: new Date().toLocaleString()
    };
    
    setNotes([...notes, newNoteObj]);
    setNewNote('');
    toast.success('Note added successfully');
  };

  const handleRemoveFromList = (listId: string) => {
    // In a real app, this would call an API to remove the vendor from the list
    toast.success(`Removed from list`);
  };

  const handleAddToList = () => {
    if (selectedList) {
      // Add to existing list
      toast.success(`Added to list`);
      setSelectedList('');
    } else if (newListName.trim()) {
      // Create new list and add
      toast.success(`Created new list and added`);
      setNewListName('');
    }
    setShowAddToMoreLists(false);
  };

  const handleRemoveFromAllLists = () => {
    // In a real app, this would call an API to remove the vendor from all lists
    toast.success('Removed from all lists');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">{vendorName} is saved in your lists</DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Lists help manage your search for translators.
            <a href="/lists" target="_blank" className="ml-1 text-blue-600 hover:underline">See my lists</a>
          </p>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <strong className="text-gray-700">In your lists</strong>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 flex items-center" 
              onClick={() => setShowAddToMoreLists(!showAddToMoreLists)}
            >
              <Plus size={16} className="mr-1" />
              Add to more lists
            </Button>
          </div>

          {showAddToMoreLists && (
            <div className="border border-gray-200 rounded-md p-3 bg-gray-50 mb-3">
              {availableLists.length > 0 && (
                <>
                  <div className="font-medium mb-2">Add {vendorName} to another list:</div>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={selectedList}
                    onChange={(e) => setSelectedList(e.target.value)}
                  >
                    <option value="">Select a list</option>
                    {availableLists.map(list => (
                      <option key={list.id} value={list.id}>{list.name}</option>
                    ))}
                  </select>
                  
                  <div className="mb-2">...or create a new list:</div>
                </>
              )}

              {availableLists.length === 0 && (
                <div className="font-medium mb-2">Add {vendorName} to a new list:</div>
              )}

              <div className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter a name for the new list"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
                <Button onClick={handleAddToList}>Save</Button>
              </div>

              <div className="flex justify-between mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAddToMoreLists(false)}
                >
                  Cancel
                </Button>
                <a 
                  href="/lists" 
                  target="_blank" 
                  className="text-blue-600 hover:underline flex items-center text-sm"
                >
                  Manage lists
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {vendorLists.map(list => (
              <div key={list.id} className="bg-gray-100 rounded-md px-2 py-1 flex items-center text-sm">
                <a 
                  href={`/lists/${list.id}`} 
                  target="_blank" 
                  className="text-blue-600 hover:underline mr-1"
                  title="Open this list in a new window"
                >
                  {list.name}
                </a>
                <button 
                  title="Remove from this list"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => handleRemoveFromList(list.id)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <strong className="text-gray-700">Your notes</strong>
            <span className="text-xs text-muted-foreground">Notes are visible only to you</span>
          </div>

          {notes.length > 0 && (
            <ul className="mb-4 space-y-2">
              {notes.map(note => (
                <li key={note.id} className="border-b border-gray-100 pb-2">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <span className="text-gray-400 text-xs">{note.time_added}:</span>
                      <div className="text-sm text-gray-700">{note.text}</div>
                    </div>
                    <div className="flex gap-1">
                      <button title="Edit this note" className="text-gray-400 hover:text-blue-500">
                        <Pencil size={14} />
                      </button>
                      <button title="Delete this note" className="text-gray-400 hover:text-red-500">
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3">
            <Textarea 
              placeholder={`Add a note about ${vendorName}`}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              className="mb-2"
            />
            <Button size="sm" onClick={handleAddNote}>Add this note</Button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
          <Button variant="ghost" size="sm" onClick={onClose} className="flex items-center">
            <X size={14} className="mr-1" />
            Close
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 flex items-center"
            onClick={handleRemoveFromAllLists}
          >
            <Trash size={14} className="mr-1" />
            Remove from all my lists
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToListDialog;
