import React from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { ArrowUpRight, DollarSign, Users } from 'lucide-react';

const Manager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeSection = location.pathname.split('/')[1] || 'dashboard';

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 border-r border-gray-200">
        <h2 className="text-3xl font-bold text-blue-600 mb-8">🍽️ Manager</h2>
        <nav className="flex flex-col gap-4 text-lg">
          {['dashboard', 'menu', 'review', 'coupon'].map((item) => (
            <button
              key={item}
              onClick={() => navigate(`/${item}`)}
              className={`text-left hover:text-blue-500 transition ${
                activeSection === item ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
          </h1>
          <p className="text-gray-500 mt-2">Insights and tools for {activeSection} management</p>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium text-gray-500">Total Orders</h2>
                    <ArrowUpRight className="text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">1,240</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium text-gray-500">Revenue</h2>
                    <DollarSign className="text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">$34,500</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium text-gray-500">Customers</h2>
                    <Users className="text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">875</p>
                </div>
              </div>
            }
          />

          <Route
            path="/menu"
            element={
              <div className="bg-white rounded-2xl shadow-lg p-6 border">
                <h2 className="text-2xl font-semibold mb-4">Menu Management</h2>
                <p className="text-gray-600">Add, edit or remove dishes from the restaurant menu.</p>
              </div>
            }
          />

          <Route
            path="/review"
            element={
              <div className="bg-white rounded-2xl shadow-lg p-6 border">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <p className="text-gray-600">View and respond to customer feedback.</p>
              </div>
            }
          />

          <Route
            path="/coupon"
            element={
              <div className="bg-white rounded-2xl shadow-lg p-6 border">
                <h2 className="text-2xl font-semibold mb-4">Coupon Management</h2>
                <p className="text-gray-600">Create and manage discount coupons.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default Manager;
