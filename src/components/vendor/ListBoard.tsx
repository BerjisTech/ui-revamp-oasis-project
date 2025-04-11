
import React, { useState } from 'react';
import { Plus, Star, Edit, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ListBoardProps {
  lists: any[];
  currentList: any;
  setCurrentList: (list: any) => void;
  onInviteClick: () => void;
}

const ListBoard = ({ lists, currentList, setCurrentList, onInviteClick }: ListBoardProps) => {
  const [newListName, setNewListName] = useState('');
  const [orderedLists, setOrderedLists] = useState<any[]>(lists);

  // Update orderedLists when lists prop changes
  React.useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    
    const newList = {
      id: Date.now().toString(),
      name: newListName,
      vendorCount: 0
    };
    
    // In a real app, this would call the API to create the list
    toast.success('List created successfully');
    setNewListName('');
  };

  const handleDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = Array.from(orderedLists);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOrderedLists(items);
    toast.success('List order updated');
    
    // In a real app, you would save the new order to the backend here
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-proz-purple to-proz-purpleLight text-white px-4 py-3 flex items-center justify-between mb-2 rounded-t-md shadow-sm">
        <div className="flex items-center font-medium">
          <span className="mr-2">☰</span>
          <span>List Board</span>
        </div>
        <Button 
          onClick={onInviteClick}
          size="sm" 
          className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
        >
          Invite Vendor <Users size={16} className="ml-1" />
        </Button>
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
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="lists">
            {(provided) => (
              <div 
                className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {orderedLists.map((list, index) => (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center justify-between p-2 rounded transition-colors cursor-pointer 
                          ${snapshot.isDragging ? 'bg-purple-50 shadow-md' : ''}
                          ${currentList.id === list.id ? 'bg-purple-100 border-l-4 border-proz-purple' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                        onClick={() => setCurrentList(list)}
                      >
                        <div className="flex items-center">
                          <button className="mr-2 text-gray-400 hover:text-gray-600">☰</button>
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ListBoard;
