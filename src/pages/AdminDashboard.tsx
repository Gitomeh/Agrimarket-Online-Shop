import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useLocation } from 'wouter';
import { mockFarmers } from '../data/mockData';
import { Farmer } from '../types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  LogOut, 
  Users,
  MapPin,
  Star,
  Package
} from 'lucide-react';

export function AdminDashboard() {
  const { isAdmin, logout } = useAdmin();
  const [, navigate] = useLocation();
  const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);
  const [newFarmer, setNewFarmer] = useState<Partial<Farmer>>({
    name: '',
    location: '',
    rating: 4.5,
    products: 0,
    image: '',
    description: '',
    verified: false
  });

  if (!isAdmin) {
    window.location.href = '/admin/login';
    return null;
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleAddFarmer = () => {
    if (newFarmer.name && newFarmer.location && newFarmer.description) {
      const farmer: Farmer = {
        id: (farmers.length + 1).toString(),
        name: newFarmer.name,
        location: newFarmer.location,
        rating: newFarmer.rating || 4.5,
        products: newFarmer.products || 0,
        image: newFarmer.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        description: newFarmer.description,
        verified: newFarmer.verified || false
      };
      setFarmers([...farmers, farmer]);
      setNewFarmer({
        name: '',
        location: '',
        rating: 4.5,
        products: 0,
        image: '',
        description: '',
        verified: false
      });
      setShowAddModal(false);
    }
  };

  const handleVerifyFarmer = (id: string) => {
    setFarmers(farmers.map(f => 
      f.id === id ? { ...f, verified: !f.verified } : f
    ));
  };

  const handleRemoveFarmer = (id: string) => {
    if (confirm('Are you sure you want to remove this farmer?')) {
      setFarmers(farmers.filter(f => f.id !== id));
    }
  };

  const handleEditFarmer = (farmer: Farmer) => {
    setEditingFarmer(farmer);
    setNewFarmer(farmer);
    setShowAddModal(true);
  };

  const handleUpdateFarmer = () => {
    if (editingFarmer && newFarmer.name && newFarmer.location) {
      setFarmers(farmers.map(f => 
        f.id === editingFarmer.id 
          ? { 
              ...f, 
              name: newFarmer.name || f.name,
              location: newFarmer.location || f.location,
              rating: newFarmer.rating || f.rating,
              products: newFarmer.products || f.products,
              image: newFarmer.image || f.image,
              description: newFarmer.description || f.description,
              verified: newFarmer.verified !== undefined ? newFarmer.verified : f.verified
            } 
          : f
      ));
      setEditingFarmer(null);
      setNewFarmer({
        name: '',
        location: '',
        rating: 4.5,
        products: 0,
        image: '',
        description: '',
        verified: false
      });
      setShowAddModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingFarmer(null);
    setNewFarmer({
      name: '',
      location: '',
      rating: 4.5,
      products: 0,
      image: '',
      description: '',
      verified: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-green-600">Admin Dashboard</h1>
              <span className="text-sm text-gray-500">Manage Farmers & Products</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Farmers</p>
                <p className="text-2xl font-bold text-gray-900">{farmers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Verified Farmers</p>
                <p className="text-2xl font-bold text-gray-900">{farmers.filter(f => f.verified).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{farmers.reduce((sum, f) => sum + f.products, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Farmers List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Farmers Management</h2>
                <p className="text-sm text-gray-600">Add, verify, edit, or remove farmers</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Farmer</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {farmers.map(farmer => (
                  <tr key={farmer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={imageErrors[farmer.id] ? `https://placehold.co/200x200/22c55e/ffffff?text=${encodeURIComponent(farmer.name.split(' ').map(n => n[0]).join(''))}` : farmer.image}
                          alt={farmer.name}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={() => setImageErrors(prev => ({ ...prev, [farmer.id]: true }))}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{farmer.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {farmer.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Star className="w-4 h-4 mr-1 text-amber-500 fill-current" />
                        {farmer.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {farmer.products}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {farmer.verified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                          <XCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVerifyFarmer(farmer.id)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title={farmer.verified ? 'Revoke verification' : 'Verify farmer'}
                        >
                          {farmer.verified ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleEditFarmer(farmer)}
                          className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit farmer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveFarmer(farmer.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove farmer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingFarmer ? 'Edit Farmer' : 'Add New Farmer'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newFarmer.name || ''}
                  onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Farmer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newFarmer.location || ''}
                  onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="County/Region"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newFarmer.description || ''}
                  onChange={(e) => setNewFarmer({ ...newFarmer, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="Farm description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newFarmer.image || ''}
                  onChange={(e) => setNewFarmer({ ...newFarmer, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={newFarmer.rating || 4.5}
                    onChange={(e) => setNewFarmer({ ...newFarmer, rating: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Products</label>
                  <input
                    type="number"
                    min="0"
                    value={newFarmer.products || 0}
                    onChange={(e) => setNewFarmer({ ...newFarmer, products: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={newFarmer.verified || false}
                  onChange={(e) => setNewFarmer({ ...newFarmer, verified: e.target.checked })}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="verified" className="text-sm text-gray-700">Verified Farmer</label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingFarmer ? handleUpdateFarmer : handleAddFarmer}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingFarmer ? 'Update' : 'Add'} Farmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}