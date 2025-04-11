
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';

const SearchField = ({ 
  label, 
  placeholder = "Any",
  note = ""
}: { 
  label: string; 
  placeholder?: string;
  note?: string;
}) => (
  <div className="mb-4">
    <Label className="text-xs uppercase font-semibold text-gray-600 mb-1 block">
      {label} {note && <span className="text-xs normal-case font-normal text-gray-500">({note})</span>}
    </Label>
    <div className="relative">
      <Input placeholder={placeholder} className="proz-input pr-8" />
      <ChevronDown className="h-4 w-4 absolute right-2 top-3 text-gray-400" />
    </div>
  </div>
);

const UserSearch = () => {
  return (
    <form>
      <SearchField label="SERVICE TYPE" />
      <SearchField label="SOURCE LANGUAGE" note="Required field" />
      <SearchField label="TARGET LANGUAGE" note="Required field" />
      <SearchField label="NATIVE LANGUAGE" />
      <SearchField label="FIELD OF EXPERTISE" />
      <SearchField label="PAYMENT TYPE" />
      
      <div className="mb-4">
        <Label className="text-xs uppercase font-semibold text-gray-600 mb-1 block">
          LOCATION
        </Label>
        <div className="space-y-2">
          <div className="relative">
            <Label className="text-xs text-gray-600 mb-1 block">Country:</Label>
            <Input placeholder="Any" className="proz-input pr-8" />
            <ChevronDown className="h-4 w-4 absolute right-2 top-8 text-gray-400" />
          </div>
          
          <div className="relative">
            <Label className="text-xs text-gray-600 mb-1 block">Region:</Label>
            <Input placeholder="Any" className="proz-input pr-8" />
            <ChevronDown className="h-4 w-4 absolute right-2 top-8 text-gray-400" />
          </div>
          
          <div className="relative">
            <Label className="text-xs text-gray-600 mb-1 block">City:</Label>
            <Input placeholder="Type a location" className="proz-input" />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <Label className="text-xs uppercase font-semibold text-gray-600 mb-1 block">
          PROFESSIONAL IDENTITY
        </Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="certified" />
            <Label htmlFor="certified" className="text-sm m-0">Certified PRO Network</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="enterprise" />
            <Label htmlFor="enterprise" className="text-sm m-0">Enterprise Card holder</Label>
          </div>
        </div>
      </div>
      
      <SearchField label="USER NAME" placeholder="Enter name of the user you want to find" />
      <SearchField label="KM TOOL" />
      <SearchField label="KEYWORDS" placeholder="Enter keywords" />
      
      <div className="mb-4">
        <Label className="text-xs uppercase font-semibold text-gray-600 mb-1 block">
          AVAILABILITY
        </Label>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label className="text-xs text-gray-600 mb-1 block">From:</Label>
            <Input type="date" className="proz-input" />
          </div>
          <div className="flex-1">
            <Label className="text-xs text-gray-600 mb-1 block">To:</Label>
            <Input type="date" className="proz-input" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          Search
        </button>
      </div>
    </form>
  );
};

export default UserSearch;
