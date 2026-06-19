// import React, { useState, useEffect } from 'react';
// import { 
//   getAllVoters, 
//   verifyVoter, 
//   getVotersByConstituency, 
//   getAllConstituencies,
//   updateVoter,
//   deleteVoter,
//   searchVoters,
//   searchVotersByConstituencyAndKeyword
// } from '../../services/admin.service';
// import { Voter, Constituency } from '../../types';
// import { 
//   CheckCircle, 
//   Search, 
//   Filter, 
//   Edit2, 
//   Trash2, 
//   Save, 
//   X,
//   RefreshCw,
//   UserCheck
// } from 'lucide-react';
// import toast from 'react-hot-toast';

// const ManageVoters: React.FC = () => {
//   const [voters, setVoters] = useState<Voter[]>([]);
//   const [constituencies, setConstituencies] = useState<Constituency[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedConstituency, setSelectedConstituency] = useState<number | null>(null);
//   const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [editingVoter, setEditingVoter] = useState<Voter | null>(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<Voter | null>(null);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const [votersData, constituenciesData] = await Promise.all([
//         getAllVoters(),
//         getAllConstituencies()
//       ]);
//       setVoters(votersData);
//       setConstituencies(constituenciesData);
//     } catch (error) {
//       console.error('Failed to load data:', error);
//       toast.error('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     loadData();
//   }, []);

//   const loadVotersByConstituency = async (constituencyId: number) => {
//     setLoading(true);
//     try {
//       const data = await getVotersByConstituency(constituencyId);
//       setVoters(data);
//     } catch (error) {
//       console.error('Failed to load voters:', error);
//       toast.error('Failed to load voters');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchKeyword.trim()) {
//       if (selectedConstituency) {
//         loadVotersByConstituency(selectedConstituency);
//       } else {
//         loadData();
//       }
//       return;
//     }
    
//     setLoading(true);
//     try {
//       let data: Voter[];
//       if (selectedConstituency) {
//         // Search within the selected constituency
//         data = await searchVotersByConstituencyAndKeyword(selectedConstituency, searchKeyword);
//       } else {
//         // Global search
//         data = await searchVoters(searchKeyword);
//       }
//       setVoters(data);
//     } catch (error) {
//       console.error('Search failed:', error);
//       toast.error('Search failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConstituencyFilter = (constituencyId: number | null) => {
//     setSelectedConstituency(constituencyId);
//     if (constituencyId) {
//       loadVotersByConstituency(constituencyId);
//     } else {
//       loadData();
//     }
//   };

//   const handleVerify = async (voterId: number) => {
//     try {
//       await verifyVoter(voterId);
//       toast.success('Voter verified successfully');
//       if (selectedConstituency) {
//         loadVotersByConstituency(selectedConstituency);
//       } else {
//         loadData();
//       }
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : String(error);
//       toast.error(message || 'Failed to verify voter');
//     }
//   };

//   const handleUpdateVoter = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingVoter) return;

//     try {
//       const constituencyId = typeof editingVoter.constituency === 'object' 
//         ? editingVoter.constituency?.id 
//         : editingVoter.constituency;
      
//       await updateVoter(editingVoter.id, {
//         name: editingVoter.name,
//         fatherName: editingVoter.fatherName,
//         dateOfBirth: editingVoter.dateOfBirth,
//         address: editingVoter.address,
//         city: editingVoter.city,
//         pincode: editingVoter.pincode,
//         email: editingVoter.email,
//         constituencyId: constituencyId
//       });
//       toast.success('Voter updated successfully');
//       setShowEditModal(false);
//       setEditingVoter(null);
//       if (selectedConstituency) {
//         loadVotersByConstituency(selectedConstituency);
//       } else {
//         loadData();
//       }
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : String(error);
//       toast.error(message || 'Failed to update voter');
//     }
//   };
// interface DeleteError {
//   response?: {
//     data?: {
//       message?: string;
//       error?: string;
//     };
//     status?: number;
//   };
//   message?: string;
// }

// const handleDeleteVoter = async (): Promise<void> => {
//   if (!showDeleteConfirm) return;

