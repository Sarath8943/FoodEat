
import React, { createContext, useState, useContext } from 'react';
import { Menu } from 'lucide-react';

// Create a context for sidebar state
const SidebarContext = createContext();

// Context Provider Component
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/home');

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <SidebarContext.Provider value={{ 
      isOpen, 
      toggleSidebar, 
      activeRoute, 
      setActiveRoute 
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Modern Navbar Component with dark theme
export const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Hamburger Menu */}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-gray-300 hover:text-white" />
        </button>

        {/* Brand/Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AdminHub
          </span>
          <span className="hidden md:inline text-xs text-gray-400">v2.0</span>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <span className="sr-only">Notifications</span>
            <div className="w-2 h-2 bg-red-500 rounded-full absolute mt-1 mr-1"></div>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <div className="hidden md:flex items-center space-x-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
            <span className="text-gray-300 group-hover:text-white transition-colors">John Doe</span>
          </div>
        </div>
      </div>
    </nav>
  );
};



