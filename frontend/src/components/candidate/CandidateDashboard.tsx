// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { getMyNominations, getActiveElectionsForCandidate } from '../../services/candidate.service';
// // // // // // import { Nomination } from '../../types';
// // // // // // import { FileCheck, Clock, CheckCircle, XCircle, LogOut } from 'lucide-react';
// // // // // // import { useAuth } from '../../contexts/AuthContext';
// // // // // // import toast from 'react-hot-toast';

// // // // // // const CandidateDashboard: React.FC = () => {
// // // // // //   const [nominations, setNominations] = useState<Nomination[]>([]);
// // // // // //   const [activeElections, setActiveElections] = useState<any[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const { logout } = useAuth();

// // // // // //   useEffect(() => {
// // // // // //     loadData();
// // // // // //   }, []);

// // // // // //   const loadData = async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const [nominationsData, electionsData] = await Promise.all([
// // // // // //         getMyNominations(),
// // // // // //         getActiveElectionsForCandidate()
// // // // // //       ]);
// // // // // //       setNominations(nominationsData);
// // // // // //       setActiveElections(electionsData);
// // // // // //     } catch (error) {
// // // // // //       console.error('Failed to load data:', error);
// // // // // //       toast.error('Failed to load data');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const getStatusBadge = (status: string) => {
// // // // // //     switch (status) {
// // // // // //       case 'PENDING':
// // // // // //         return <span className="flex items-center text-yellow-600"><Clock className="w-4 h-4 mr-1" /> Pending</span>;
// // // // // //       case 'ACCEPTED':
// // // // // //         return <span className="flex items-center text-green-600"><CheckCircle className="w-4 h-4 mr-1" /> Accepted</span>;
// // // // // //       case 'REJECTED':
// // // // // //         return <span className="flex items-center text-red-600"><XCircle className="w-4 h-4 mr-1" /> Rejected</span>;
// // // // // //       default:
// // // // // //         return null;
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="flex justify-center items-center py-12">
// // // // // //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // // // // //         <span className="ml-2 text-gray-600">Loading dashboard...</span>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="max-w-6xl mx-auto">
// // // // // //       <div className="flex justify-between items-center mb-8">
// // // // // //         <h1 className="text-2xl font-bold text-gray-800">Candidate Dashboard</h1>
// // // // // //         <button
// // // // // //           onClick={logout}
// // // // // //           className="flex items-center space-x-2 text-red-600 hover:text-red-700"
// // // // // //         >
// // // // // //           <LogOut className="w-5 h-5" />
// // // // // //           <span>Logout</span>
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* Active Elections Section */}
// // // // // //       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// // // // // //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// // // // // //           <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// // // // // //           Active Elections
// // // // // //         </h2>
// // // // // //         {activeElections.length === 0 ? (
// // // // // //           <p className="text-gray-500 text-center py-4">No active elections at this time.</p>
// // // // // //         ) : (
// // // // // //           <div className="space-y-3">
// // // // // //             {activeElections.map((election: any) => (
// // // // // //               <div key={election.id} className="border rounded-lg p-4">
// // // // // //                 <h3 className="font-semibold">{election.name}</h3>
// // // // // //                 <p className="text-sm text-gray-500">{election.constituencyName}</p>
// // // // // //                 <p className="text-xs text-gray-400 mt-1">
// // // // // //                   Nomination Deadline: {new Date(election.nominationEndDate).toLocaleDateString()}
// // // // // //                 </p>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* My Nominations Section */}
// // // // // //       <div className="bg-white rounded-xl shadow-lg p-6">
// // // // // //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// // // // // //           <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// // // // // //           My Nominations
// // // // // //         </h2>
// // // // // //         {nominations.length === 0 ? (
// // // // // //           <p className="text-gray-500 text-center py-4">No nominations submitted yet.</p>
// // // // // //         ) : (
// // // // // //           <div className="overflow-x-auto">
// // // // // //             <table className="w-full">
// // // // // //               <thead className="bg-gray-50">
// // // // // //                 <tr>
// // // // // //                   <th className="px-4 py-2 text-left">Election</th>
// // // // // //                   <th className="px-4 py-2 text-left">Constituency</th>
// // // // // //                   <th className="px-4 py-2 text-left">Status</th>
// // // // // //                   <th className="px-4 py-2 text-left">Submission Date</th>
// // // // // //                 </tr>
// // // // // //               </thead>
// // // // // //               <tbody>
// // // // // //                 {nominations.map(nomination => (
// // // // // //                   <tr key={nomination.id} className="border-b">
// // // // // //                     <td className="px-4 py-3">{nomination.election?.name || 'N/A'}</td>
// // // // // //                     <td className="px-4 py-3">{nomination.election?.constituencyName || 'N/A'}</td>
// // // // // //                     <td className="px-4 py-3">{getStatusBadge(nomination.status)}</td>
// // // // // //                     <td className="px-4 py-3">{new Date(nomination.submissionDate).toLocaleDateString()}</td>
// // // // // //                   </tr>
// // // // // //                 ))}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CandidateDashboard;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { getMyNominations, getActiveElectionsForCandidate } from '../../services/candidate.service';
// // // // // import { Nomination } from '../../types';
// // // // // import { FileCheck, Clock, CheckCircle, XCircle, LogOut } from 'lucide-react';
// // // // // import { useAuth } from '../../contexts/AuthContext';
// // // // // import toast from 'react-hot-toast';

// // // // // const CandidateDashboard: React.FC = () => {
// // // // //   const [nominations, setNominations] = useState<Nomination[]>([]);
// // // // //   const [activeElections, setActiveElections] = useState<any[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const { logout } = useAuth();

// // // // //   useEffect(() => {
// // // // //     loadData();
// // // // //   }, []);

// // // // //   const loadData = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const [nominationsData, electionsData] = await Promise.all([
// // // // //         getMyNominations(),
// // // // //         getActiveElectionsForCandidate()
// // // // //       ]);
      
// // // // //       // ✅ Ensure electionsData is an array
// // // // //       setNominations(Array.isArray(nominationsData) ? nominationsData : []);
// // // // //       setActiveElections(Array.isArray(electionsData) ? electionsData : []);
      
// // // // //       console.log('Nominations:', nominationsData);
// // // // //       console.log('Active Elections:', electionsData);
      
// // // // //     } catch (error) {
// // // // //       console.error('Failed to load data:', error);
// // // // //       toast.error('Failed to load data');
// // // // //       // ✅ Set empty arrays on error
// // // // //       setNominations([]);
// // // // //       setActiveElections([]);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const getStatusBadge = (status: string) => {
// // // // //     switch (status) {
// // // // //       case 'PENDING':
// // // // //         return <span className="flex items-center text-yellow-600"><Clock className="w-4 h-4 mr-1" /> Pending</span>;
// // // // //       case 'ACCEPTED':
// // // // //         return <span className="flex items-center text-green-600"><CheckCircle className="w-4 h-4 mr-1" /> Accepted</span>;
// // // // //       case 'REJECTED':
// // // // //         return <span className="flex items-center text-red-600"><XCircle className="w-4 h-4 mr-1" /> Rejected</span>;
// // // // //       default:
// // // // //         return null;
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex justify-center items-center py-12">
// // // // //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // // // //         <span className="ml-2 text-gray-600">Loading dashboard...</span>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="max-w-6xl mx-auto">
// // // // //       <div className="flex justify-between items-center mb-8">
// // // // //         <h1 className="text-2xl font-bold text-gray-800">Candidate Dashboard</h1>
// // // // //         <button
// // // // //           onClick={logout}
// // // // //           className="flex items-center space-x-2 text-red-600 hover:text-red-700"
// // // // //         >
// // // // //           <LogOut className="w-5 h-5" />
// // // // //           <span>Logout</span>
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Active Elections Section */}
// // // // //       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// // // // //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// // // // //           <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// // // // //           Active Elections
// // // // //         </h2>
// // // // //         {activeElections.length === 0 ? (
// // // // //           <p className="text-gray-500 text-center py-4">No active elections at this time.</p>
// // // // //         ) : (
// // // // //           <div className="space-y-3">
// // // // //             {activeElections.map((election: any) => (
// // // // //               <div key={election.id} className="border rounded-lg p-4">
// // // // //                 <h3 className="font-semibold">{election.name}</h3>
// // // // //                 <p className="text-sm text-gray-500">{election.constituencyName}</p>
// // // // //                 <p className="text-xs text-gray-400 mt-1">
// // // // //                   Nomination Deadline: {election.nominationEndDate ? new Date(election.nominationEndDate).toLocaleDateString() : 'N/A'}
// // // // //                 </p>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* My Nominations Section */}
// // // // //       <div className="bg-white rounded-xl shadow-lg p-6">
// // // // //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// // // // //           <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// // // // //           My Nominations
// // // // //         </h2>
// // // // //         {nominations.length === 0 ? (
// // // // //           <p className="text-gray-500 text-center py-4">No nominations submitted yet.</p>
// // // // //         ) : (
// // // // //           <div className="overflow-x-auto">
// // // // //             <table className="w-full">
// // // // //               <thead className="bg-gray-50">
// // // // //                 <tr>
// // // // //                   <th className="px-4 py-2 text-left">Election</th>
// // // // //                   <th className="px-4 py-2 text-left">Constituency</th>
// // // // //                   <th className="px-4 py-2 text-left">Status</th>
// // // // //                   <th className="px-4 py-2 text-left">Submission Date</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {nominations.map(nomination => (
// // // // //                   <tr key={nomination.id} className="border-b">
// // // // //                     <td className="px-4 py-3">{nomination.election?.name || 'N/A'}</td>
// // // // //                     <td className="px-4 py-3">{nomination.election?.constituencyName || 'N/A'}</td>
// // // // //                     <td className="px-4 py-3">{getStatusBadge(nomination.status)}</td>
// // // // //                     <td className="px-4 py-3">{nomination.submissionDate ? new Date(nomination.submissionDate).toLocaleDateString() : 'N/A'}</td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CandidateDashboard;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { getMyNominations, getActiveElectionsForCandidate, submitNomination } from '../../services/candidate.service';
// // // // import { Nomination } from '../../types';
// // // // import { FileCheck, Clock, CheckCircle, XCircle, LogOut, Send, X, Link } from 'lucide-react';
// // // // import { useAuth } from '../../contexts/AuthContext';
// // // // import toast from 'react-hot-toast';

