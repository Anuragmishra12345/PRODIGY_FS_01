import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, User, Shield, Clock, Mail, Settings, Activity, Lock,
  Bell, CheckCircle, AlertCircle, Calendar, Zap
} from 'lucide-react';
import ChangePassword from './ChangePassword';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [lastLogin, setLastLogin] = useState('Today at 10:30 AM');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role === 'admin') {
      navigate('/admin');
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-slate-900 to-dark flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-slate-900 to-dark">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}!</h1>
            <p className="text-gray-400 text-sm">Manage your account and preferences</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Account Status */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Account Status</h3>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">Active</p>
            <p className="text-green-400 text-xs mt-2">All systems operational</p>
          </div>

          {/* Email Status */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Email Verified</h3>
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">Confirmed</p>
            <p className="text-blue-400 text-xs mt-2">Ready to use</p>
          </div>

          {/* Last Login */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Last Login</h3>
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">Today</p>
            <p className="text-yellow-400 text-xs mt-2">{lastLogin}</p>
          </div>

          {/* Account Type */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Account Type</h3>
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white capitalize">{user.role}</p>
            <p className="text-purple-400 text-xs mt-2">Standard user</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Account Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-white">Account Information</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Full Name</p>
                    <p className="text-white font-semibold">{user.name}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Email Address</p>
                    <p className="text-white font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Account ID</p>
                    <p className="text-white font-semibold text-xs">{user.id || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Member Since</p>
                    <p className="text-white font-semibold">2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Lock className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-bold text-white">Security Settings</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Password</p>
                      <p className="text-gray-400 text-sm">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsChangePasswordOpen(true)}
                    className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium"
                  >
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-gray-400 text-sm">Disabled</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors text-sm font-medium">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">Login Notifications</p>
                      <p className="text-gray-400 text-sm">Enabled</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              </div>

              <div className="space-y-3">
                {[
                  { action: 'Logged in', time: 'Today at 10:30 AM', icon: CheckCircle, color: 'green' },
                  { action: 'Account created', time: '2 months ago', icon: Calendar, color: 'blue' },
                  { action: 'Profile updated', time: '1 month ago', icon: User, color: 'purple' },
                ].map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                      <Icon className={`w-5 h-5 text-${activity.color}-400`} />
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-medium"
                >
                  <Lock className="w-5 h-5" />
                  Change Password
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-colors font-medium">
                  <Mail className="w-5 h-5" />
                  Update Email
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors font-medium">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors font-medium">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-medium">
                  <AlertCircle className="w-5 h-5" />
                  Deactivate Account
                </button>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <strong>Pro Tip:</strong> Enable two-factor authentication for enhanced account security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Change Password Modal */}
      <ChangePassword
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
};

export default UserDashboard;
