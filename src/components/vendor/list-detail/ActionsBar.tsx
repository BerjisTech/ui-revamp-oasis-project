
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ActionsBarProps {
  vendorCount: number;
}

const ActionsBar = ({ vendorCount }: ActionsBarProps) => {
  return (
    <div className="p-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-800">{vendorCount} talents</span>
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
  );
};

export default ActionsBar;