// // // // const CandidateDashboard: React.FC = () => {
// // // //   const [nominations, setNominations] = useState<Nomination[]>([]);
// // // //   const [activeElections, setActiveElections] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [showNominationModal, setShowNominationModal] = useState(false);
// // // //   const [selectedElection, setSelectedElection] = useState<any>(null);
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [nominationData, setNominationData] = useState({
// // // //     manifestoUrl: '',
// // // //     affidavitUrl: '',
// // // //     nominationFormUrl: ''
// // // //   });
// // // //   const { logout } = useAuth();

// // // //   useEffect(() => {
// // // //     loadData();
// // // //   }, []);

// // // //   const loadData = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const [nominationsData, electionsData] = await Promise.all([
// // // //         getMyNominations(),
// // // //         getActiveElectionsForCandidate()
// // // //       ]);
      
// // // //       setNominations(Array.isArray(nominationsData) ? nominationsData : []);
// // // //       setActiveElections(Array.isArray(electionsData) ? electionsData : []);
      
// // // //       console.log('Nominations:', nominationsData);
// // // //       console.log('Active Elections:', electionsData);
      
// // // //     } catch (error) {
// // // //       console.error('Failed to load data:', error);
// // // //       toast.error('Failed to load data');
// // // //       setNominations([]);
// // // //       setActiveElections([]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleNominate = (election: any) => {
// // // //     setSelectedElection(election);
// // // //     setNominationData({
// // // //       manifestoUrl: '',
// // // //       affidavitUrl: '',
// // // //       nominationFormUrl: ''
// // // //     });
// // // //     setShowNominationModal(true);
// // // //   };

// // // //   const handleSubmitNomination = async () => {
// // // //     if (!selectedElection) return;
    
// // // //     setSubmitting(true);
// // // //     try {
// // // //       await submitNomination(
// // // //         selectedElection.id,
// // // //         nominationData.manifestoUrl,
// // // //         nominationData.affidavitUrl,
// // // //         nominationData.nominationFormUrl
// // // //       );
// // // //       toast.success('Nomination submitted successfully!');
// // // //       setShowNominationModal(false);
// // // //       loadData(); // Reload to show new nomination
// // // //     } catch (error: any) {
// // // //       toast.error(error.response?.data?.message || 'Failed to submit nomination');
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   const hasNominatedForElection = (electionId: number) => {
// // // //     return nominations.some(n => n.election?.id === electionId);
// // // //   };

// // // //   const getNominationStatusForElection = (electionId: number) => {
// // // //     const nomination = nominations.find(n => n.election?.id === electionId);
// // // //     return nomination?.status;
// // // //   };

// // // //   const getStatusBadge = (status: string) => {
// // // //     switch (status) {
// // // //       case 'PENDING':
// // // //         return <span className="flex items-center text-yellow-600"><Clock className="w-4 h-4 mr-1" /> Pending</span>;
// // // //       case 'ACCEPTED':
// // // //         return <span className="flex items-center text-green-600"><CheckCircle className="w-4 h-4 mr-1" /> Accepted</span>;
// // // //       case 'REJECTED':
// // // //         return <span className="flex items-center text-red-600"><XCircle className="w-4 h-4 mr-1" /> Rejected</span>;
// // // //       default:
// // // //         return null;
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center py-12">
// // // //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // // //         <span className="ml-2 text-gray-600">Loading dashboard...</span>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="max-w-6xl mx-auto">
// // // //       <div className="flex justify-between items-center mb-8">
// // // //         <h1 className="text-2xl font-bold text-gray-800">Candidate Dashboard</h1>
// // // //         <button
// // // //           onClick={logout}
// // // //           className="flex items-center space-x-2 text-red-600 hover:text-red-700"
// // // //         >
// // // //           <LogOut className="w-5 h-5" />
// // // //           <span>Logout</span>
// // // //         </button>
// // // //       </div>

// // // //       {/* Active Elections Section with Nomination Button */}
// // // //       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// // // //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// // // //           <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// // // //           Active Elections
// // // //         </h2>
// // // //         {activeElections.length === 0 ? (
// // // //           <p className="text-gray-500 text-center py-4">No active elections at this time.</p>
// // // //         ) : (
// // // //           <div className="space-y-4">
// // // //             {activeElections.map((election: any) => {
// // // //               const hasNominated = hasNominatedForElection(election.id);
// // // //               const nominationStatus = getNominationStatusForElection(election.id);
              
// // // //               return (
// // // //                 <div key={election.id} className="border rounded-lg p-4">
// // // //                   <div className="flex justify-between items-start">
// // // //                     <div>
// // // //                       <h3 className="font-semibold text-lg">{election.name}</h3>
// // // //                       <p className="text-sm text-gray-500">{election.constituencyName}</p>
// // // //                       <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
// // // //                         <p className="text-gray-600">
// // // //                           <span className="font-medium">Nomination Start:</span>{' '}
// // // //                           {new Date(election.nominationStartDate).toLocaleDateString()}
// // // //                         </p>
// // // //                         <p className="text-gray-600">
// // // //                           <span className="font-medium">Nomination End:</span>{' '}
// // // //                           {new Date(election.nominationEndDate).toLocaleDateString()}
// // // //                         </p>
// // // //                         <p className="text-gray-600">
// // // //                           <span className="font-medium">Election Date:</span>{' '}
// // // //                           {new Date(election.electionStartDate).toLocaleDateString()} - {new Date(election.electionEndDate).toLocaleDateString()}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div>
// // // //                       {hasNominated ? (
// // // //                         <div className="text-right">
// // // //                           <p className="text-sm text-gray-500 mb-1">Nomination Status:</p>
// // // //                           {getStatusBadge(nominationStatus!)}
// // // //                         </div>
// // // //                       ) : (
// // // //                         <button
// // // //                           onClick={() => handleNominate(election)}
// // // //                           className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // // //                         >
// // // //                           <Send className="w-4 h-4" />
// // // //                           <span>Nominate</span>
// // // //                         </button>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
                  
// // // //                   {/* Show rejection reason if applicable */}
// // // //                   {hasNominated && nominationStatus === 'REJECTED' && (
// // // //                     <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
// // // //                       <p className="text-sm text-red-700">
// // // //                         <span className="font-medium">Rejection Reason:</span>{' '}
// // // //                         {nominations.find(n => n.election?.id === election.id)?.rejectionReason}
// // // //                       </p>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* My Nominations Section */}
// // // //       <div className="bg-white rounded-xl shadow-lg p-6">
// // // //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// // // //           <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// // // //           My Nominations
// // // //         </h2>
// // // //         {nominations.length === 0 ? (
// // // //           <p className="text-gray-500 text-center py-4">No nominations submitted yet. Click "Nominate" on an active election above.</p>
// // // //         ) : (
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full">
// // // //               <thead className="bg-gray-50">
// // // //                 <tr>
// // // //                   <th className="px-4 py-2 text-left">Election</th>
// // // //                   <th className="px-4 py-2 text-left">Constituency</th>
// // // //                   <th className="px-4 py-2 text-left">Status</th>
// // // //                   <th className="px-4 py-2 text-left">Submission Date</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {nominations.map(nomination => (
// // // //                   <tr key={nomination.id} className="border-b">
// // // //                     <td className="px-4 py-3">{nomination.election?.name || 'N/A'}</td>
// // // //                     <td className="px-4 py-3">{nomination.election?.constituencyName || 'N/A'}</td>
// // // //                     <td className="px-4 py-3">{getStatusBadge(nomination.status)}</td>
// // // //                     <td className="px-4 py-3">{nomination.submissionDate ? new Date(nomination.submissionDate).toLocaleDateString() : 'N/A'}</td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* Nomination Modal */}
// // // //       {showNominationModal && selectedElection && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //           <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
// // // //             <div className="flex justify-between items-center mb-4">
// // // //               <h3 className="text-xl font-semibold">Submit Nomination</h3>
// // // //               <button
// // // //                 onClick={() => setShowNominationModal(false)}
// // // //                 className="text-gray-500 hover:text-gray-700"
// // // //               >
// // // //                 <X className="w-5 h-5" />
// // // //               </button>
// // // //             </div>
            
// // // //             <div className="mb-4">
// // // //               <p className="text-gray-600">
// // // //                 <span className="font-medium">Election:</span> {selectedElection.name}
// // // //               </p>
// // // //               <p className="text-gray-600">
// // // //                 <span className="font-medium">Constituency:</span> {selectedElection.constituencyName}
// // // //               </p>
// // // //             </div>

// // // //             <form onSubmit={(e) => { e.preventDefault(); handleSubmitNomination(); }} className="space-y-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                   Manifesto URL (Google Drive)
// // // //                 </label>
// // // //                 <div className="relative">
// // // //                   <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// // // //                   <input
// // // //                     type="url"
// // // //                     value={nominationData.manifestoUrl}
// // // //                     onChange={(e) => setNominationData({ ...nominationData, manifestoUrl: e.target.value })}
// // // //                     placeholder="https://drive.google.com/..."
// // // //                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                   Affidavit URL (Google Drive)
// // // //                 </label>
// // // //                 <div className="relative">
// // // //                   <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// // // //                   <input
// // // //                     type="url"
// // // //                     value={nominationData.affidavitUrl}
// // // //                     onChange={(e) => setNominationData({ ...nominationData, affidavitUrl: e.target.value })}
// // // //                     placeholder="https://drive.google.com/..."
// // // //                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                   Nomination Form URL (Google Drive)
// // // //                 </label>
// // // //                 <div className="relative">
// // // //                   <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// // // //                   <input
// // // //                     type="url"
// // // //                     value={nominationData.nominationFormUrl}
// // // //                     onChange={(e) => setNominationData({ ...nominationData, nominationFormUrl: e.target.value })}
// // // //                     placeholder="https://drive.google.com/..."
// // // //                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // // //                   />
// // // //                 </div>
// // // //                 <p className="text-xs text-gray-500 mt-1">Upload documents to Google Drive and share the link here</p>
// // // //               </div>

// // // //               <div className="flex space-x-3 pt-4">
// // // //                 <button
// // // //                   type="submit"
// // // //                   disabled={submitting}
// // // //                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
// // // //                 >
// // // //                   {submitting ? 'Submitting...' : 'Submit Nomination'}
// // // //                 </button>
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => setShowNominationModal(false)}
// // // //                   className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CandidateDashboard;



// // // import React, { useState, useEffect } from 'react';
// // // import { 
// // //   getMyNominations, 
// // //   getActiveElectionsForCandidate, 
// // //   submitNomination,
// // //   updateNomination,
// // //   deleteNomination
// // // } from '../../services/candidate.service';
// // // import { Nomination } from '../../types';
// // // import { 
// // //   FileCheck, Clock, CheckCircle, XCircle, LogOut, Send, 
// // //   X, Link, Edit2, Trash2, RefreshCw, AlertTriangle
// // // } from 'lucide-react';
// // // import { useAuth } from '../../contexts/AuthContext';
// // // import toast from 'react-hot-toast';

// // // const CandidateDashboard: React.FC = () => {
// // //   const [nominations, setNominations] = useState<Nomination[]>([]);
// // //   const [activeElections, setActiveElections] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showNominationModal, setShowNominationModal] = useState(false);
// // //   const [showEditModal, setShowEditModal] = useState(false);
// // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState<Nomination | null>(null);
// // //   const [selectedElection, setSelectedElection] = useState<any>(null);
// // //   const [editingNomination, setEditingNomination] = useState<Nomination | null>(null);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [nominationData, setNominationData] = useState({
// // //     manifestoUrl: '',
// // //     affidavitUrl: '',
// // //     nominationFormUrl: ''
// // //   });
// // //   const { logout } = useAuth();

// // //   useEffect(() => {
// // //     loadData();
// // //   }, []);

// // //   const loadData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const [nominationsData, electionsData] = await Promise.all([
// // //         getMyNominations(),
// // //         getActiveElectionsForCandidate()
// // //       ]);
      
// // //       setNominations(Array.isArray(nominationsData) ? nominationsData : []);
// // //       setActiveElections(Array.isArray(electionsData) ? electionsData : []);
      
// // //     } catch (error) {
// // //       console.error('Failed to load data:', error);
// // //       toast.error('Failed to load data');
// // //       setNominations([]);
// // //       setActiveElections([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleNominate = (election: any) => {
// // //     setSelectedElection(election);
// // //     setNominationData({
// // //       manifestoUrl: '',
// // //       affidavitUrl: '',
// // //       nominationFormUrl: ''
// // //     });
// // //     setShowNominationModal(true);
// // //   };

// // //   const handleEditNomination = (nomination: Nomination) => {
// // //     setEditingNomination(nomination);
// // //     setNominationData({
// // //       manifestoUrl: nomination.manifestoUrl || '',
// // //       affidavitUrl: nomination.affidavitUrl || '',
// // //       nominationFormUrl: nomination.nominationFormUrl || ''
// // //     });
// // //     setShowEditModal(true);
// // //   };

// // //   const handleDeleteNomination = async () => {
// // //     if (!showDeleteConfirm) return;
    
// // //     setSubmitting(true);
// // //     try {
// // //       await deleteNomination(showDeleteConfirm.id);
// // //       toast.success('Nomination deleted successfully');
// // //       setShowDeleteConfirm(null);
// // //       loadData();
// // //     } catch (error: any) {
// // //       toast.error(error.response?.data?.message || 'Failed to delete nomination');
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const handleSubmitNomination = async () => {
// // //     if (!selectedElection) return;
    
// // //     setSubmitting(true);
// // //     try {
// // //       await submitNomination(
// // //         selectedElection.id,
// // //         nominationData.manifestoUrl,
// // //         nominationData.affidavitUrl,
// // //         nominationData.nominationFormUrl
// // //       );
// // //       toast.success('Nomination submitted successfully!');
// // //       setShowNominationModal(false);
// // //       loadData();
// // //     } catch (error: any) {
// // //       toast.error(error.response?.data?.message || 'Failed to submit nomination');
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const handleUpdateNomination = async () => {
// // //     if (!editingNomination) return;
    
// // //     setSubmitting(true);
// // //     try {
// // //       await updateNomination(
// // //         editingNomination.id,
// // //         nominationData.manifestoUrl,
// // //         nominationData.affidavitUrl,
// // //         nominationData.nominationFormUrl
// // //       );
// // //       toast.success('Nomination updated successfully!');
// // //       setShowEditModal(false);
// // //       setEditingNomination(null);
// // //       loadData();
// // //     } catch (error: any) {
// // //       toast.error(error.response?.data?.message || 'Failed to update nomination');
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const getNominationForElection = (electionId: number) => {
// // //     return nominations.find(n => n.election?.id === electionId);
// // //   };

// // //   const canEditNomination = (nomination: Nomination) => {
// // //     return nomination.status === 'PENDING' || nomination.status === 'REJECTED';
// // //   };

// // //   const getStatusBadge = (status: string) => {
// // //     switch (status) {
// // //       case 'PENDING':
// // //         return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
// // //           <Clock className="w-3 h-3 mr-1" /> Pending
// // //         </span>;
// // //       case 'ACCEPTED':
// // //         return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
// // //           <CheckCircle className="w-3 h-3 mr-1" /> Accepted
// // //         </span>;
// // //       case 'REJECTED':
// // //         return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
// // //           <XCircle className="w-3 h-3 mr-1" /> Rejected
// // //         </span>;
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   const getActionButtons = (nomination: Nomination) => {
// // //     if (nomination.status === 'ACCEPTED') {
// // //       return (
// // //         <span className="text-xs text-green-600 italic">✓ Verified - No action needed</span>
// // //       );
// // //     }
    
// // //     return (
// // //       <div className="flex space-x-2">
// // //         <button
// // //           onClick={() => handleEditNomination(nomination)}
// // //           className="text-blue-600 hover:text-blue-800 transition"
// // //           title="Edit Nomination"
// // //         >
// // //           <Edit2 className="w-4 h-4" />
// // //         </button>
// // //         <button
// // //           onClick={() => setShowDeleteConfirm(nomination)}
// // //           className="text-red-600 hover:text-red-800 transition"
// // //           title="Delete Nomination"
// // //         >
// // //           <Trash2 className="w-4 h-4" />
// // //         </button>
// // //       </div>
// // //     );
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center py-12">
// // //         <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
// // //         <span className="ml-2 text-gray-600">Loading dashboard...</span>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="max-w-6xl mx-auto">
// // //       <div className="flex justify-between items-center mb-8">
// // //         <h1 className="text-2xl font-bold text-gray-800">Candidate Dashboard</h1>
// // //         <button
// // //           onClick={logout}
// // //           className="flex items-center space-x-2 text-red-600 hover:text-red-700"
// // //         >
// // //           <LogOut className="w-5 h-5" />
// // //           <span>Logout</span>
// // //         </button>
// // //       </div>

// // //       {/* Active Elections Section */}
// // //       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// // //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// // //           <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// // //           Active Elections
// // //         </h2>
// // //         {activeElections.length === 0 ? (
// // //           <p className="text-gray-500 text-center py-4">No active elections at this time.</p>
// // //         ) : (
// // //           <div className="space-y-4">
// // //             {activeElections.map((election: any) => {
// // //               const existingNomination = getNominationForElection(election.id);
              
// // //               return (
// // //                 <div key={election.id} className="border rounded-lg p-4 hover:shadow-md transition">
// // //                   <div className="flex justify-between items-start">
// // //                     <div className="flex-1">
// // //                       <h3 className="font-semibold text-lg">{election.name}</h3>
// // //                       <p className="text-sm text-gray-500">{election.constituencyName}</p>
// // //                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-sm">
// // //                         <p className="text-gray-600">
// // //                           <span className="font-medium">Nomination:</span>{' '}
// // //                           {new Date(election.nominationStartDate).toLocaleDateString()} - {new Date(election.nominationEndDate).toLocaleDateString()}
// // //                         </p>
// // //                         <p className="text-gray-600">
// // //                           <span className="font-medium">Election:</span>{' '}
// // //                           {new Date(election.electionStartDate).toLocaleDateString()} - {new Date(election.electionEndDate).toLocaleDateString()}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                     <div>
// // //                       {existingNomination ? (
// // //                         <div className="text-right">
// // //                           {getStatusBadge(existingNomination.status)}
// // //                           {existingNomination.status === 'REJECTED' && (
// // //                             <button
// // //                               onClick={() => handleEditNomination(existingNomination)}
// // //                               className="mt-2 text-sm text-blue-600 hover:text-blue-700"
// // //                             >
// // //                               Resubmit →
// // //                             </button>
// // //                           )}
// // //                         </div>
// // //                       ) : (
// // //                         <button
// // //                           onClick={() => handleNominate(election)}
// // //                           className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// // //                         >
// // //                           <Send className="w-4 h-4" />
// // //                           <span>Nominate</span>
// // //                         </button>
// // //                       )}
// // //                     </div>
// // //                   </div>
                  
// // //                   {/* Show rejection reason if applicable */}
// // //                   {existingNomination?.status === 'REJECTED' && existingNomination.rejectionReason && (
// // //                     <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
// // //                       <p className="text-sm text-red-700">
// // //                         <span className="font-medium">Rejection Reason:</span>{' '}
// // //                         {existingNomination.rejectionReason}
// // //                       </p>
// // //                       <p className="text-xs text-red-600 mt-1">
// // //                         Please update your nomination documents and resubmit.
// // //                       </p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* My Nominations Section */}
// // //       <div className="bg-white rounded-xl shadow-lg p-6">
// // //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// // //           <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// // //           My Nominations
// // //         </h2>
// // //         {nominations.length === 0 ? (
// // //           <p className="text-gray-500 text-center py-4">No nominations submitted yet. Click "Nominate" on an active election above.</p>
// // //         ) : (
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full">
// // //               <thead className="bg-gray-50">
// // //                 <tr>
// // //                   <th className="px-4 py-3 text-left">Election</th>
// // //                   <th className="px-4 py-3 text-left">Constituency</th>
// // //                   <th className="px-4 py-3 text-left">Status</th>
// // //                   <th className="px-4 py-3 text-left">Submission Date</th>
// // //                   <th className="px-4 py-3 text-center">Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {nominations.map(nomination => (
// // //                   <tr key={nomination.id} className="border-b hover:bg-gray-50">
// // //                     <td className="px-4 py-3 font-medium">{nomination.election?.name || 'N/A'}</td>
// // //                     <td className="px-4 py-3">{nomination.election?.constituencyName || 'N/A'}</td>
// // //                     <td className="px-4 py-3">{getStatusBadge(nomination.status)}</td>
// // //                     <td className="px-4 py-3">{nomination.submissionDate ? new Date(nomination.submissionDate).toLocaleDateString() : 'N/A'}</td>
// // //                     <td className="px-4 py-3 text-center">
// // //                       {canEditNomination(nomination) && getActionButtons(nomination)}
// // //                       {nomination.status === 'ACCEPTED' && (
// // //                         <span className="text-green-600 text-sm">✓ Approved</span>
// // //                       )}
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Nomination Modal (Submit New) */}
// // //       {showNominationModal && selectedElection && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h3 className="text-xl font-semibold">Submit Nomination</h3>
// // //               <button
// // //                 onClick={() => setShowNominationModal(false)}
// // //                 className="text-gray-500 hover:text-gray-700"
// // //               >
// // //                 <X className="w-5 h-5" />
// // //               </button>
// // //             </div>
            
// // //             <div className="mb-4 space-y-1 text-sm">
// // //               <p><span className="font-medium">Election:</span> {selectedElection.name}</p>
// // //               <p><span className="font-medium">Constituency:</span> {selectedElection.constituencyName}</p>
// // //             </div>

// // //             <form onSubmit={(e) => { e.preventDefault(); handleSubmitNomination(); }} className="space-y-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Manifesto URL (Google Drive)
// // //                 </label>
// // //                 <input
// // //                   type="url"
// // //                   value={nominationData.manifestoUrl}
// // //                   onChange={(e) => setNominationData({ ...nominationData, manifestoUrl: e.target.value })}
// // //                   placeholder="https://drive.google.com/..."
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Affidavit URL (Google Drive)
// // //                 </label>
// // //                 <input
// // //                   type="url"
// // //                   value={nominationData.affidavitUrl}
// // //                   onChange={(e) => setNominationData({ ...nominationData, affidavitUrl: e.target.value })}
// // //                   placeholder="https://drive.google.com/..."
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Nomination Form URL (Google Drive)
// // //                 </label>
// // //                 <input
// // //                   type="url"
// // //                   value={nominationData.nominationFormUrl}
// // //                   onChange={(e) => setNominationData({ ...nominationData, nominationFormUrl: e.target.value })}
// // //                   placeholder="https://drive.google.com/..."
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                 />
// // //                 <p className="text-xs text-gray-500 mt-1">Upload documents to Google Drive and share the link here</p>
// // //               </div>

// // //               <div className="flex space-x-3 pt-4">
// // //                 <button
// // //                   type="submit"
// // //                   disabled={submitting}
// // //                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
// // //                 >
// // //                   {submitting ? 'Submitting...' : 'Submit Nomination'}
// // //                 </button>
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setShowNominationModal(false)}
// // //                   className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Edit Nomination Modal */}
// // //       {showEditModal && editingNomination && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h3 className="text-xl font-semibold">
// // //                 {editingNomination.status === 'REJECTED' ? 'Resubmit Nomination' : 'Edit Nomination'}
// // //               </h3>
// // //               <button
// // //                 onClick={() => {
// // //                   setShowEditModal(false);
// // //                   setEditingNomination(null);
// // //                 }}
// // //                 className="text-gray-500 hover:text-gray-700"
// // //               >
// // //                 <X className="w-5 h-5" />
// // //               </button>
// // //             </div>

// // //             {editingNomination.status === 'REJECTED' && editingNomination.rejectionReason && (
// // //               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
// // //                 <p className="text-sm font-medium text-red-700">Rejection Reason:</p>
// // //                 <p className="text-sm text-red-600">{editingNomination.rejectionReason}</p>
// // //                 <p className="text-xs text-red-500 mt-1">Please update your documents below and resubmit.</p>
// // //               </div>
// // //             )}
            
// // //             <div className="mb-4 space-y-1 text-sm">
// // //               <p><span className="font-medium">Election:</span> {editingNomination.election?.name}</p>
// // //               <p><span className="font-medium">Constituency:</span> {editingNomination.election?.constituencyName}</p>
// // //             </div>

// // //             <form onSubmit={(e) => { e.preventDefault(); handleUpdateNomination(); }} className="space-y-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Manifesto URL
// // //                 </label>
// // //                 <input
// // //                   type="url"
// // //                   value={nominationData.manifestoUrl}
// // //                   onChange={(e) => setNominationData({ ...nominationData, manifestoUrl: e.target.value })}
// // //                   placeholder="https://drive.google.com/..."
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Affidavit URL
// // //                 </label>
// // //                 <input
// // //                   type="url"
// // //                   value={nominationData.affidavitUrl}
// // //                   onChange={(e) => setNominationData({ ...nominationData, affidavitUrl: e.target.value })}
// // //                   placeholder="https://drive.google.com/..."
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Nomination Form URL
// // //                 </label>
// // //                 <input
// // //                   type="url"
// // //                   value={nominationData.nominationFormUrl}
// // //                   onChange={(e) => setNominationData({ ...nominationData, nominationFormUrl: e.target.value })}
// // //                   placeholder="https://drive.google.com/..."
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
// // //                 />
// // //               </div>

// // //               <div className="flex space-x-3 pt-4">
// // //                 <button
// // //                   type="submit"
// // //                   disabled={submitting}
// // //                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
// // //                 >
// // //                   {submitting ? 'Saving...' : (editingNomination.status === 'REJECTED' ? 'Resubmit Nomination' : 'Save Changes')}
// // //                 </button>
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => {
// // //                     setShowEditModal(false);
// // //                     setEditingNomination(null);
// // //                   }}
// // //                   className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Delete Confirmation Modal */}
// // //       {showDeleteConfirm && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
// // //             <div className="text-center">
// // //               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
// // //                 <AlertTriangle className="h-6 w-6 text-red-600" />
// // //               </div>
// // //               <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Nomination</h3>
// // //               <p className="text-sm text-gray-500 mb-4">
// // //                 Are you sure you want to delete your nomination for <span className="font-semibold">{showDeleteConfirm.election?.name}</span>?
// // //                 This action cannot be undone.
// // //               </p>
// // //               <div className="flex space-x-3">
// // //                 <button
// // //                   onClick={handleDeleteNomination}
// // //                   disabled={submitting}
// // //                   className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
// // //                 >
// // //                   {submitting ? 'Deleting...' : 'Delete'}
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setShowDeleteConfirm(null)}
// // //                   className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CandidateDashboard;



// // import React, { useState, useEffect } from 'react';
// // import { 
// //   getMyNominations, 
// //   getActiveElectionsForCandidate, 
// //   getCompletedElectionsForCandidate,
// //   getCandidateElectionResults,
// //   getCandidateWinner,
// //   submitNomination,
// //   updateNomination,
// //   deleteNomination
// // } from '../../services/candidate.service';
// // import { Nomination, Election, ElectionResult } from '../../types';
// // import { 
// //   FileCheck, Clock, CheckCircle, XCircle, LogOut, Send, 
// //   X, Link, Edit2, Trash2, RefreshCw, AlertTriangle,
// //   Trophy, Medal, BarChart3
// // } from 'lucide-react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import toast from 'react-hot-toast';

// // const CandidateDashboard: React.FC = () => {
// //   const [nominations, setNominations] = useState<Nomination[]>([]);
// //   const [activeElections, setActiveElections] = useState<Election[]>([]);
// //   const [completedElections, setCompletedElections] = useState<Election[]>([]);
// //   const [selectedElection, setSelectedElection] = useState<Election | null>(null);
// //   const [results, setResults] = useState<ElectionResult[]>([]);
// //   const [winner, setWinner] = useState<ElectionResult | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [loadingResults, setLoadingResults] = useState(false);
// //   const [activeTab, setActiveTab] = useState<'nominations' | 'results'>('nominations');
// //   const { logout } = useAuth();
// // const [showNominationModal, setShowNominationModal] = useState(false);
// // const [showEditModal, setShowEditModal] = useState(false);
// // const [showDeleteConfirm, setShowDeleteConfirm] = useState<Nomination | null>(null);
// // const [editingNomination, setEditingNomination] = useState<Nomination | null>(null);
// // const [submitting, setSubmitting] = useState(false);
// // const [nominationData, setNominationData] = useState({
// //   manifestoUrl: '',
// //   affidavitUrl: '',
// //   nominationFormUrl: ''
// // });
// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     setLoading(true);
// //     try {
// //       const [nominationsData, activeElectionsData, completedElectionsData] = await Promise.all([
// //         getMyNominations(),
// //         getActiveElectionsForCandidate(),
// //         getCompletedElectionsForCandidate()
// //       ]);
      
// //       setNominations(Array.isArray(nominationsData) ? nominationsData : []);
// //       setActiveElections(Array.isArray(activeElectionsData) ? activeElectionsData : []);
// //       setCompletedElections(Array.isArray(completedElectionsData) ? completedElectionsData : []);
      
// //     } catch (error) {
// //       console.error('Failed to load data:', error);
// //       toast.error('Failed to load data');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// // const handleNominate = (election: Election) => {
// //   setSelectedElection(election);
// //   setNominationData({
// //     manifestoUrl: '',
// //     affidavitUrl: '',
// //     nominationFormUrl: ''
// //   });
// //   setShowNominationModal(true);
// // };

// // const handleEditNomination = (nomination: Nomination) => {
// //   setEditingNomination(nomination);
// //   setNominationData({
// //     manifestoUrl: nomination.manifestoUrl || '',
// //     affidavitUrl: nomination.affidavitUrl || '',
// //     nominationFormUrl: nomination.nominationFormUrl || ''
// //   });
// //   setShowEditModal(true);
// // };

// // const handleSubmitNomination = async () => {
// //   if (!selectedElection) return;
  
// //   setSubmitting(true);
// //   try {
// //     await submitNomination(
// //       selectedElection.id,
// //       nominationData.manifestoUrl,
// //       nominationData.affidavitUrl,
// //       nominationData.nominationFormUrl
// //     );
// //     toast.success('Nomination submitted successfully!');
// //     setShowNominationModal(false);
// //     loadData();
// //   } catch (error: any) {
// //     toast.error(error.response?.data?.message || 'Failed to submit nomination');
// //   } finally {
// //     setSubmitting(false);
// //   }
// // };

// // const handleUpdateNomination = async () => {
// //   if (!editingNomination) return;
  
// //   setSubmitting(true);
// //   try {
// //     await updateNomination(
// //       editingNomination.id,
// //       nominationData.manifestoUrl,
// //       nominationData.affidavitUrl,
// //       nominationData.nominationFormUrl
// //     );
// //     toast.success('Nomination updated successfully!');
// //     setShowEditModal(false);
// //     setEditingNomination(null);
// //     loadData();
// //   } catch (error: any) {
// //     toast.error(error.response?.data?.message || 'Failed to update nomination');
// //   } finally {
// //     setSubmitting(false);
// //   }
// // };

// // const handleDeleteNomination = async () => {
// //   if (!showDeleteConfirm) return;
  
// //   setSubmitting(true);
// //   try {
// //     await deleteNomination(showDeleteConfirm.id);
// //     toast.success('Nomination deleted successfully');
// //     setShowDeleteConfirm(null);
// //     loadData();
// //   } catch (error: any) {
// //     toast.error(error.response?.data?.message || 'Failed to delete nomination');
// //   } finally {
// //     setSubmitting(false);
// //   }
// // };
// //   const loadResults = async (electionId: number) => {
// //     setLoadingResults(true);
// //     try {
// //       const [resultsData, winnerData] = await Promise.all([
// //         getCandidateElectionResults(electionId),
// //         getCandidateWinner(electionId)
// //       ]);
// //       setResults(resultsData);
// //       setWinner(winnerData);
// //     } catch (error) {
// //       console.error('Failed to load results:', error);
// //       toast.error('Failed to load results');
// //     } finally {
// //       setLoadingResults(false);
// //     }
// //   };

// //   const handleElectionSelect = (election: Election) => {
// //     setSelectedElection(election);
// //     loadResults(election.id);
// //   };

// //   const getStatusBadge = (status: string) => {
// //     switch (status) {
// //       case 'PENDING':
// //         return (
// //           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
// //             <Clock className="w-3 h-3 mr-1" /> Pending
// //           </span>
// //         );
// //       case 'ACCEPTED':
// //         return (
// //           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
// //             <CheckCircle className="w-3 h-3 mr-1" /> Accepted
// //           </span>
// //         );
// //       case 'REJECTED':
// //         return (
// //           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
// //             <XCircle className="w-3 h-3 mr-1" /> Rejected
// //           </span>
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   const getMedalIcon = (rank: number) => {
// //     if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
// //     if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
// //     if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
// //     return null;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center py-12">
// //         <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
// //         <span className="ml-2 text-gray-600">Loading dashboard...</span>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-6xl mx-auto">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-2xl font-bold text-gray-800">Candidate Dashboard</h1>
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
// //           onClick={() => setActiveTab('nominations')}
// //           className={`flex items-center space-x-2 px-4 py-2 transition ${
// //             activeTab === 'nominations'
// //               ? 'border-b-2 border-blue-600 text-blue-600'
// //               : 'text-gray-500 hover:text-gray-700'
// //           }`}
// //         >
// //           <FileCheck className="w-5 h-5" />
// //           <span>My Nominations</span>
// //         </button>
// //         <button
// //           onClick={() => setActiveTab('results')}
// //           className={`flex items-center space-x-2 px-4 py-2 transition ${
// //             activeTab === 'results'
// //               ? 'border-b-2 border-blue-600 text-blue-600'
// //               : 'text-gray-500 hover:text-gray-700'
// //           }`}
// //         >
// //           <Trophy className="w-5 h-5" />
// //           <span>Election Results</span>
// //         </button>
// //       </div>

// //       {/* Nominations Tab */}
// //       {activeTab === 'nominations' && (
// //         <>
// //           {/* Active Elections Section */}
// //           <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// //             <h2 className="text-xl font-semibold mb-4 flex items-center">
// //               <Send className="w-5 h-5 mr-2 text-blue-600" />
// //               Active Elections for Nomination
// //             </h2>
// //             {activeElections.length === 0 ? (
// //               <p className="text-gray-500 text-center py-4">No active elections at this time.</p>
// //             ) : (
// //               <div className="space-y-4">
// //                 {activeElections.map(election => {
// //                   const existingNomination = nominations.find(n => n.election?.id === election.id);
// //                   return (
// //                     <div key={election.id} className="border rounded-lg p-4">
// //                       <div className="flex justify-between items-start">
// //                         <div>
// //                           <h3 className="font-semibold text-lg">{election.name}</h3>
// //                           <p className="text-sm text-gray-500">{election.constituencyName}</p>
// //                           <p className="text-xs text-gray-400 mt-1">
// //                             Nomination Deadline: {new Date(election.nominationEndDate).toLocaleDateString()}
// //                           </p>
// //                         </div>
// //                         {existingNomination && getStatusBadge(existingNomination.status)}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             )}
// //           </div>

// //           {/* My Nominations Table */}
// //           <div className="bg-white rounded-xl shadow-lg p-6">
// //             <h2 className="text-xl font-semibold mb-4 flex items-center">
// //               <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
// //               My Nominations
// //             </h2>
// //             {nominations.length === 0 ? (
// //               <p className="text-gray-500 text-center py-4">No nominations submitted yet.</p>
// //             ) : (
// //               <div className="overflow-x-auto">
// //                 <table className="w-full">
// //                   <thead className="bg-gray-50">
// //                     <tr>
// //                       <th className="px-4 py-3 text-left">Election</th>
// //                       <th className="px-4 py-3 text-left">Constituency</th>
// //                       <th className="px-4 py-3 text-center">Status</th>
// //                       <th className="px-4 py-3 text-left">Submission Date</th>
// //                       <th className="px-4 py-3 text-left">Rejection Reason</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {nominations.map(nomination => (
// //                       <tr key={nomination.id} className="border-b hover:bg-gray-50">
// //                         <td className="px-4 py-3 font-medium">{nomination.election?.name || 'N/A'}</td>
// //                         <td className="px-4 py-3">{nomination.election?.constituencyName || 'N/A'}</td>
// //                         <td className="px-4 py-3 text-center">{getStatusBadge(nomination.status)}</td>
// //                         <td className="px-4 py-3">{new Date(nomination.submissionDate).toLocaleDateString()}</td>
// //                         <td className="px-4 py-3 text-red-600">{nomination.rejectionReason || '-'}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )}
// //           </div>
// //         </>
// //       )}

// //       {/* Results Tab */}
// //       {activeTab === 'results' && (
// //         <div className="space-y-6">
// //           {/* Completed Elections Selector */}
// //           <div className="bg-white rounded-xl shadow-lg p-6">
// //             <h2 className="text-xl font-semibold mb-4 flex items-center">
// //               <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
// //               Completed Elections
// //             </h2>
            
// //             {completedElections.length === 0 ? (
// //               <div className="text-center py-8 bg-gray-50 rounded-lg">
// //                 <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
// //                 <p className="text-gray-500">No completed elections yet.</p>
// //                 <p className="text-sm text-gray-400 mt-1">When elections are completed, results will appear here.</p>
// //               </div>
// //             ) : (
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //                 {completedElections.map(election => (
// //                   <button
// //                     key={election.id}
// //                     onClick={() => handleElectionSelect(election)}
// //                     className={`text-left p-4 border rounded-lg transition ${
// //                       selectedElection?.id === election.id
// //                         ? 'border-blue-500 bg-blue-50'
// //                         : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
// //                     }`}
// //                   >
// //                     <h3 className="font-semibold text-lg">{election.name}</h3>
// //                     <p className="text-sm text-gray-500 mt-1">{election.constituencyName}</p>
// //                     <div className="flex justify-between items-center mt-2">
// //                       <p className="text-xs text-gray-400">
// //                         {new Date(election.electionEndDate).toLocaleDateString()}
// //                       </p>
// //                       {selectedElection?.id === election.id && (
// //                         <span className="text-xs text-blue-600 font-medium">Selected</span>
// //                       )}
// //                     </div>
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Results Display */}
// //           {selectedElection && loadingResults && (
// //             <div className="bg-white rounded-xl shadow-lg p-8 text-center">
// //               <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
// //               <p className="text-gray-500">Loading results...</p>
// //             </div>
// //           )}

// //           {selectedElection && !loadingResults && results.length > 0 && (
// //             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// //               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
// //                 <h2 className="text-xl font-semibold text-white">
// //                   Results for {selectedElection.name}
// //                 </h2>
// //                 <p className="text-blue-100 text-sm mt-1">{selectedElection.constituencyName}</p>
// //               </div>

// //               <div className="p-6">
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead className="bg-gray-50">
// //                       <tr>
// //                         <th className="px-4 py-3 text-left">Rank</th>
// //                         <th className="px-4 py-3 text-left">Candidate</th>
// //                         <th className="px-4 py-3 text-left">Party</th>
// //                         <th className="px-4 py-3 text-right">Votes</th>
// //                         <th className="px-4 py-3 text-right">Percentage</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {results.map((result, index) => (
// //                         <tr key={result.id} className="border-b hover:bg-gray-50">
// //                           <td className="px-4 py-3">
// //                             <div className="flex items-center space-x-2">
// //                               {getMedalIcon(result.rank || index + 1)}
// //                               <span className="font-medium">{result.rank || index + 1}</span>
// //                             </div>
// //                           </td>
// //                           <td className="px-4 py-3 font-medium">{result.candidate?.name || 'N/A'}</td>
// //                           <td className="px-4 py-3">{result.candidate?.party?.name || 'Independent'}</td>
// //                           <td className="px-4 py-3 text-right">{result.totalVotes?.toLocaleString() || 0}</td>
// //                           <td className="px-4 py-3 text-right">
// //                             <div className="flex items-center justify-end space-x-2">
// //                               <span>{result.votePercentage || 0}%</span>
// //                               <div className="w-24 bg-gray-200 rounded-full h-2">
// //                                 <div 
// //                                   className="bg-blue-600 h-2 rounded-full" 
// //                                   style={{ width: `${result.votePercentage || 0}%` }}
// //                                 />
// //                               </div>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>

// //                 {/* Winner Highlight */}
// //                 {winner && (
// //                   <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
// //                     <div className="flex items-center space-x-4">
// //                       <div className="bg-green-500 rounded-full p-3">
// //                         <Trophy className="w-8 h-8 text-white" />
// //                       </div>
// //                       <div>
// //                         <p className="text-sm text-green-700 font-semibold">WINNER</p>
// //                         <p className="font-bold text-2xl text-green-800">
// //                           {winner.candidate?.name}
// //                         </p>
// //                         <p className="text-green-600">
// //                           {winner.candidate?.party?.name || 'Independent'} • Won by {winner.totalVotes?.toLocaleString()} votes ({winner.votePercentage}%)
// //                         </p>
// //                         {winner.candidate?.id === nominations[0]?.candidate?.id && (
// //                           <p className="text-sm text-green-700 mt-2 font-medium">🎉 Congratulations! You won this election!</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Did you win? message */}
// //                 {winner && winner.candidate?.id !== nominations[0]?.candidate?.id && (
// //                   <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
// //                     <p className="text-blue-700">Better luck next time! Keep working hard for your constituency.</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {selectedElection && !loadingResults && results.length === 0 && (
// //             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
// //               <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
// //               <p className="text-yellow-700 font-medium">Results Not Available</p>
// //               <p className="text-sm text-yellow-600 mt-1">
// //                 Results have not been computed for this election yet.
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CandidateDashboard;

// import React, { useState, useEffect } from 'react';
// import { 
//   getMyNominations, 
//   getActiveElectionsForCandidate, 
//   getCompletedElectionsForCandidate,
//   getCandidateElectionResults,
//   getCandidateWinner,
//   submitNomination,
//   updateNomination,
//   deleteNomination
// } from '../../services/candidate.service';
// import { Nomination, Election, ElectionResult } from '../../types';
// import { 
//   FileCheck, Clock, CheckCircle, XCircle, LogOut, Send, 
//   X, Link, Edit2, Trash2, RefreshCw, AlertTriangle,
//   Trophy, Medal, BarChart3
// } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import toast from 'react-hot-toast';

// const CandidateDashboard: React.FC = () => {
//   const [nominations, setNominations] = useState<Nomination[]>([]);
//   const [activeElections, setActiveElections] = useState<Election[]>([]);
//   const [completedElections, setCompletedElections] = useState<Election[]>([]);
//   const [selectedElection, setSelectedElection] = useState<Election | null>(null);
//   const [results, setResults] = useState<ElectionResult[]>([]);
//   const [winner, setWinner] = useState<ElectionResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingResults, setLoadingResults] = useState(false);
//   const [activeTab, setActiveTab] = useState<'nominations' | 'results'>('nominations');
  
//   // Modal states
//   const [showNominationModal, setShowNominationModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<Nomination | null>(null);
//   const [editingNomination, setEditingNomination] = useState<Nomination | null>(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [nominationData, setNominationData] = useState({
//     manifestoUrl: '',
//     affidavitUrl: '',
//     nominationFormUrl: ''
//   });
  
//   const { logout } = useAuth();

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const [nominationsData, activeElectionsData, completedElectionsData] = await Promise.all([
//         getMyNominations(),
//         getActiveElectionsForCandidate(),
//         getCompletedElectionsForCandidate()
//       ]);
      
//       setNominations(Array.isArray(nominationsData) ? nominationsData : []);
//       setActiveElections(Array.isArray(activeElectionsData) ? activeElectionsData : []);
//       setCompletedElections(Array.isArray(completedElectionsData) ? completedElectionsData : []);
      
//     } catch (error) {
//       console.error('Failed to load data:', error);
//       toast.error('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadResults = async (electionId: number) => {
//     setLoadingResults(true);
//     try {
//       const [resultsData, winnerData] = await Promise.all([
//         getCandidateElectionResults(electionId),
//         getCandidateWinner(electionId)
//       ]);
//       setResults(resultsData);
//       setWinner(winnerData);
//     } catch (error) {
//       console.error('Failed to load results:', error);
//       toast.error('Failed to load results');
//     } finally {
//       setLoadingResults(false);
//     }
//   };

//   const handleElectionSelect = (election: Election) => {
//     setSelectedElection(election);
//     loadResults(election.id);
//   };

//   const handleNominate = (election: Election) => {
//     setSelectedElection(election);
//     setNominationData({
//       manifestoUrl: '',
//       affidavitUrl: '',
//       nominationFormUrl: ''
//     });
//     setShowNominationModal(true);
//   };

//   const handleEditNomination = (nomination: Nomination) => {
//     setEditingNomination(nomination);
//     setNominationData({
//       manifestoUrl: nomination.manifestoUrl || '',
//       affidavitUrl: nomination.affidavitUrl || '',
//       nominationFormUrl: nomination.nominationFormUrl || ''
//     });
//     setShowEditModal(true);
//   };

//   const handleSubmitNomination = async () => {
//     if (!selectedElection) return;
    
//     setSubmitting(true);
//     try {
//       await submitNomination(
//         selectedElection.id,
//         nominationData.manifestoUrl,
//         nominationData.affidavitUrl,
//         nominationData.nominationFormUrl
//       );
//       toast.success('Nomination submitted successfully!');
//       setShowNominationModal(false);
//       loadData();
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to submit nomination');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleUpdateNomination = async () => {
//     if (!editingNomination) return;
    
//     setSubmitting(true);
//     try {
//       await updateNomination(
//         editingNomination.id,
//         nominationData.manifestoUrl,
//         nominationData.affidavitUrl,
//         nominationData.nominationFormUrl
//       );
//       toast.success('Nomination updated successfully!');
//       setShowEditModal(false);
//       setEditingNomination(null);
//       loadData();
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to update nomination');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteNomination = async () => {
//     if (!showDeleteConfirm) return;
    
//     setSubmitting(true);
//     try {
//       await deleteNomination(showDeleteConfirm.id);
//       toast.success('Nomination deleted successfully');
//       setShowDeleteConfirm(null);
//       loadData();
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to delete nomination');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'PENDING':
//         return (
//           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//             <Clock className="w-3 h-3 mr-1" /> Pending
//           </span>
//         );
//       case 'ACCEPTED':
//         return (
//           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             <CheckCircle className="w-3 h-3 mr-1" /> Accepted
//           </span>
//         );
//       case 'REJECTED':
//         return (
//           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
//             <XCircle className="w-3 h-3 mr-1" /> Rejected
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   const getMedalIcon = (rank: number) => {
//     if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
//     if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
//     if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
//     return null;
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
//         <h1 className="text-2xl font-bold text-gray-800">Candidate Dashboard</h1>
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
//           onClick={() => setActiveTab('nominations')}
//           className={`flex items-center space-x-2 px-4 py-2 transition ${
//             activeTab === 'nominations'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           <FileCheck className="w-5 h-5" />
//           <span>My Nominations</span>
//         </button>
//         <button
//           onClick={() => setActiveTab('results')}
//           className={`flex items-center space-x-2 px-4 py-2 transition ${
//             activeTab === 'results'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           <Trophy className="w-5 h-5" />
//           <span>Election Results</span>
//         </button>
//       </div>

//       {/* Nominations Tab */}
//       {activeTab === 'nominations' && (
//         <>
//           {/* Active Elections Section */}
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//               <Send className="w-5 h-5 mr-2 text-blue-600" />
//               Active Elections for Nomination
//             </h2>
//             {activeElections.length === 0 ? (
//               <p className="text-gray-500 text-center py-4">No active elections at this time.</p>
//             ) : (
//               <div className="space-y-4">
//                 {activeElections.map(election => {
//                   const existingNomination = nominations.find(n => n.election?.id === election.id);
                  
//                   return (
//                     <div key={election.id} className="border rounded-lg p-4">
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-lg">{election.name}</h3>
//                           <p className="text-sm text-gray-500">{election.constituencyName}</p>
//                           <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
//                             <p className="text-gray-600">
//                               <span className="font-medium">Nomination:</span>{' '}
//                               {new Date(election.nominationStartDate).toLocaleDateString()} - {new Date(election.nominationEndDate).toLocaleDateString()}
//                             </p>
//                             <p className="text-gray-600">
//                               <span className="font-medium">Election:</span>{' '}
//                               {new Date(election.electionStartDate).toLocaleDateString()} - {new Date(election.electionEndDate).toLocaleDateString()}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           {existingNomination ? (
//                             <>
//                               {getStatusBadge(existingNomination.status)}
//                               {existingNomination.status === 'REJECTED' && (
//                                 <button
//                                   onClick={() => handleEditNomination(existingNomination)}
//                                   className="mt-2 text-sm text-blue-600 hover:text-blue-700 block"
//                                 >
//                                   Resubmit →
//                                 </button>
//                               )}
//                             </>
//                           ) : (
//                             <button
//                               onClick={() => handleNominate(election)}
//                               className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                             >
//                               <Send className="w-4 h-4" />
//                               <span>Nominate</span>
//                             </button>
//                           )}
//                         </div>
//                       </div>
                      
//                       {/* Show rejection reason */}
//                       {existingNomination?.status === 'REJECTED' && existingNomination.rejectionReason && (
//                         <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//                           <p className="text-sm text-red-700">
//                             <span className="font-medium">Rejection Reason:</span>{' '}
//                             {existingNomination.rejectionReason}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* My Nominations Table */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//               <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
//               My Nominations
//             </h2>
//             {nominations.length === 0 ? (
//               <p className="text-gray-500 text-center py-4">No nominations submitted yet.</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left">Election</th>
//                       <th className="px-4 py-3 text-left">Constituency</th>
//                       <th className="px-4 py-3 text-center">Status</th>
//                       <th className="px-4 py-3 text-left">Submission Date</th>
//                       <th className="px-4 py-3 text-left">Rejection Reason</th>
//                       <th className="px-4 py-3 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {nominations.map(nomination => (
//                       <tr key={nomination.id} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-3 font-medium">{nomination.election?.name || 'N/A'}</td>
//                         <td className="px-4 py-3">{nomination.election?.constituencyName || 'N/A'}</td>
//                         <td className="px-4 py-3 text-center">{getStatusBadge(nomination.status)}</td>
//                         <td className="px-4 py-3">{new Date(nomination.submissionDate).toLocaleDateString()}</td>
//                         <td className="px-4 py-3 text-red-600">{nomination.rejectionReason || '-'}</td>
//                         <td className="px-4 py-3 text-center">
//                           {(nomination.status === 'PENDING' || nomination.status === 'REJECTED') && (
//                             <div className="flex items-center justify-center space-x-2">
//                               <button
//                                 onClick={() => handleEditNomination(nomination)}
//                                 className="text-blue-600 hover:text-blue-800"
//                                 title="Edit"
//                               >
//                                 <Edit2 className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => setShowDeleteConfirm(nomination)}
//                                 className="text-red-600 hover:text-red-800"
//                                 title="Delete"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           )}
//                           {nomination.status === 'ACCEPTED' && (
//                             <span className="text-green-600 text-sm">✓ Verified</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* Results Tab */}
//       {activeTab === 'results' && (
//         <div className="space-y-6">
//           {/* Completed Elections Selector */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//               <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
//               Completed Elections
//             </h2>
            
//             {completedElections.length === 0 ? (
//               <div className="text-center py-8 bg-gray-50 rounded-lg">
//                 <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-500">No completed elections yet.</p>
//                 <p className="text-sm text-gray-400 mt-1">When elections are completed, results will appear here.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {completedElections.map(election => (
//                   <button
//                     key={election.id}
//                     onClick={() => handleElectionSelect(election)}
//                     className={`text-left p-4 border rounded-lg transition ${
//                       selectedElection?.id === election.id
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     <h3 className="font-semibold text-lg">{election.name}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{election.constituencyName}</p>
//                     <div className="flex justify-between items-center mt-2">
//                       <p className="text-xs text-gray-400">
//                         {new Date(election.electionEndDate).toLocaleDateString()}
//                       </p>
//                       {selectedElection?.id === election.id && (
//                         <span className="text-xs text-blue-600 font-medium">Selected</span>
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Results Display */}
//           {selectedElection && loadingResults && (
//             <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//               <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
//               <p className="text-gray-500">Loading results...</p>
//             </div>
//           )}

//           {selectedElection && !loadingResults && results.length > 0 && (
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
//                 <h2 className="text-xl font-semibold text-white">
//                   Results for {selectedElection.name}
//                 </h2>
//                 <p className="text-blue-100 text-sm mt-1">{selectedElection.constituencyName}</p>
//               </div>

//               <div className="p-6">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left">Rank</th>
//                         <th className="px-4 py-3 text-left">Candidate</th>
//                         <th className="px-4 py-3 text-left">Party</th>
//                         <th className="px-4 py-3 text-right">Votes</th>
//                         <th className="px-4 py-3 text-right">Percentage</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {results.map((result, index) => (
//                         <tr key={result.id} className="border-b hover:bg-gray-50">
//                           <td className="px-4 py-3">
//                             <div className="flex items-center space-x-2">
//                               {getMedalIcon(result.rank || index + 1)}
//                               <span className="font-medium">{result.rank || index + 1}</span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3 font-medium">{result.candidate?.name || 'N/A'}</td>
//                           <td className="px-4 py-3">{result.candidate?.party?.name || 'Independent'}</td>
//                           <td className="px-4 py-3 text-right">{result.totalVotes?.toLocaleString() || 0}</td>
//                           <td className="px-4 py-3 text-right">
//                             <div className="flex items-center justify-end space-x-2">
//                               <span>{result.votePercentage || 0}%</span>
//                               <div className="w-24 bg-gray-200 rounded-full h-2">
//                                 <div 
//                                   className="bg-blue-600 h-2 rounded-full" 
//                                   style={{ width: `${result.votePercentage || 0}%` }}
//                                 />
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Winner Highlight */}
//                 {winner && (
//                   <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
//                     <div className="flex items-center space-x-4">
//                       <div className="bg-green-500 rounded-full p-3">
//                         <Trophy className="w-8 h-8 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-sm text-green-700 font-semibold">WINNER</p>
//                         <p className="font-bold text-2xl text-green-800">
//                           {winner.candidate?.name}
//                         </p>
//                         <p className="text-green-600">
//                           {winner.candidate?.party?.name || 'Independent'} • Won by {winner.totalVotes?.toLocaleString()} votes ({winner.votePercentage}%)
//                         </p>
//                         {winner.candidate?.id === nominations[0]?.candidate?.id && (
//                           <p className="text-sm text-green-700 mt-2 font-medium">🎉 Congratulations! You won this election!</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Did you win? message */}
//                 {winner && winner.candidate?.id !== nominations[0]?.candidate?.id && (
//                   <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
//                     <p className="text-blue-700">Better luck next time! Keep working hard for your constituency.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {selectedElection && !loadingResults && results.length === 0 && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
//               <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
//               <p className="text-yellow-700 font-medium">Results Not Available</p>
//               <p className="text-sm text-yellow-600 mt-1">
//                 Results have not been computed for this election yet.
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Nomination Modal (Submit New) */}
//       {showNominationModal && selectedElection && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">Submit Nomination</h3>
//               <button
//                 onClick={() => setShowNominationModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="mb-4 space-y-1 text-sm">
//               <p><span className="font-medium">Election:</span> {selectedElection.name}</p>
//               <p><span className="font-medium">Constituency:</span> {selectedElection.constituencyName}</p>
//             </div>

//             <form onSubmit={(e) => { e.preventDefault(); handleSubmitNomination(); }} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Manifesto URL (Google Drive)
//                 </label>
//                 <input
//                   type="url"
//                   value={nominationData.manifestoUrl}
//                   onChange={(e) => setNominationData({ ...nominationData, manifestoUrl: e.target.value })}
//                   placeholder="https://drive.google.com/..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Affidavit URL (Google Drive)
//                 </label>
//                 <input
//                   type="url"
//                   value={nominationData.affidavitUrl}
//                   onChange={(e) => setNominationData({ ...nominationData, affidavitUrl: e.target.value })}
//                   placeholder="https://drive.google.com/..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Nomination Form URL (Google Drive)
//                 </label>
//                 <input
//                   type="url"
//                   value={nominationData.nominationFormUrl}
//                   onChange={(e) => setNominationData({ ...nominationData, nominationFormUrl: e.target.value })}
//                   placeholder="https://drive.google.com/..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload documents to Google Drive and share the link here</p>
//               </div>

//               <div className="flex space-x-3 pt-4">
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {submitting ? 'Submitting...' : 'Submit Nomination'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowNominationModal(false)}
//                   className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Nomination Modal */}
//       {showEditModal && editingNomination && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">
//                 {editingNomination.status === 'REJECTED' ? 'Resubmit Nomination' : 'Edit Nomination'}
//               </h3>
//               <button
//                 onClick={() => {
//                   setShowEditModal(false);
//                   setEditingNomination(null);
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {editingNomination.status === 'REJECTED' && editingNomination.rejectionReason && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-sm font-medium text-red-700">Rejection Reason:</p>
//                 <p className="text-sm text-red-600">{editingNomination.rejectionReason}</p>
//                 <p className="text-xs text-red-500 mt-1">Please update your documents below and resubmit.</p>
//               </div>
//             )}
            
//             <div className="mb-4 space-y-1 text-sm">
//               <p><span className="font-medium">Election:</span> {editingNomination.election?.name}</p>
//               <p><span className="font-medium">Constituency:</span> {editingNomination.election?.constituencyName}</p>
//             </div>

//             <form onSubmit={(e) => { e.preventDefault(); handleUpdateNomination(); }} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Manifesto URL
//                 </label>
//                 <input
//                   type="url"
//                   value={nominationData.manifestoUrl}
//                   onChange={(e) => setNominationData({ ...nominationData, manifestoUrl: e.target.value })}
//                   placeholder="https://drive.google.com/..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Affidavit URL
//                 </label>
//                 <input
//                   type="url"
//                   value={nominationData.affidavitUrl}
//                   onChange={(e) => setNominationData({ ...nominationData, affidavitUrl: e.target.value })}
//                   placeholder="https://drive.google.com/..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Nomination Form URL
//                 </label>
//                 <input
//                   type="url"
//                   value={nominationData.nominationFormUrl}
//                   onChange={(e) => setNominationData({ ...nominationData, nominationFormUrl: e.target.value })}
//                   placeholder="https://drive.google.com/..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div className="flex space-x-3 pt-4">
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {submitting ? 'Saving...' : (editingNomination.status === 'REJECTED' ? 'Resubmit Nomination' : 'Save Changes')}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowEditModal(false);
//                     setEditingNomination(null);
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
//                 <AlertTriangle className="h-6 w-6 text-red-600" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Nomination</h3>
//               <p className="text-sm text-gray-500 mb-4">
//                 Are you sure you want to delete your nomination for <span className="font-semibold">{showDeleteConfirm.election?.name}</span>?
//                 This action cannot be undone.
//               </p>
//               <div className="flex space-x-3">
//                 <button
//                   onClick={handleDeleteNomination}
//                   disabled={submitting}
//                   className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
//                 >
//                   {submitting ? 'Deleting...' : 'Delete'}
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

// export default CandidateDashboard;

import React, { useState, useEffect } from 'react';
import { 
  getMyNominations, 
  getElectionsForNomination,
  getCompletedElectionsForCandidate,
  getCandidateElectionResults,
  getCandidateWinner,
  submitNomination,
  updateNomination,
  deleteNomination
} from '../../services/candidate.service';
import { Nomination, Election, ElectionResult } from '../../types';
import { 
  FileCheck, Clock, CheckCircle, XCircle, LogOut, Send, 
  X, Edit2, Trash2, RefreshCw, AlertTriangle,
  Trophy, Medal, BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const CandidateDashboard: React.FC = () => {
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [nominationOpenElections, setNominationOpenElections] = useState<Election[]>([]);
  const [completedElections, setCompletedElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [results, setResults] = useState<ElectionResult[]>([]);
  const [winner, setWinner] = useState<ElectionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'nominations' | 'results'>('nominations');
  
  // Modal states
  const [showNominationModal, setShowNominationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Nomination | null>(null);
  const [editingNomination, setEditingNomination] = useState<Nomination | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [nominationData, setNominationData] = useState({
    manifestoUrl: '',
    affidavitUrl: '',
    nominationFormUrl: ''
  });
  
  const { logout } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [nominationsData, nominationElectionsData, completedElectionsData] = await Promise.all([
        getMyNominations(),
        getElectionsForNomination(),
        getCompletedElectionsForCandidate()
      ]);
      
      console.log('Nominations:', nominationsData);
      console.log('Nomination-open Elections:', nominationElectionsData);
      console.log('Completed Elections:', completedElectionsData);
      
      setNominations(Array.isArray(nominationsData) ? nominationsData : []);
      setNominationOpenElections(Array.isArray(nominationElectionsData) ? nominationElectionsData : []);
      setCompletedElections(Array.isArray(completedElectionsData) ? completedElectionsData : []);
      
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadResults = async (electionId: number) => {
    setLoadingResults(true);
    try {
      const [resultsData, winnerData] = await Promise.all([
        getCandidateElectionResults(electionId),
        getCandidateWinner(electionId)
      ]);
      setResults(resultsData);
      setWinner(winnerData);
    } catch (error) {
      console.error('Failed to load results:', error);
      toast.error('Failed to load results');
    } finally {
      setLoadingResults(false);
    }
  };

  const handleElectionSelect = (election: Election) => {
    setSelectedElection(election);
    loadResults(election.id);
  };

  const handleNominate = (election: Election) => {
    setSelectedElection(election);
    setNominationData({
      manifestoUrl: '',
      affidavitUrl: '',
      nominationFormUrl: ''
    });
    setShowNominationModal(true);
  };

  const handleEditNomination = (nomination: Nomination) => {
    setEditingNomination(nomination);
    setNominationData({
      manifestoUrl: nomination.manifestoUrl || '',
      affidavitUrl: nomination.affidavitUrl || '',
      nominationFormUrl: nomination.nominationFormUrl || ''
    });
    setShowEditModal(true);
  };

  const handleSubmitNomination = async () => {
    if (!selectedElection) return;
    
    setSubmitting(true);
    try {
      await submitNomination(
        selectedElection.id,
        nominationData.manifestoUrl,
        nominationData.affidavitUrl,
        nominationData.nominationFormUrl
      );
      toast.success('Nomination submitted successfully!');
      setShowNominationModal(false);
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit nomination');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateNomination = async () => {
    if (!editingNomination) return;
    
    setSubmitting(true);
    try {
      await updateNomination(
        editingNomination.id,
        nominationData.manifestoUrl,
        nominationData.affidavitUrl,
        nominationData.nominationFormUrl
      );
      toast.success('Nomination updated successfully!');
      setShowEditModal(false);
      setEditingNomination(null);
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update nomination');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNomination = async () => {
    if (!showDeleteConfirm) return;
    
    setSubmitting(true);
    try {
      await deleteNomination(showDeleteConfirm.id);
      toast.success('Nomination deleted successfully');
      setShowDeleteConfirm(null);
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete nomination');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case 'ACCEPTED':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Accepted
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
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
        <h1 className="text-2xl font-bold text-gray-800">Candidate Dashboard</h1>
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
          onClick={() => setActiveTab('nominations')}
          className={`flex items-center space-x-2 px-4 py-2 transition ${
            activeTab === 'nominations'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileCheck className="w-5 h-5" />
          <span>My Nominations</span>
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`flex items-center space-x-2 px-4 py-2 transition ${
            activeTab === 'results'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span>Election Results</span>
        </button>
      </div>

      {/* Nominations Tab */}
      {activeTab === 'nominations' && (
        <>
          {/* Active Elections for Nomination Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Send className="w-5 h-5 mr-2 text-green-600" />
              Elections Open for Nomination
            </h2>
            {nominationOpenElections.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No elections are currently accepting nominations.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Check back when nomination periods are open.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {nominationOpenElections.map(election => {
                  const existingNomination = nominations.find(n => n.election?.id === election.id);
                  
                  return (
                    <div key={election.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{election.name}</h3>
                          <p className="text-sm text-gray-500">{election.constituency?.name || election.constituencyName}</p>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                            <p className="text-gray-600">
                              <span className="font-medium">Nomination Period:</span>{' '}
                              {election.nominationStartDate ? new Date(election.nominationStartDate).toLocaleDateString() : 'N/A'} - {election.nominationEndDate ? new Date(election.nominationEndDate).toLocaleDateString() : 'N/A'}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Election Date:</span>{' '}
                              {election.electionStartDate ? new Date(election.electionStartDate).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {existingNomination ? (
                            <>
                              {getStatusBadge(existingNomination.status)}
                              {existingNomination.status === 'REJECTED' && (
                                <button
                                  onClick={() => handleEditNomination(existingNomination)}
                                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 block"
                                >
                                  Resubmit →
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              onClick={() => handleNominate(election)}
                              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                              <Send className="w-4 h-4" />
                              <span>Apply for Nomination</span>
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Show rejection reason */}
                      {existingNomination?.status === 'REJECTED' && existingNomination.rejectionReason && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-700">
                            <span className="font-medium">Rejection Reason:</span>{' '}
                            {existingNomination.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* My Nominations Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileCheck className="w-5 h-5 mr-2 text-blue-600" />
              My Nominations
            </h2>
            {nominations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No nominations submitted yet. Apply from the elections above.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Election</th>
                      <th className="px-4 py-3 text-left">Constituency</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-left">Submission Date</th>
                      <th className="px-4 py-3 text-left">Rejection Reason</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nominations.map(nomination => (
                      <tr key={nomination.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{nomination.election?.name || 'N/A'}</td>
                        <td className="px-4 py-3">{nomination.election?.constituency?.name || nomination.election?.constituencyName || 'N/A'}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(nomination.status)}</td>
                        <td className="px-4 py-3">{nomination.submissionDate ? new Date(nomination.submissionDate).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-4 py-3 text-red-600">{nomination.rejectionReason || '-'}</td>
                        <td className="px-4 py-3 text-center">
                          {(nomination.status === 'PENDING' || nomination.status === 'REJECTED') && (
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => handleEditNomination(nomination)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(nomination)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          {nomination.status === 'ACCEPTED' && (
                            <span className="text-green-600 text-sm">✓ Verified</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {/* Completed Elections Selector */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Completed Elections
            </h2>
            
            {completedElections.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No completed elections yet.</p>
                <p className="text-sm text-gray-400 mt-1">When elections are completed, results will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {completedElections.map(election => (
                  <button
                    key={election.id}
                    onClick={() => handleElectionSelect(election)}
                    className={`text-left p-4 border rounded-lg transition ${
                      selectedElection?.id === election.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <h3 className="font-semibold text-lg">{election.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{election.constituency?.name || election.constituencyName}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-400">
                        {election.electionEndDate ? new Date(election.electionEndDate).toLocaleDateString() : 'N/A'}
                      </p>
                      {selectedElection?.id === election.id && (
                        <span className="text-xs text-blue-600 font-medium">Selected</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results Display */}
          {selectedElection && loadingResults && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-500">Loading results...</p>
            </div>
          )}

          {selectedElection && !loadingResults && results.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Results for {selectedElection.name}
                </h2>
                <p className="text-blue-100 text-sm mt-1">{selectedElection.constituency?.name || selectedElection.constituencyName}</p>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left">Rank</th>
                        <th className="px-4 py-3 text-left">Candidate</th>
                        <th className="px-4 py-3 text-left">Party</th>
                        <th className="px-4 py-3 text-right">Votes</th>
                        <th className="px-4 py-3 text-right">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={result.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              {getMedalIcon(result.rank || index + 1)}
                              <span className="font-medium">{result.rank || index + 1}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium">{result.candidate?.name || 'N/A'}</td>
                          <td className="px-4 py-3">{result.candidate?.party?.name || 'Independent'}</td>
                          <td className="px-4 py-3 text-right">{result.totalVotes?.toLocaleString() || 0}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <span>{result.votePercentage || 0}%</span>
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${result.votePercentage || 0}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Winner Highlight */}
                {winner && (
                  <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500 rounded-full p-3">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-green-700 font-semibold">WINNER</p>
                        <p className="font-bold text-2xl text-green-800">
                          {winner.candidate?.name}
                        </p>
                        <p className="text-green-600">
                          {winner.candidate?.party?.name || 'Independent'} • Won by {winner.totalVotes?.toLocaleString()} votes ({winner.votePercentage}%)
                        </p>
                        {winner.candidate?.id === nominations[0]?.candidate?.id && (
                          <p className="text-sm text-green-700 mt-2 font-medium">🎉 Congratulations! You won this election!</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Did you win? message */}
                {winner && winner.candidate?.id !== nominations[0]?.candidate?.id && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                    <p className="text-blue-700">Better luck next time! Keep working hard for your constituency.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedElection && !loadingResults && results.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <p className="text-yellow-700 font-medium">Results Not Available</p>
              <p className="text-sm text-yellow-600 mt-1">
                Results have not been computed for this election yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Nomination Modal (Submit New) */}
      {showNominationModal && selectedElection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Submit Nomination</h3>
              <button
                onClick={() => setShowNominationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4 space-y-1 text-sm">
              <p><span className="font-medium">Election:</span> {selectedElection.name}</p>
              <p><span className="font-medium">Constituency:</span> {selectedElection.constituency?.name || selectedElection.constituencyName}</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmitNomination(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manifesto URL (Google Drive)
                </label>
                <input
                  type="url"
                  value={nominationData.manifestoUrl}
                  onChange={(e) => setNominationData({ ...nominationData, manifestoUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Affidavit URL (Google Drive)
                </label>
                <input
                  type="url"
                  value={nominationData.affidavitUrl}
                  onChange={(e) => setNominationData({ ...nominationData, affidavitUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomination Form URL (Google Drive)
                </label>
                <input
                  type="url"
                  value={nominationData.nominationFormUrl}
                  onChange={(e) => setNominationData({ ...nominationData, nominationFormUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Upload documents to Google Drive and share the link here</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Nomination'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNominationModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Nomination Modal */}
      {showEditModal && editingNomination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingNomination.status === 'REJECTED' ? 'Resubmit Nomination' : 'Edit Nomination'}
              </h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingNomination(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editingNomination.status === 'REJECTED' && editingNomination.rejectionReason && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-700">Rejection Reason:</p>
                <p className="text-sm text-red-600">{editingNomination.rejectionReason}</p>
                <p className="text-xs text-red-500 mt-1">Please update your documents below and resubmit.</p>
              </div>
            )}
            
            <div className="mb-4 space-y-1 text-sm">
              <p><span className="font-medium">Election:</span> {editingNomination.election?.name}</p>
              <p><span className="font-medium">Constituency:</span> {editingNomination.election?.constituency?.name || editingNomination.election?.constituencyName}</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleUpdateNomination(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manifesto URL
                </label>
                <input
                  type="url"
                  value={nominationData.manifestoUrl}
                  onChange={(e) => setNominationData({ ...nominationData, manifestoUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Affidavit URL
                </label>
                <input
                  type="url"
                  value={nominationData.affidavitUrl}
                  onChange={(e) => setNominationData({ ...nominationData, affidavitUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomination Form URL
                </label>
                <input
                  type="url"
                  value={nominationData.nominationFormUrl}
                  onChange={(e) => setNominationData({ ...nominationData, nominationFormUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : (editingNomination.status === 'REJECTED' ? 'Resubmit Nomination' : 'Save Changes')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingNomination(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Nomination</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete your nomination for <span className="font-semibold">{showDeleteConfirm.election?.name}</span>?
                This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteNomination}
                  disabled={submitting}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {submitting ? 'Deleting...' : 'Delete'}
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
    </div>
  );
};

export default CandidateDashboard;