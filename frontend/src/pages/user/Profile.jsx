import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { User, Mail, Phone, MapPin, Calendar, Lock, Save } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
 
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Avatar & Social */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow-sm">
                    <User size={16} />
                  </button>
                </div>
                <h3 className="font-bold text-lg mt-4">Rahul Kumar</h3>
                <p className="text-sm text-gray-500">CSE 2024 • IIT Bhilai</p>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">f</div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-400">t</div>
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">ig</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-emerald-600" />
                  Change Password
                </h3>
                <div className="space-y-3">
                  <input type="password" placeholder="Current password" className="w-full px-4 py-2 border rounded-lg text-sm" />
                  <input type="password" placeholder="New password" className="w-full px-4 py-2 border rounded-lg text-sm" />
                  <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2 border rounded-lg text-sm" />
                  <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Edit Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="text" defaultValue="Rahul" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" defaultValue="Kumar" className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="email" defaultValue="rahul.k@iitbhilai.ac.in" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="tel" defaultValue="+91 9876543210" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="text" defaultValue="Hostel B, Room 402, IIT Bhilai" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="date" defaultValue="2002-05-15" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                    <input type="text" defaultValue="2024CS123" readOnly className="w-full px-4 py-2 border bg-gray-50 rounded-lg" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2">
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
    </div>
  );
};

export default Profile;