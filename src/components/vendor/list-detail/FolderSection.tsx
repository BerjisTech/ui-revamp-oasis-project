
import React from 'react';

const FolderSection = () => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center mb-3">
        <h3 className="font-bold text-proz-purple">Enter name for new folder</h3>
        <span className="ml-2 text-proz-purple">◉</span>
      </div>
      <div className="h-64 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-500">No talents yet. Drag and drop talents here.</p>
      </div>
    </div>
  );
};

export default FolderSection;
