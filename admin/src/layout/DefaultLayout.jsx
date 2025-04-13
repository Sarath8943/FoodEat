import React from "react";
import Navbar from "../componentes/header/Navbar";
import SideBar from "../componentes/SideBar/SideBar";
import BreadCrumb from "../componentes/BreadCrumb/BreadCrumb";

function DefaultLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile by default */}
      <div className="hidden md:flex md:w-64 lg:w-72 fixed inset-y-0 z-50">
        <SideBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:pl-64 lg:pl-72 min-h-0">
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <Navbar />
        </header>

        {/* Content with breadcrumb */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <BreadCrumb children={children} />
            <div className="mt-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;





