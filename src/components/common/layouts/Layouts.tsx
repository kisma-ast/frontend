import React, { useState } from 'react';
import Sidebar from '../templates/Sidebar';
import Header from '../templates/Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <Header />

 
        <main className="flex-1 p-6 bg-gradient-to-br from-blue-700 to-blue-800">
          <Outlet />
        </main>

     
      </div>
    </div>
  );
};

export default Layout;
