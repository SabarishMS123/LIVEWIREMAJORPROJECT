// // import React, { useState, useEffect } from 'react';
// // import { getVoterProfile, getActiveElections, hasVoted, getElectionResults } from '../../services/voter.service';
// // import CastVote from './CastVote';
// // import ResultsView from './ResultsView';
// // import { Voter, Election, ElectionResult } from '../../types';
// // import { User, Vote, BarChart3, LogOut } from 'lucide-react';
// // import { useAuth } from '../../contexts/AuthContext';

// // type TabType = 'profile' | 'vote' | 'results';

// // const VoterDashboard: React.FC = () => {
// //   const [activeTab, setActiveTab] = useState<TabType>('vote');
// //   const [profile, setProfile] = useState<Voter | null>(null);
// //   const [elections, setElections] = useState<Election[]>([]);
// //   const [hasVotedStatus, setHasVotedStatus] = useState<Record<number, boolean>>({});
// //   const [results, setResults] = useState<ElectionResult[]>([]);
// //   const { logout } = useAuth();

// //   const loadProfile = async () => {
// //     try {
// //       const data = await getVoterProfile();
// //       setProfile(data);
// //     } catch (error: unknown) {
// //       const message = error instanceof Error ? error.message : String(error);
// //       console.error('Failed to load profile:', message);
// //     }
// //   };

// //   const loadElections = async () => {
// //     try {
// //       const data = await getActiveElections();
// //       setElections(data);
      
// //       // Check voting status for each election
// //       const status: Record<number, boolean> = {};
// //       for (const election of data) {
// //         try {
// //           const voted = await hasVoted(election.id);
// //           status[election.id] = voted;
// //         } catch {
// //           status[election.id] = false;
// //         }
// //       }
// //       setHasVotedStatus(status);
// //     } catch (error: unknown) {
// //       const message = error instanceof Error ? error.message : String(error);
// //       console.error('Failed to load elections:', message);
// //     }
// //   };

// //   useEffect(() => {
// //     // eslint-disable-next-line react-hooks/set-state-in-effect
// //     loadProfile();
// //     loadElections();
// //   }, []);

// //   const loadResults = async (electionId: number) => {
// //     try {
// //       const data = await getElectionResults(electionId);
// //       setResults(data);
// //     } catch (error) {
// //       console.error('Failed to load results:', error);
// //     }
// //   };

// //   const handleVoteCast = async () => {
// //     await loadElections();
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-2xl font-bold text-gray-800">Voter Dashboard</h1>
// //         <button
// //           onClick={logout}
// //           className="flex items-center space-x-2 text-red-600 hover:text-red-700"
// //         >
// //           <LogOut className="w-5 h-5" />
// //           <span>Logout</span>
// //         </button>
// //       </div>

// //       {/* Tabs */}
// //       <div className="flex space-x-2 mb-8 border-b">
// //         <button
// //           onClick={() => setActiveTab('vote')}
// //           className={`flex items-center space-x-2 px-4 py-2 transition ${
// //             activeTab === 'vote'
// //               ? 'border-b-2 border-blue-600 text-blue-600'
// //               : 'text-gray-500 hover:text-gray-700'
// //           }`}
// //         >
// //           <Vote className="w-5 h-5" />
// //           <span>Cast Vote</span>
// //         </button>
// //         <button
// //           onClick={() => setActiveTab('results')}
// //           className={`flex items-center space-x-2 px-4 py-2 transition ${
// //             activeTab === 'results'
// //               ? 'border-b-2 border-blue-600 text-blue-600'
// //               : 'text-gray-500 hover:text-gray-700'
// //           }`}
// //         >
// //           <BarChart3 className="w-5 h-5" />
// //           <span>View Results</span>
// //         </button>
// //         <button
// //           onClick={() => setActiveTab('profile')}
// //           className={`flex items-center space-x-2 px-4 py-2 transition ${
// //             activeTab === 'profile'
// //               ? 'border-b-2 border-blue-600 text-blue-600'
// //               : 'text-gray-500 hover:text-gray-700'
// //           }`}
// //         >
// //           <User className="w-5 h-5" />
// //           <span>Profile</span>
// //         </button>
// //       </div>

// //       {/* Content */}
// //       {activeTab === 'vote' && (
// //         <CastVote
// //           elections={elections}
// //           hasVotedStatus={hasVotedStatus}
// //           onVoteCast={handleVoteCast}
// //         />
// //       )}

// //       {activeTab === 'results' && (
// //         <ResultsView
// //           elections={elections}
// //           results={results}
// //           onSelectElection={loadResults}
// //         />
// //       )}

