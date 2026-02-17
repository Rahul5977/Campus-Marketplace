import { useState } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { User, Mail, Phone, MapPin, Calendar, Lock, Save } from 'lucide-react';

const Profile = () => {
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: 'Rahul',
    lastName: 'Kumar',
    email: 'rahul.k@iitbhilai.ac.in',
    phone: '+91 9876543210',
    address: 'Hostel B, Room 402, IIT Bhilai',
    dob: '2002-05-15',
    studentId: '2024CS123'
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle save profile changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save profile changes
    console.log('Saving profile changes:', profileData);
    // You can add toast notification here
    alert('Profile changes saved (demo)');
  };

  // Handle cancel
  const handleCancel = (e) => {
    e.preventDefault();
    // Reset to original values (hardcoded for demo)
    setProfileData({
      firstName: 'Rahul',
      lastName: 'Kumar',
      email: 'rahul.k@iitbhilai.ac.in',
      phone: '+91 9876543210',
      address: 'Hostel B, Room 402, IIT Bhilai',
      dob: '2002-05-15',
      studentId: '2024CS123'
    });
    console.log('Changes cancelled');
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // TODO: Implement password update logic with validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Updating password:', passwordData);
    // Clear password fields after update
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Password updated (demo)');
  };

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
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.firstName.toLowerCase()}`} 
                      alt="avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow-sm">
                    <User size={16} />
                  </button>
                </div>
                <h3 className="font-bold text-lg mt-4">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-sm text-gray-500">CSE 2024 • IIT Bhilai</p>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">f</div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-400">t</div>
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">ig</div>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-emerald-600" />
                  Change Password
                </h3>
                <form onSubmit={handlePasswordUpdate} className="space-y-3">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Edit Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold mb-6">Profile Information</h2>
                <form onSubmit={handleSaveChanges}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                          type="date"
                          name="dob"
                          value={profileData.dob}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                      <input
                        type="text"
                        name="studentId"
                        value={profileData.studentId}
                        readOnly
                        className="w-full px-4 py-2 border bg-gray-50 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 transition"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
