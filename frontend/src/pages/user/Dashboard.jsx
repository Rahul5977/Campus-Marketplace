 
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { TrendingUp, Package, Users, DollarSign, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
 
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Sales" 
              value="₹12,450" 
              trend="+14%" 
              icon={DollarSign} 
              color="emerald"
            />
            <StatCard 
              title="Active Listings" 
              value="24" 
              trend="+3" 
              icon={Package} 
              color="blue"
            />
            <StatCard 
              title="Total Orders" 
              value="156" 
              trend="+12%" 
              icon={ShoppingBag} 
              color="purple"
            />
            <StatCard 
              title="Campus Views" 
              value="1.2k" 
              trend="+8%" 
              icon={Users} 
              color="amber"
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div>
                      <p className="font-medium">#ORD-2024-00{i}</p>
                      <p className="text-sm text-gray-500">2 items • ₹{(i*350).toFixed(2)}</p>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Delivered</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Top Products</h3>
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                    <div className="flex-1">
                      <p className="font-medium">Introduction to Algorithms</p>
                      <p className="text-xs text-gray-500">Sold {20-i} times</p>
                    </div>
                    <span className="font-bold text-emerald-600">₹{850 - i*100}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div> 
    </div>
  );
};

const StatCard = ({ title, value, trend, icon: Icon, color }) => {
  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <p className="text-xs text-emerald-600 mt-2">{trend} from last month</p>
    </div>
  );
};

export default Dashboard;