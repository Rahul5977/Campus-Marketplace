import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  List, 
  CreditCard, 
  User,
  LogOut
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/products/add', icon: PlusCircle, label: 'Add Product' },
  { path: '/products', icon: List, label: 'My Products' },
  { path: '/transactions', icon: CreditCard, label: 'Transactions' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 hidden lg:block">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
        <p className="text-xs text-gray-400">Manage your campus store</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-600 font-medium shadow-sm border border-emerald-100'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-8 w-44">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl w-full">
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;