// //       {activeTab === 'profile' && profile && (
// //         <div className="bg-white rounded-xl shadow-lg p-6">
// //           <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <p className="text-gray-500 text-sm">Voter ID</p>
// //               <p className="font-medium">{profile.voterId}</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500 text-sm">Name</p>
// //               <p className="font-medium">{profile.name}</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500 text-sm">Father's Name</p>
// //               <p className="font-medium">{profile.fatherName}</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500 text-sm">Date of Birth</p>
// //               <p className="font-medium">{profile.dateOfBirth}</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500 text-sm">Address</p>
// //               <p className="font-medium">{profile.address}</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500 text-sm">City</p>
// //               <p className="font-medium">{profile.city}</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500 text-sm">Constituency</p>
// //               <p className="font-medium">{profile.constituency?.name}</p>
// //             </div>
// //             <div>
// //               <p className="text-gray-500 text-sm">Email</p>
// //               <p className="font-medium">{profile.email}</p>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default VoterDashboard;

// import React, { useState, useEffect } from 'react';
// import { getVoterProfile, getActiveElections, hasVoted, getElectionResults } from '../../services/voter.service';
// import CastVote from './CastVote';
// import ResultsView from './ResultsView';
// import { Voter, Election, ElectionResult } from '../../types';
// import { User, Vote, BarChart3, LogOut, RefreshCw } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import toast from 'react-hot-toast';

// type TabType = 'profile' | 'vote' | 'results';

// const VoterDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabType>('vote');
//   const [profile, setProfile] = useState<Voter | null>(null);
//   const [elections, setElections] = useState<Election[]>([]);
//   const [hasVotedStatus, setHasVotedStatus] = useState<Record<number, boolean>>({});
//   const [results, setResults] = useState<ElectionResult[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { logout } = useAuth();

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       await Promise.all([loadProfile(), loadElections()]);
//     } catch (error) {
//       console.error('Failed to load data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadProfile = async () => {
//     try {
//       const data = await getVoterProfile();
//       setProfile(data);
//     } catch (error) {
//       console.error('Failed to load profile:', error);
//       toast.error('Failed to load profile');
//     }
//   };

//   const loadElections = async () => {
//     try {
//       const data = await getActiveElections();
//       console.log('📊 Elections data:', data);
      
//       // Ensure data is an array
//       const electionsArray = Array.isArray(data) ? data : [];
//       setElections(electionsArray);
      
//       // Check voting status for each election
//       const status: Record<number, boolean> = {};
//       for (const election of electionsArray) {
//         // ✅ Get the correct ID field
//         const electionId = election.id || (election as any).electionId;
        
//         if (electionId) {
//           try {
//             const voted = await hasVoted(electionId);
//             status[electionId] = voted;
//           } catch (error) {
//             console.error(`Failed to check voting status for election ${electionId}:`, error);
//             status[electionId] = false;
//           }
//         } else {
//           console.warn('Election missing ID:', election);
//         }
//       }
//       setHasVotedStatus(status);
//     } catch (error) {
//       console.error('Failed to load elections:', error);
//       toast.error('Failed to load elections');
//       setElections([]);
//     }
//   };

//   const loadResults = async (electionId: number) => {
//     try {
//       const data = await getElectionResults(electionId);
//       setResults(data);
//     } catch (error) {
//       console.error('Failed to load results:', error);
//       toast.error('Failed to load results');
//     }
//   };

//   const handleVoteCast = async () => {
//     await loadElections();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
//         <span className="ml-2 text-gray-600">Loading dashboard...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Voter Dashboard</h1>
//         <button
//           onClick={logout}
//           className="flex items-center space-x-2 text-red-600 hover:text-red-700"
//         >
//           <LogOut className="w-5 h-5" />
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-2 mb-8 border-b">
//         <button
//           onClick={() => setActiveTab('vote')}
//           className={`flex items-center space-x-2 px-4 py-2 transition ${
//             activeTab === 'vote'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           <Vote className="w-5 h-5" />
//           <span>Cast Vote</span>
//         </button>
//         <button
//           onClick={() => setActiveTab('results')}
//           className={`flex items-center space-x-2 px-4 py-2 transition ${
//             activeTab === 'results'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           <BarChart3 className="w-5 h-5" />
//           <span>View Results</span>
//         </button>
//         <button
//           onClick={() => setActiveTab('profile')}
//           className={`flex items-center space-x-2 px-4 py-2 transition ${
//             activeTab === 'profile'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           <User className="w-5 h-5" />
//           <span>Profile</span>
//         </button>
//       </div>

//       {/* Content */}
//       {activeTab === 'vote' && (
//         <CastVote
//           elections={elections}
//           hasVotedStatus={hasVotedStatus}
//           onVoteCast={handleVoteCast}
//         />
//       )}

//       {activeTab === 'results' && (
//         <ResultsView
//           elections={elections}
//           results={results}
//           onSelectElection={loadResults}
//         />
//       )}