//   console.log("🗑️ Attempting to delete voter:", showDeleteConfirm);
//   console.log("Voter ID:", showDeleteConfirm.id);
//   console.log("Voter Name:", showDeleteConfirm.name);

//   try {
//     const response = await deleteVoter(showDeleteConfirm.id);
//     console.log("✅ Delete response:", response);
//     toast.success('Voter deleted successfully');
//     setShowDeleteConfirm(null);
//     await loadData();
//   } catch (err) {
//     const error = err as DeleteError;
//     console.error("❌ Delete failed:", error);
    
//     const errorMessage = error.response?.data?.message || 
//                         error.response?.data?.error || 
//                         error.message || 
//                         'Failed to delete voter';
//     toast.error(errorMessage);
//   }
// };

//   const filteredVoters = voters.filter(voter => {
//     if (filter === 'verified') return voter.verified;
//     if (filter === 'unverified') return !voter.verified;
//     return true;
//   });

//   const verifiedCount = voters.filter(v => v.verified).length;
//   const unverifiedCount = voters.filter(v => !v.verified).length;

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
//         <span className="ml-2 text-gray-600">Loading voters...</span>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-6">Manage Voters</h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-blue-50 rounded-lg p-4">
//           <p className="text-sm text-blue-600">Total Voters</p>
//           <p className="text-2xl font-bold text-blue-700">{voters.length}</p>
//         </div>
//         <div className="bg-green-50 rounded-lg p-4">
//           <p className="text-sm text-green-600">Verified</p>
//           <p className="text-2xl font-bold text-green-700">{verifiedCount}</p>
//         </div>
//         <div className="bg-yellow-50 rounded-lg p-4">
//           <p className="text-sm text-yellow-600">Pending Verification</p>
//           <p className="text-2xl font-bold text-yellow-700">{unverifiedCount}</p>
//         </div>
//         <div className="bg-purple-50 rounded-lg p-4">
//           <p className="text-sm text-purple-600">Visible Voters</p>
//           <p className="text-2xl font-bold text-purple-700">{filteredVoters.length}</p>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <div className="flex-1 min-w-[200px]">
//           <div className="flex">
//             <input
//               type="text"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               placeholder="Search by Voter ID, Name, Email..."
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
//             >
//               <Search className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Filter className="w-5 h-5 text-gray-500" />
//           <select
//             value={selectedConstituency || ''}
//             onChange={(e) => handleConstituencyFilter(e.target.value ? parseInt(e.target.value) : null)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Constituencies</option>
//             {constituencies.map(c => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>
//         </div>

//         <div className="flex space-x-2">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-3 py-2 rounded-lg transition ${
//               filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter('verified')}
//             className={`px-3 py-2 rounded-lg transition ${
//               filter === 'verified' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             Verified
//           </button>
//           <button
//             onClick={() => setFilter('unverified')}
//             className={`px-3 py-2 rounded-lg transition ${
//               filter === 'unverified' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             Unverified
//           </button>
//         </div>

//         <button
//           onClick={loadData}
//           className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//         >
//           <RefreshCw className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Voters Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left">Voter ID</th>
//               <th className="px-4 py-3 text-left">Name</th>
//               <th className="px-4 py-3 text-left">Father's Name</th>
//               <th className="px-4 py-3 text-left">Constituency</th>
//               <th className="px-4 py-3 text-left">Email</th>
//               <th className="px-4 py-3 text-center">Status</th>
//               <th className="px-4 py-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredVoters.map(voter => (
//               <tr key={voter.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-3 font-medium">{voter.voterId}</td>
//                 <td className="px-4 py-3">{voter.name}</td>
//                 <td className="px-4 py-3">{voter.fatherName || '-'}</td>
//                 <td className="px-4 py-3">{voter.constituency?.name || '-'}</td>
//                 <td className="px-4 py-3">{voter.email}</td>
//                 <td className="px-4 py-3 text-center">
//                   {voter.verified ? (
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                       <CheckCircle className="w-3 h-3 mr-1" />
//                       Verified
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                       Pending
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <div className="flex items-center justify-center space-x-2">
//                     {/* View Details Button */}
//                     <button
//                       onClick={() => {
//                         setEditingVoter(voter);
//                         setShowEditModal(true);
//                       }}
//                       className="text-blue-600 hover:text-blue-800 transition"
//                       title="View/Edit Details"
//                     >
//                       <Edit2 className="w-5 h-5" />
//                     </button>
                    
