import React, { useState, useEffect } from 'react';
import { 
  getAllConstituencies, 
  createConstituency, 
  updateConstituency, 
  deleteConstituency,
  forceDeleteConstituency  // Add this import (you'll need to add this to admin.service.ts)
} from '../../services/admin.service';
import { Constituency } from '../../types';
import { Plus, Edit2, Trash2, Save, X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageConstituencies: React.FC = () => {
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    state: '',
    totalVoters: ''
  });
  
  // New states for force delete
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Constituency | null>(null);
  const [showForceDeleteConfirm, setShowForceDeleteConfirm] = useState<Constituency | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadConstituencies = async () => {
    try {
      const data = await getAllConstituencies();
      setConstituencies(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to load constituencies:', message);
      toast.error('Failed to load constituencies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConstituencies();
  }, []);

  const filteredConstituencies = constituencies.filter((constituency) => {
    const matchesId = searchId.trim()
      ? constituency.id.toString().includes(searchId.trim())
      : true;
    const matchesName = searchName.trim()
      ? constituency.name.toLowerCase().includes(searchName.trim().toLowerCase())
      : true;
    const matchesState = stateFilter.trim()
      ? (constituency.state || '').toLowerCase().includes(stateFilter.trim().toLowerCase())
      : true;
    return matchesId && matchesName && matchesState;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await updateConstituency(editingId, {
          name: formData.name,
          code: formData.code,
          state: formData.state,
          totalVoters: parseInt(formData.totalVoters) || 0
        });
        toast.success('Constituency updated successfully');
      } else {
        await createConstituency({
          name: formData.name,
          code: formData.code,
          state: formData.state,
          totalVoters: parseInt(formData.totalVoters) || 0
        });
        toast.success('Constituency created successfully');
      }
      resetForm();
      loadConstituencies();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (constituency: Constituency) => {
    setFormData({
      name: constituency.name,
      code: constituency.code || '',
      state: constituency.state || '',
      totalVoters: constituency.totalVoters?.toString() || ''
    });
    setEditingId(constituency.id);
    setShowForm(true);
  };

  // ✅ Updated: Handle delete with error checking for associated elections
  const handleDelete = async (constituency: Constituency) => {
    setIsLoading(true);
    try {
      await deleteConstituency(constituency.id);
      toast.success('Constituency deleted successfully');
      setShowDeleteConfirm(null);
      loadConstituencies();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      
      // If error is because constituency has elections, show force delete option
      if (message.includes('associated elections') || error.response?.status === 409) {
        setShowDeleteConfirm(null);
        setShowForceDeleteConfirm(constituency);
      } else {
        toast.error(message || 'Failed to delete');
        setShowDeleteConfirm(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ New: Force delete constituency with all associated data
  const handleForceDelete = async (constituency: Constituency) => {
    setIsLoading(true);
    try {
      await forceDeleteConstituency(constituency.id);
      toast.success(`Constituency "${constituency.name}" and all associated elections deleted successfully`);
      setShowForceDeleteConfirm(null);
      loadConstituencies();
    } catch (error: any) {
      const message = error.response?.data?.error || error.message;
      toast.error(message || 'Failed to force delete constituency');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', code: '', state: '', totalVoters: '' });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading constituencies...</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Constituencies</h2>
          <p className="text-gray-500 text-sm mt-1">Search and filter constituencies by ID, name, or state.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          <span>Add Constituency</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Constituency ID</label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Name</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter constituency name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by State</label>
          <input
            type="text"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            placeholder="Enter state"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600">Total Constituencies</p>
          <p className="text-2xl font-bold text-blue-700">{constituencies.length}</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-sm text-indigo-600">Filtered Results</p>
          <p className="text-2xl font-bold text-indigo-700">{filteredConstituencies.length}</p>
        </div>
      </div>

      {/* Constituency List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">State</th>
              <th className="px-4 py-3 text-right">Total Voters</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredConstituencies.map(constituency => (
              <tr key={constituency.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{constituency.id}</td>
                <td className="px-4 py-3 font-medium">{constituency.name}</td>
                <td className="px-4 py-3">{constituency.code || '-'}</td>
                <td className="px-4 py-3">{constituency.state || '-'}</td>
                <td className="px-4 py-3 text-right">{constituency.totalVoters || 0}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleEdit(constituency)}
                    className="text-blue-600 hover:text-blue-700 mr-3 transition"
                    disabled={isLoading}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(constituency)}
                    className="text-red-600 hover:text-red-700 transition"
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredConstituencies.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No constituencies found matching your filters.
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingId ? 'Edit Constituency' : 'Add Constituency'}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Voters
                </label>
                <input
                  type="number"
                  name="totalVoters"
                  value={formData.totalVoters}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 inline mr-1" />
                  {isLoading ? 'Processing...' : (editingId ? 'Update' : 'Save')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (for normal delete attempt) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Constituency</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete <span className="font-semibold">{showDeleteConfirm.name}</span>?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  disabled={isLoading}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Force Delete Confirmation Modal (appears when constituency has elections) */}
      {showForceDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">⚠️ Warning: Constituency Has Elections</h3>
              <p className="text-sm text-gray-500 mb-2">
                Constituency "<span className="font-semibold">{showForceDeleteConfirm.name}</span>" has associated elections.
              </p>
              <p className="text-sm text-red-600 mb-4">
                Force deleting will also delete ALL elections, nominations, votes, and results associated with this constituency.
                This action CANNOT be undone!
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleForceDelete(showForceDeleteConfirm)}
                  disabled={isLoading}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {isLoading ? 'Deleting...' : 'Yes, Force Delete'}
                </button>
                <button
                  onClick={() => setShowForceDeleteConfirm(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageConstituencies;