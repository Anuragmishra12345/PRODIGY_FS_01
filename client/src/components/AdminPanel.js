import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, LogOut, BarChart3, AlertTriangle, CheckCircle, Search, Filter, Edit2, Trash2, UserCheck, Loader } from 'lucide-react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/auth/users',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    active: users.length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-slate-900 to-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-12 h-12 border-4 border-slate-700 border-t-secondary rounded-full"></div>
          <p className="text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-slate-900 to-dark">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-accent to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-accent/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs text-gray-400">User Management System</p>
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
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">User Management</h2>
          <p className="text-gray-400">Manage and monitor all registered users on the platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">Total Users</h3>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-4xl font-bold text-white">{stats.total}</p>
            <p className="text-xs text-gray-400 mt-2">Registered accounts</p>
          </div>

          <div className="card hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">Active Users</h3>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-white">{stats.active}</p>
            <p className="text-xs text-green-400 mt-2">Currently online</p>
          </div>

          <div className="card hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-semibold">Administrators</h3>
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-4xl font-bold text-white">{stats.admins}</p>
            <p className="text-xs text-accent mt-2">Admin accounts</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Users Table Card */}
        <div className="card">
          {/* Header with Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-bold text-white">All Users</h3>
            <div className="w-full sm:w-auto flex gap-3">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>
              <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Name</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Email</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Role</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Status</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Joined</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                            <UserCheck className="w-5 h-5 text-secondary" />
                          </div>
                          <p className="text-white font-medium">{user.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300 text-sm">{user.email}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-primary/20 text-primary'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400 text-sm">Dec 2024</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center">
                      <p className="text-gray-400">No users found matching your search</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="mt-6 pt-6 border-t border-slate-700 flex items-center justify-between text-sm text-gray-400">
            <p>Showing <span className="text-white font-semibold">{filteredUsers.length}</span> of <span className="text-white font-semibold">{stats.total}</span> users</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition-colors">Previous</button>
              <button className="px-3 py-1 bg-primary/30 text-primary rounded">1</button>
              <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;