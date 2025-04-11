
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchField = ({ 
  label, 
  placeholder = "Any",
  note = "",
  options = [],
  isSelect = true
}: { 
  label: string; 
  placeholder?: string;
  note?: string;
  options?: string[];
  isSelect?: boolean;
}) => (
  <div className="mb-4">
    <Label className="text-xs uppercase font-semibold text-gray-600 mb-1 block">
      {label} {note && <span className="text-xs normal-case font-normal text-gray-500">({note})</span>}
    </Label>
    
    {isSelect ? (
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length === 0 ? (
            <SelectItem value="any">Any</SelectItem>
          ) : (
            options.map((option) => (
              <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    ) : (
      <Input placeholder={placeholder} className="proz-input" />
    )}
  </div>
);

const UserSearch = () => {
  const serviceTypes = ["Translation", "Proofreading", "Interpretation", "Subtitling"];
  const languages = ["English", "Spanish", "French", "German", "Russian", "Chinese", "Arabic"];
  const paymentTypes = ["Bank Transfer", "PayPal", "Payoneer", "Stripe"];
  const countries = ["United States", "Spain", "France", "Germany", "United Kingdom", "Canada", "Australia"];
  const regions = ["North America", "South America", "Europe", "Asia", "Africa", "Oceania"];
  const kmTools = ["SDL Trados", "memoQ", "Wordfast", "Memsource", "DeepL", "Google Translate"];

  return (
    <form>
      <SearchField label="SERVICE TYPE" options={serviceTypes} />
      <SearchField label="SOURCE LANGUAGE" note="Required field" options={languages} />
      <SearchField label="TARGET LANGUAGE" note="Required field" options={languages} />
      <SearchField label="NATIVE LANGUAGE" options={languages} />
      <SearchField label="FIELD OF EXPERTISE" />
      <SearchField label="PAYMENT TYPE" options={paymentTypes} />
      
      <div className="mb-4">
        <Label className="text-xs uppercase font-semibold text-gray-600 mb-1 block">
          LOCATION
        </Label>
        <div className="space-y-2">
          <div>
            <Label className="text-xs text-gray-600 mb-1 block">Country:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-xs text-gray-600 mb-1 block">Region:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region.toLowerCase()}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
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
      
      <SearchField label="USER NAME" placeholder="Enter name of the user you want to find" isSelect={false} />
      <SearchField label="KM TOOL" options={kmTools} />
      <SearchField label="KEYWORDS" placeholder="Enter keywords" isSelect={false} />
      
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