//                     {/* Verify Button (only for unverified) */}
//                     {!voter.verified && (
//                       <button
//                         onClick={() => handleVerify(voter.id)}
//                         className="text-green-600 hover:text-green-800 transition"
//                         title="Verify Voter"
//                       >
//                         <UserCheck className="w-5 h-5" />
//                       </button>
//                     )}
                    
//                     {/* Delete Button */}
//                     <button
//                       onClick={() => setShowDeleteConfirm(voter)}
//                       className="text-red-600 hover:text-red-800 transition"
//                       title="Delete Voter"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         {filteredVoters.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             No voters found matching your criteria.
//           </div>
//         )}
//       </div>

//       {/* Edit Voter Modal */}
//       {showEditModal && editingVoter && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//           <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">Edit Voter</h3>
//               <button
//                 onClick={() => {
//                   setShowEditModal(false);
//                   setEditingVoter(null);
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <form onSubmit={handleUpdateVoter} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Voter ID
//                   </label>
//                   <input
//                     type="text"
//                     value={editingVoter.voterId}
//                     disabled
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     value={editingVoter.name}
//                     onChange={(e) => setEditingVoter({ ...editingVoter, name: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Father's Name
//                   </label>
//                   <input
//                     type="text"
//                     value={editingVoter.fatherName || ''}
//                     onChange={(e) => setEditingVoter({ ...editingVoter, fatherName: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     value={editingVoter.dateOfBirth || ''}
//                     onChange={(e) => setEditingVoter({ ...editingVoter, dateOfBirth: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     value={editingVoter.address || ''}
//                     onChange={(e) => setEditingVoter({ ...editingVoter, address: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     value={editingVoter.city || ''}
//                     onChange={(e) => setEditingVoter({ ...editingVoter, city: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Pincode
//                   </label>
//                   <input
//                     type="text"
//                     value={editingVoter.pincode || ''}
//                     onChange={(e) => setEditingVoter({ ...editingVoter, pincode: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     value={editingVoter.email}
//                     onChange={(e) => setEditingVoter({ ...editingVoter, email: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Constituency
//                   </label>
//                   <select
//                     value={editingVoter.constituency?.id || ''}
//                     onChange={(e) => {
//                       const constituency = constituencies.find(c => c.id === parseInt(e.target.value));
//                       if (constituency) {
//                         setEditingVoter({ ...editingVoter, constituency });
//                       }
//                     }}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Constituency</option>
//                     {constituencies.map(c => (
//                       <option key={c.id} value={c.id}>{c.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="flex space-x-3 pt-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   <Save className="w-4 h-4 inline mr-1" />
//                   Save Changes
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowEditModal(false);
//                     setEditingVoter(null);
//                   }}
//                   className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
//             <div className="text-center">
//               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//                 <Trash2 className="h-6 w-6 text-red-600" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Voter</h3>
//               <p className="text-sm text-gray-500 mb-4">
//                 Are you sure you want to delete <span className="font-semibold">{showDeleteConfirm.name}</span>? 
//                 This action cannot be undone and will also delete the user account.
//               </p>
//               <div className="flex space-x-3">
//                 <button
//                   onClick={handleDeleteVoter}
//                   className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteConfirm(null)}
//                   className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageVoters;
import React, { useState, useEffect, useCallback } from 'react';
import { 
  getAllVoters, 
  verifyVoter, 
  getVotersByConstituency, 
  getAllConstituencies,
  updateVoter,
  deleteVoter,
  searchVoters,
  deleteAllVoters,
  deleteVotersByConstituency,
  deleteVotersByStatus,
  searchVotersByConstituencyAndKeyword
} from '../../services/admin.service';
import { Voter, Constituency } from '../../types';
import { 
  CheckCircle, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  RefreshCw,
  UserCheck,
  Trash,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface DeleteError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message?: string;
}

