
import React, { useState } from 'react';
import { Star, Users, Info, Settings, Copy, Archive, Trash2, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ListHeaderProps {
  vendorCount: number;
  listName: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onCloneList: () => void;
  onArchiveList: () => void;
  onDeleteList: () => void;
}

const ListHeader = ({ 
  vendorCount, 
  listName,
  isFavorite = false,
  onToggleFavorite = () => {},
  onCloneList,
  onArchiveList,
  onDeleteList
}: ListHeaderProps) => {
  const [collaboratorsOpen, setCollaboratorsOpen] = useState(false);
  
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={`transition-colors ${isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                onClick={onToggleFavorite}
              >
                <Star size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? 'Unmark this list as favorite' : 'Mark this list as favorite'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center gap-1">
          <Users size={16} className="text-gray-500" />
          <span className="text-gray-700 font-medium">{vendorCount}</span>
        </div>
        
        <TooltipProvider>
          <Dialog open={collaboratorsOpen} onOpenChange={setCollaboratorsOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  onClick={() => setCollaboratorsOpen(true)}
                >
                  <Users size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Collaborators</p>
              </TooltipContent>
            </Tooltip>
            
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Collaborators</DialogTitle>
                <DialogDescription>
                  <p className="mb-2">List: {listName}</p>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Add Collaborator:</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Only employees of your company can be added as collaborators. 
                    <a href="#" className="text-blue-600 hover:underline ml-1">Contact support</a> to setup
                    a company on ProZ.com and add employees.
                  </p>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Start typing a name or username" 
                      className="flex-1"
                    />
                    <div className="w-32">
                      <select className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm">
                        <option value="owner">Owner</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>
                    <Button type="button" size="sm">
                      Add Collaborator
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-700">There are no collaborators for this list.</p>
                </div>
              </div>

              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </TooltipProvider>
        
        <TooltipProvider>
          <HoverCard>
            <Tooltip>
              <TooltipTrigger asChild>
                <HoverCardTrigger asChild>
                  <button className="text-gray-400 hover:text-blue-500 transition-colors">
                    <Info size={16} />
                  </button>
                </HoverCardTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>List information</p>
              </TooltipContent>
            </Tooltip>
            
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">About {listName}</h3>
                <div className="text-xs text-gray-500">
                  <p className="mb-1"><span className="font-medium">Description:</span> No description</p>
                  <p className="mb-1"><span className="font-medium">Shared with:</span></p>
                  <p className="mb-1"><span className="font-medium">Folders:</span> 0 Folders</p>
                  <p className="mb-1"><span className="font-medium">Talents:</span> {vendorCount} Talents</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </TooltipProvider>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="p-2">
            <span className="sr-only">Settings</span>
            <Settings size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={onCloneList}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Clone list</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onArchiveList}>
            <Archive className="mr-2 h-4 w-4" />
            <span>Archive list</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDeleteList} className="text-red-600 hover:text-red-700">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete list</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ListHeader;
