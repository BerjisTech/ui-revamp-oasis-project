
import React from 'react';
import { Star, Users, Info, Settings, Copy, Archive, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ListHeaderProps {
  vendorCount: number;
  onCloneList: () => void;
  onArchiveList: () => void;
  onDeleteList: () => void;
}

const ListHeader = ({ 
  vendorCount, 
  onCloneList,
  onArchiveList,
  onDeleteList
}: ListHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button className="text-gray-400 hover:text-yellow-500 transition-colors">
          <Star size={16} />
        </button>
        <div className="flex items-center gap-1">
          <Users size={16} className="text-gray-500" />
          <span className="text-gray-700 font-medium">{vendorCount}</span>
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
