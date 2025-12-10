import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Shield, Clock, Mail, Settings, Activity, Lock, Bell, FileText, BarChart3, Key } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!storedUser || !token) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-slate-900 to-dark flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-slate-700 border-t-secondary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-slate-900 to-dark">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SecureAuth</h1>
              <p className="text-xs text-gray-400">Professional Identity Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Banner */}
        <div className="mb-12 card border-l-4 border-l-primary bg-gradient-to-r from-slate-800/50 to-primary/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{user.name}!</span></h2>
              <p className="text-gray-400">You're successfully authenticated to the SecureAuth platform</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-secondary animate-float" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Status Card */}
          <div className="card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">Login Status</h3>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">Active</p>
            <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Connected
            </p>
          </div>

          {/* Account Status */}
          <div className="card hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">Account Status</h3>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">Verified</p>
            <p className="text-xs text-blue-400 mt-2">✓ Secure & Protected</p>
          </div>

          {/* Last Login */}
          <div className="card hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">Last Login</h3>
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">Today</p>
            <p className="text-xs text-yellow-400 mt-2">2 minutes ago</p>
          </div>

          {/* Role */}
          <div className="card hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">User Role</h3>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white capitalize">{user.role}</p>
            <p className="text-xs text-purple-400 mt-2">Authorized Access</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Information */}
          <div className="lg:col-span-2 card">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              Account Information
            </h3>
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-3 font-semibold">Full Name</label>
                <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors">
                  <p className="text-white font-semibold text-lg">{user.name}</p>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-400 mb-3 font-semibold">Email Address</label>
                <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                  <p className="text-white font-semibold text-lg break-all">{user.email}</p>
                </div>
              </div>

              {/* Member Since */}
              <div>
                <label className="block text-sm text-gray-400 mb-3 font-semibold">Member Since</label>
                <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                  <p className="text-white font-semibold text-lg">December 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-secondary" />
              </div>
              Security
            </h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 group">
                <Lock className="w-4 h-4 group-hover:text-secondary transition-colors" />
                Change Password
              </button>
              <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 group">
                <Key className="w-4 h-4 group-hover:text-secondary transition-colors" />
                Enable 2FA
              </button>
              <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 group">
                <Bell className="w-4 h-4 group-hover:text-secondary transition-colors" />
                Notifications
              </button>
              {user.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
                >
                  <BarChart3 className="w-5 h-5" />
                  Admin Panel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="mt-12 card">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Activity className="w-6 h-6 text-secondary" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/20 border border-slate-600 rounded-lg flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">Account Login</p>
                <p className="text-sm text-gray-400">You logged in from your device</p>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </div>
            </div>
            <div className="p-4 bg-slate-700/20 border border-slate-600 rounded-lg flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">Account Verified</p>
                <p className="text-sm text-gray-400">Your email has been verified</p>
                <p className="text-xs text-gray-500 mt-1">Today at 10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;