//       {activeTab === 'profile' && profile && (
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-gray-500 text-sm">Voter ID</p>
//               <p className="font-medium">{profile.voterId}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Name</p>
//               <p className="font-medium">{profile.name}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Father's Name</p>
//               <p className="font-medium">{profile.fatherName || '-'}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Date of Birth</p>
//               <p className="font-medium">{profile.dateOfBirth || '-'}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Address</p>
//               <p className="font-medium">{profile.address || '-'}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">City</p>
//               <p className="font-medium">{profile.city || '-'}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Pincode</p>
//               <p className="font-medium">{profile.pincode || '-'}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Constituency</p>
//               <p className="font-medium">{profile.constituency?.name || '-'}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Email</p>
//               <p className="font-medium">{profile.email}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoterDashboard;

import React, { useState, useEffect } from 'react';
import { getVoterProfile, getActiveElections, hasVoted, getElectionResults, updateVoterProfile } from '../../services/voter.service';
import CastVote from './CastVote';
import ResultsView from './ResultsView';
import { Voter, Election, ElectionResult } from '../../types';
import { User, Vote, BarChart3, LogOut, RefreshCw, Edit2, Save, X, UserCheck, Mail, MapPin, Calendar, Home, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

type TabType = 'profile' | 'vote' | 'results';

const VoterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [profile, setProfile] = useState<Voter | null>(null);
  const [elections, setElections] = useState<Election[]>([]);
  const [completedElections, setCompletedElections] = useState<Election[]>([]);
  const [hasVotedStatus, setHasVotedStatus] = useState<Record<number, boolean>>({});
  const [results, setResults] = useState<ElectionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Voter>>({});
  const [updating, setUpdating] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadProfile(), loadElections()]);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    try {
      const data = await getVoterProfile();
      setProfile(data);
      setEditFormData({
        name: data.name,
        fatherName: data.fatherName,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        email: data.email
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const loadElections = async () => {
    try {
      const activeData = await getActiveElections();
      setElections(Array.isArray(activeData) ? activeData : []);
      
      // Check voting status for active elections
      const status: Record<number, boolean> = {};
      const activeArray = Array.isArray(activeData) ? activeData : [];
      for (const election of activeArray) {
        const electionId = election.id || (election as any).electionId;
        if (electionId) {
          try {
            const voted = await hasVoted(electionId);
            status[electionId] = voted;
          } catch (error) {
            console.error(`Failed to check voting status for election ${electionId}:`, error);
            status[electionId] = false;
          }
        }
      }
      setHasVotedStatus(status);
    } catch (error) {
      console.error('Failed to load elections:', error);
      toast.error('Failed to load elections');
      setElections([]);
    }
  };

  const loadResults = async (electionId: number) => {
    try {
      const data = await getElectionResults(electionId);
      setResults(data);
    } catch (error) {
      console.error('Failed to load results:', error);
      toast.error('Failed to load results');
    }
  };

  const handleVoteCast = async () => {
    await loadElections();
  };

  // ✅ Handle Profile Update
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original profile
    if (profile) {
      setEditFormData({
        name: profile.name,
        fatherName: profile.fatherName,
        dateOfBirth: profile.dateOfBirth,
        address: profile.address,
        city: profile.city,
        pincode: profile.pincode,
        email: profile.email
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async () => {
    setUpdating(true);
    try {
      const updated = await updateVoterProfile(editFormData);
      setProfile(updated);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Voter Dashboard</h1>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 border-b">
        <button
          onClick={() => setActiveTab('vote')}
          className={`flex items-center space-x-2 px-4 py-2 transition ${
            activeTab === 'vote'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Vote className="w-5 h-5" />
          <span>Cast Vote</span>
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`flex items-center space-x-2 px-4 py-2 transition ${
            activeTab === 'results'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>View Results</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center space-x-2 px-4 py-2 transition ${
            activeTab === 'profile'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'vote' && (
        <CastVote
          elections={elections}
          hasVotedStatus={hasVotedStatus}
          onVoteCast={handleVoteCast}
        />
      )}

      {activeTab === 'results' && (
        <ResultsView
          elections={elections}
          results={results}
          onSelectElection={loadResults}
        />
      )}

      {activeTab === 'profile' && profile && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={handleEditProfile}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={updating}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{updating ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {!isEditing ? (
              // View Mode
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Voter ID</p>
                      <p className="font-medium text-gray-900">{profile.voterId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{profile.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Father's Name</p>
                      <p className="font-medium text-gray-900">{profile.fatherName || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium text-gray-900">{profile.dateOfBirth || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <Home className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">{profile.address || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium text-gray-900">{profile.city || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Pincode</p>
                      <p className="font-medium text-gray-900">{profile.pincode || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Constituency</p>
                      <p className="font-medium text-gray-900">{profile.constituency?.name || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voter ID</label>
                  <input
                    type="text"
                    value={profile.voterId}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={editFormData.fatherName || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editFormData.dateOfBirth || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={editFormData.address || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={editFormData.city || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={editFormData.pincode || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
                  <input
                    type="text"
                    value={profile.constituency?.name || '-'}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Constituency cannot be changed</p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterDashboard;