const ManageVoters: React.FC = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConstituency, setSelectedConstituency] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editingVoter, setEditingVoter] = useState<Voter | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Voter | null>(null);
  
  // Delete All States
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState<'all' | 'byConstituency' | 'byStatus'>('all');
  const [selectedDeleteConstituency, setSelectedDeleteConstituency] = useState<number | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<'verified' | 'unverified'>('unverified');

 const loadData = useCallback(async () => {
  setLoading(true);
  try {
    const [votersData, constituenciesData] = await Promise.all([
      getAllVoters(),
      getAllConstituencies()
    ]);
    setVoters(votersData);
    setConstituencies(constituenciesData);
  } catch (error) {
    console.error('Failed to load data:', error);
    toast.error('Failed to load data');
  } finally {
    setLoading(false);
  }
}, []); // Empty dependency array

useEffect(() => {
  loadData();
}, [loadData]);

  // useEffect(() => {
  //   loadData();
  // }, []);

  const loadVotersByConstituency = async (constituencyId: number) => {
    setLoading(true);
    try {
      const data = await getVotersByConstituency(constituencyId);
      setVoters(data);
    } catch (error) {
      console.error('Failed to load voters:', error);
      toast.error('Failed to load voters');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
  if (!searchKeyword.trim()) {
    if (selectedConstituency) {
      await loadVotersByConstituency(selectedConstituency);
    } else {
      await loadData();
    }
    return;
  }
  
  setLoading(true);
  try {
    let data: Voter[];
    if (selectedConstituency) {
      // Search within selected constituency
      data = await searchVotersByConstituencyAndKeyword(selectedConstituency, searchKeyword);
    } else {
      // Global search
      data = await searchVoters(searchKeyword);
    }
    setVoters(data);
    console.log(`✅ Search found ${data.length} voters`);
  } catch (error) {
    console.error('Search failed:', error);
    toast.error('Search failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const handleConstituencyFilter = (constituencyId: number | null) => {
    setSelectedConstituency(constituencyId);
    if (constituencyId) {
      loadVotersByConstituency(constituencyId);
    } else {
      loadData();
    }
  };

  const handleVerify = async (voterId: number) => {
    try {
      await verifyVoter(voterId);
      toast.success('Voter verified successfully');
      if (selectedConstituency) {
        loadVotersByConstituency(selectedConstituency);
      } else {
        loadData();
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Failed to verify voter');
    }
  };

  const handleUpdateVoter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVoter) return;

    try {
      const constituencyId = typeof editingVoter.constituency === 'object' 
        ? editingVoter.constituency?.id 
        : editingVoter.constituency;
      
      await updateVoter(editingVoter.id, {
        name: editingVoter.name,
        fatherName: editingVoter.fatherName,
        dateOfBirth: editingVoter.dateOfBirth,
        address: editingVoter.address,
        city: editingVoter.city,
        pincode: editingVoter.pincode,
        email: editingVoter.email,
        constituencyId: constituencyId
      });
      toast.success('Voter updated successfully');
      setShowEditModal(false);
      setEditingVoter(null);
      if (selectedConstituency) {
        loadVotersByConstituency(selectedConstituency);
      } else {
        loadData();
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Failed to update voter');
    }
  };

  const handleDeleteVoter = async (): Promise<void> => {
    if (!showDeleteConfirm) return;

    console.log("🗑️ Attempting to delete voter:", showDeleteConfirm);
    console.log("Voter ID:", showDeleteConfirm.id);
    console.log("Voter Name:", showDeleteConfirm.name);

    try {
      await deleteVoter(showDeleteConfirm.id);
      toast.success('Voter deleted successfully');
      setShowDeleteConfirm(null);
      await loadData();
    } catch (err) {
      const error = err as DeleteError;
      console.error("❌ Delete failed:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to delete voter';
      toast.error(errorMessage);
    }
  };

  // ✅ DELETE ALL VOTERS
  const handleDeleteAllVoters = async () => {
    try {
      await deleteAllVoters();
      toast.success('All voters deleted successfully');
      setShowDeleteAllConfirm(false);
      setSelectedDeleteConstituency(null);
      loadData();
    } catch (err) {
      const error = err as DeleteError;
      toast.error(error.response?.data?.error || 'Failed to delete all voters');
    }
  };

  // ✅ DELETE VOTERS BY CONSTITUENCY
  const handleDeleteByConstituency = async () => {
    if (!selectedDeleteConstituency) {
      toast.error('Please select a constituency');
      return;
    }
    
    try {
      await deleteVotersByConstituency(selectedDeleteConstituency);
      toast.success('Voters deleted successfully for this constituency');
      setShowDeleteAllConfirm(false);
      setSelectedDeleteConstituency(null);
      loadData();
    } catch (err) {
      const error = err as DeleteError;
      toast.error(error.response?.data?.error || 'Failed to delete voters');
    }
  };

  // ✅ DELETE VOTERS BY STATUS
  const handleDeleteByStatus = async () => {
    try {
      const isVerified = deleteStatus === 'verified';
      await deleteVotersByStatus(isVerified);
      toast.success(`${deleteStatus} voters deleted successfully`);
      setShowDeleteAllConfirm(false);
      loadData();
    } catch (err) {
      const error = err as DeleteError;
      toast.error(error.response?.data?.error || 'Failed to delete voters');
    }
  };

  const handleDeleteConfirmation = () => {
    if (deleteType === 'all') {
      handleDeleteAllVoters();
    } else if (deleteType === 'byConstituency') {
      handleDeleteByConstituency();
    } else if (deleteType === 'byStatus') {
      handleDeleteByStatus();
    }
  };

  const filteredVoters = voters.filter(voter => {
    if (filter === 'verified') return voter.verified;
    if (filter === 'unverified') return !voter.verified;
    return true;
  });

  const verifiedCount = voters.filter(v => v.verified).length;
  const unverifiedCount = voters.filter(v => !v.verified).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading voters...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Voters</h2>
        
        {/* Delete All Button Group */}
        <div className="flex space-x-2">
          {/* Delete Unverified Button - Quick Action */}
          {unverifiedCount > 0 && (
            <button
              onClick={() => {
                setDeleteType('byStatus');
                setDeleteStatus('unverified');
                setShowDeleteAllConfirm(true);
              }}
              className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
            >
              <Trash className="w-4 h-4" />
              <span>Delete Unverified ({unverifiedCount})</span>
            </button>
          )}
          
          {/* Delete All Button */}
          {voters.length > 0 && (
            <button
              onClick={() => {
                setDeleteType('all');
                setShowDeleteAllConfirm(true);
              }}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <Trash className="w-4 h-4" />
              <span>Delete All Voters</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600">Total Voters</p>
          <p className="text-2xl font-bold text-blue-700">{voters.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600">Verified</p>
          <p className="text-2xl font-bold text-green-700">{verifiedCount}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-sm text-yellow-600">Pending Verification</p>
          <p className="text-2xl font-bold text-yellow-700">{unverifiedCount}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-600">Visible Voters</p>
          <p className="text-2xl font-bold text-purple-700">{filteredVoters.length}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="flex">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by Voter ID, Name, Email..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedConstituency || ''}
            onChange={(e) => handleConstituencyFilter(e.target.value ? parseInt(e.target.value) : null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Constituencies</option>
            {constituencies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-lg transition ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`px-3 py-2 rounded-lg transition ${
              filter === 'verified' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilter('unverified')}
            className={`px-3 py-2 rounded-lg transition ${
              filter === 'unverified' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Unverified
          </button>
        </div>

        <button
          onClick={loadData}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Voters Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Voter ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Father's Name</th>
              <th className="px-4 py-3 text-left">Constituency</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVoters.map(voter => (
              <tr key={voter.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{voter.voterId}</td>
                <td className="px-4 py-3">{voter.name}</td>
                <td className="px-4 py-3">{voter.fatherName || '-'}</td>
                <td className="px-4 py-3">{voter.constituency?.name || '-'}</td>
                <td className="px-4 py-3">{voter.email}</td>
                <td className="px-4 py-3 text-center">
                  {voter.verified ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingVoter(voter);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="View/Edit Details"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    
                    {!voter.verified && (
                      <button
                        onClick={() => handleVerify(voter.id)}
                        className="text-green-600 hover:text-green-800 transition"
                        title="Verify Voter"
                      >
                        <UserCheck className="w-5 h-5" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => setShowDeleteConfirm(voter)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Voter"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredVoters.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No voters found matching your criteria.
          </div>
        )}
      </div>

      {/* Edit Voter Modal - Keep as is */}
      {showEditModal && editingVoter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Voter</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingVoter(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateVoter} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voter ID</label>
                  <input type="text" value={editingVoter.voterId} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" value={editingVoter.name} onChange={(e) => setEditingVoter({ ...editingVoter, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <input type="text" value={editingVoter.fatherName || ''} onChange={(e) => setEditingVoter({ ...editingVoter, fatherName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" value={editingVoter.dateOfBirth || ''} onChange={(e) => setEditingVoter({ ...editingVoter, dateOfBirth: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" value={editingVoter.address || ''} onChange={(e) => setEditingVoter({ ...editingVoter, address: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" value={editingVoter.city || ''} onChange={(e) => setEditingVoter({ ...editingVoter, city: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input type="text" value={editingVoter.pincode || ''} onChange={(e) => setEditingVoter({ ...editingVoter, pincode: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={editingVoter.email} onChange={(e) => setEditingVoter({ ...editingVoter, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
                  <select
                    value={editingVoter.constituency?.id || ''}
                    onChange={(e) => {
                      const constituency = constituencies.find(c => c.id === parseInt(e.target.value));
                      if (constituency) {
                        setEditingVoter({ ...editingVoter, constituency });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Constituency</option>
                    {constituencies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  <Save className="w-4 h-4 inline mr-1" /> Save Changes
                </button>
                <button type="button" onClick={() => { setShowEditModal(false); setEditingVoter(null); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Individual Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Voter</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete <span className="font-semibold">{showDeleteConfirm.name}</span>? 
                This action cannot be undone and will also delete the user account and all votes cast by this voter.
              </p>
              <div className="flex space-x-3">
                <button onClick={handleDeleteVoter} className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">Delete</button>
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mass Delete Confirmation Modal */}
      {showDeleteAllConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {deleteType === 'all' && 'Delete All Voters'}
                {deleteType === 'byConstituency' && 'Delete Voters by Constituency'}
                {deleteType === 'byStatus' && `Delete ${deleteStatus === 'verified' ? 'Verified' : 'Unverified'} Voters`}
              </h3>
              
              <p className="text-sm text-gray-500 mb-4">
                {deleteType === 'all' && `Are you sure you want to delete ALL ${voters.length} voters? This action cannot be undone and will also delete all associated user accounts and votes.`}
                {deleteType === 'byConstituency' && 'Select a constituency to delete all voters from that area.'}
                {deleteType === 'byStatus' && `Are you sure you want to delete all ${deleteStatus} voters? This action cannot be undone.`}
              </p>

              {deleteType === 'byConstituency' && (
                <div className="mb-4">
                  <select
                    value={selectedDeleteConstituency || ''}
                    onChange={(e) => setSelectedDeleteConstituency(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Constituency</option>
                    {constituencies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {deleteType === 'byStatus' && (
                <div className="mb-4">
                  <select
                    value={deleteStatus}
                    onChange={(e) => setDeleteStatus(e.target.value as 'verified' | 'unverified')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="unverified">Unverified Voters ({unverifiedCount})</option>
                    <option value="verified">Verified Voters ({verifiedCount})</option>
                  </select>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteConfirmation}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => {
                    setShowDeleteAllConfirm(false);
                    setSelectedDeleteConstituency(null);
                  }}
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

export default ManageVoters;