import React, { useState, useEffect } from 'react';
import { Plus, Star, Edit, Users, ChevronDown, ChevronRight, Folder, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

interface ListItem {
  id: string;
  name: string;
  vendorCount: number;
  parentId?: string | null;
  isOpen?: boolean;
  children?: ListItem[];
}

interface ListBoardProps {
  lists: any[];
  currentList: any;
  setCurrentList: (list: any) => void;
  onInviteClick: () => void;
}

interface ConfirmDialogState {
  isOpen: boolean;
  result: any;
  onConfirm: () => void;
  title: string;
  description: string;
  actionType: 'move' | 'nest';
}

const ListBoard = ({ lists, currentList, setCurrentList, onInviteClick }: ListBoardProps) => {
  const [newListName, setNewListName] = useState('');
  const [hierarchicalLists, setHierarchicalLists] = useState<ListItem[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    result: null,
    onConfirm: () => {},
    title: '',
    description: '',
    actionType: 'move'
  });

  useEffect(() => {
    const listMap = new Map<string, ListItem>();
    lists.forEach(list => {
      listMap.set(list.id, { ...list, children: [], isOpen: true });
    });

    const rootLists: ListItem[] = [];
    listMap.forEach(list => {
      if (list.parentId && listMap.has(list.parentId)) {
        const parent = listMap.get(list.parentId)!;
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(list);
      } else {
        rootLists.push(list);
      }
    });

    setHierarchicalLists(rootLists);
  }, [lists]);

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    
    const newList = {
      id: Date.now().toString(),
      name: newListName,
      vendorCount: 0
    };
    
    toast.success('List created successfully');
    setNewListName('');
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, draggableId } = result;
    
    const actionType = destination.droppableId !== "lists" ? 'nest' as const : 'move' as const;
    const dialogData: ConfirmDialogState = {
      isOpen: true,
      result,
      onConfirm: () => applyDragChanges(result),
      title: actionType === 'nest' 
        ? "Nest this list as a child?" 
        : "Move this list?",
      description: actionType === 'nest'
        ? "This will make the selected list a child of the target list. This action can be undone later."
        : "This will reorder the lists. This action can be undone later.",
      actionType
    };
    
    setConfirmDialog(dialogData);
  };

  const applyDragChanges = (result: any) => {
    const { source, destination, draggableId } = result;
    
    const newHierarchicalLists = JSON.parse(JSON.stringify(hierarchicalLists));
    
    if (destination.droppableId !== "lists") {
      const targetListId = destination.droppableId.replace('list-', '');
      
      let draggedList: ListItem | null = null;
      const findAndRemoveList = (lists: ListItem[], id: string): boolean => {
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].id === id) {
            draggedList = lists[i];
            lists.splice(i, 1);
            return true;
          }
          if (lists[i].children && lists[i].children!.length > 0) {
            if (findAndRemoveList(lists[i].children!, id)) {
              return true;
            }
          }
        }
        return false;
      };
      
      findAndRemoveList(newHierarchicalLists, draggableId);
      
      if (draggedList) {
        draggedList.parentId = targetListId;
        
        const findAndAddToTarget = (lists: ListItem[], targetId: string): boolean => {
          for (const list of lists) {
            if (list.id === targetId) {
              if (!list.children) {
                list.children = [];
              }
              list.children.push(draggedList!);
              return true;
            }
            if (list.children && list.children.length > 0) {
              if (findAndAddToTarget(list.children, targetId)) {
                return true;
              }
            }
          }
          return false;
        };
        
        findAndAddToTarget(newHierarchicalLists, targetListId);
      }
    } else {
      const draggedList = newHierarchicalLists.splice(source.index, 1)[0];
      newHierarchicalLists.splice(destination.index, 0, draggedList);
    }
    
    setHierarchicalLists(newHierarchicalLists);
    toast.success('List hierarchy updated');
  };

  const toggleListOpen = (listId: string) => {
    const toggleInList = (lists: ListItem[]): boolean => {
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].id === listId) {
          lists[i].isOpen = !lists[i].isOpen;
          return true;
        }
        if (lists[i].children && lists[i].children!.length > 0) {
          if (toggleInList(lists[i].children!)) {
            return true;
          }
        }
      }
      return false;
    };
    
    const newLists = JSON.parse(JSON.stringify(hierarchicalLists));
    toggleInList(newLists);
    setHierarchicalLists(newLists);
  };

  const renderListItem = (list: ListItem, index: number, level: number = 0) => (
    <Draggable key={list.id} draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="list-item"
        >
          <div 
            className={`flex items-center justify-between p-2 rounded transition-colors cursor-pointer 
              ${snapshot.isDragging ? 'bg-purple-50 shadow-md' : ''}
              ${currentList.id === list.id ? 'bg-purple-100 border-l-4 border-proz-purple' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
            onClick={() => setCurrentList(list)}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
          >
            <div className="flex items-center">
              <div 
                {...provided.dragHandleProps} 
                className="mr-2 text-gray-400 hover:text-gray-600"
              >
                ☰
              </div>
              
              {list.children && list.children.length > 0 && (
                <button 
                  className="mr-1 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleListOpen(list.id);
                  }}
                >
                  {list.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              )}
              
              <Folder size={16} className="mr-1 text-gray-500" />
              
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
          
          {list.isOpen && (
            <Droppable droppableId={`list-${list.id}`} type="list">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="pl-4"
                >
                  {list.children && list.children.length > 0 && 
                    list.children.map((child, childIndex) => 
                      renderListItem(child, childIndex, level + 1)
                    )
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      )}
    </Draggable>
  );

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
          <Droppable droppableId="lists" type="list">
            {(provided) => (
              <div 
                className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {hierarchicalLists.map((list, index) => renderListItem(list, index))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <AlertDialog open={confirmDialog.isOpen} onOpenChange={(open) => setConfirmDialog({...confirmDialog, isOpen: open})}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              {confirmDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                confirmDialog.onConfirm();
                setConfirmDialog({...confirmDialog, isOpen: false});
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListBoard;
