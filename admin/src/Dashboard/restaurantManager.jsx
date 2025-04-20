import React, { useState } from 'react';
import { 
  FiHome, 
  FiMenu, 
  FiStar, 
  FiCreditCard, 
  FiUsers,
  FiPieChart,
  FiSettings,
  FiBell,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications] = useState([
    "New reservation for 8:00 PM",
    "Inventory low: Chicken Breast",
    "New review received"
  ]);

  // Sample data
  const dashboardData = {
    revenue: {
      today: 4850,
      week: 32450,
      month: 128700,
    },
    popularItems: [
      { name: 'Truffle Pasta', orders: 42 },
      { name: 'Filet Mignon', orders: 38 },
      { name: 'Lobster Bisque', orders: 35 },
    ],
    recentReviews: [
      { rating: 5, comment: "Excellent service and food!", customer: "John D." },
      { rating: 4, comment: "Great atmosphere, will come back", customer: "Sarah M." },
      { rating: 3, comment: "Food was good but service slow", customer: "Robert T." },
    ],
    pendingPayments: [
      { vendor: "Fresh Produce Co.", amount: 1250.50, dueDate: "2023-06-15" },
      { vendor: "Beverage Distributors", amount: 845.75, dueDate: "2023-06-18" },
    ]
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            
            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard 
                title="Today's Revenue" 
                value={`$${dashboardData.revenue.today.toLocaleString()}`} 
                icon={<FiHome className="text-blue-500" />}
                color="bg-blue-50"
              />
              <DashboardCard 
                title="Weekly Revenue" 
                value={`$${dashboardData.revenue.week.toLocaleString()}`} 
                icon={<FiPieChart className="text-green-500" />}
                color="bg-green-50"
              />
              <DashboardCard 
                title="Monthly Revenue" 
                value={`$${dashboardData.revenue.month.toLocaleString()}`} 
                icon={<FiTrendingUp className="text-purple-500" />}
                color="bg-purple-50"
              />
            </div>

            {/* Popular Items */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Popular Menu Items</h3>
              <ul className="divide-y divide-gray-200">
                {dashboardData.popularItems.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {item.orders} orders
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'menu':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Menu Management</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Current Menu Items</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add New Item
                </button>
              </div>
              {/* Menu items table would go here */}
              <div className="text-center py-10 text-gray-500">
                Menu management content will appear here
              </div>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
                <div className="space-y-4">
                  {dashboardData.recentReviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} filled={i < review.rating} />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-1">"{review.comment}"</p>
                      <p className="text-sm text-gray-500">- {review.customer}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Review Statistics</h3>
                <div className="text-center py-10 text-gray-500">
                  Review charts and statistics will appear here
                </div>
              </div>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Payments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Pending Payments</h3>
                <ul className="divide-y divide-gray-200">
                  {dashboardData.pendingPayments.map((payment, index) => (
                    <li key={index} className="py-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{payment.vendor}</p>
                          <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                          <button className="text-blue-600 text-sm hover:text-blue-800">
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                <div className="text-center py-10 text-gray-500">
                  Payment history table will appear here
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Select a menu item</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ease-in-out 
        ${sidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {!sidebarCollapsed && <h1 className="text-xl font-bold text-gray-800">Bistro Manager</h1>}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>
        
        {/* Sidebar Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <SidebarItem 
              icon={<FiHome size={20} />}
              text="Dashboard"
              active={activeTab === 'dashboard'}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('dashboard')}
            />
            <SidebarItem 
              icon={<FiMenu size={20} />}
              text="Menu"
              active={activeTab === 'menu'}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('menu')}
            />
            <SidebarItem 
              icon={<FiStar size={20} />}
              text="Reviews"
              active={activeTab === 'reviews'}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('reviews')}
            />
            <SidebarItem 
              icon={<FiCreditCard size={20} />}
              text="Payments"
              active={activeTab === 'payments'}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('payments')}
            />
            <SidebarItem 
              icon={<FiUsers size={20} />}
              text="Staff"
              active={activeTab === 'staff'}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('staff')}
            />
            <SidebarItem 
              icon={<FiSettings size={20} />}
              text="Settings"
              active={activeTab === 'settings'}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('settings')}
            />
          </ul>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <SidebarItem 
            icon={<FiLogOut size={20} />}
            text="Logout"
            collapsed={sidebarCollapsed}
            onClick={() => console.log("Logout")}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activeTab}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500 hover:text-gray-700">
                <FiBell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <span>AD</span>
                </div>
                {!sidebarCollapsed && <span className="text-sm font-medium">Admin</span>}
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

// Reusable Components
const SidebarItem = ({ icon, text, active, collapsed, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
          ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <span>{icon}</span>
        {!collapsed && <span>{text}</span>}
      </button>
    </li>
  );
};

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} p-6 rounded-lg shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-white shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

const Star = ({ filled }) => {
  return (
    <svg
      className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
};

export default RestaurantDashboard;