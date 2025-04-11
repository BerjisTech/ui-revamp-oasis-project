
import React from 'react';
import { Bell, ChevronDown, HelpCircle, Home, Search, Settings, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex flex-col w-full">
      {/* Top header bar */}
      <div className="flex justify-between items-center bg-proz-header text-white px-4 py-1 text-sm">
        <div className="flex items-center gap-2">
          <span>1.95</span>
          <span>1.942</span>
          <span>PHP$</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input type="checkbox" id="show-new-nav" className="mr-1" />
            <label htmlFor="show-new-nav">Show new Nav & Footer</label>
          </div>
          <span>Mod</span>
          <span>Admin</span>
          <span className="font-bold">Your earnings: 0.00</span>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="flex justify-between items-center bg-proz-nav text-white px-4 py-2">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white font-bold flex items-center">
            <img src="/lovable-uploads/7a6c6eb7-db9f-4a59-a898-335b3d25031e.png" alt="ProZ.com Logo" className="h-8" />
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-1">
                Terminología <ChevronDown size={16} />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-1">
                Trabajos y directorios <ChevronDown size={16} />
              </button>
            </div>
            
            <div className="relative group">
              <Link to="/directory" className="flex items-center gap-1 hover:underline">
                <Users size={16} className="mr-1" />
                User Directory
              </Link>
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-1">
                Formación <ChevronDown size={16} />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-1">
                Herramientas <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md flex items-center">
            <span className="mr-1">•</span> Join
          </button>
          <button><Home size={20} /></button>
          <button><Bell size={20} /></button>
          <div className="flex items-center gap-1">
            <button><Settings size={20} /></button>
            <ChevronDown size={16} />
          </div>
          <button><HelpCircle size={20} /></button>
          <button><Search size={20} /></button>
          <div className="flex items-center">
            <img src="https://via.placeholder.com/30" alt="User" className="rounded-full h-7 w-7" />
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
