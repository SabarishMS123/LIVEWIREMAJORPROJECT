// // import React from 'react';
// // import { Election, ElectionResult } from '../../types';
// // import { Trophy, Medal, BarChart3 } from 'lucide-react';

// // interface ResultsViewProps {
// //   elections: Election[];
// //   results: ElectionResult[];
// //   onSelectElection: (electionId: number) => void;
// // }

// // const ResultsView: React.FC<ResultsViewProps> = ({ elections, results, onSelectElection }) => {
// //   const [selectedElectionId, setSelectedElectionId] = React.useState<number | null>(null);

// //   const handleElectionSelect = (electionId: number) => {
// //     setSelectedElectionId(electionId);
// //     onSelectElection(electionId);
// //   };

// //   const getMedalIcon = (rank: number) => {
// //     if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
// //     if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
// //     if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
// //     return null;
// //   };

// //   const completedElections = elections.filter(e => e.status === 'COMPLETED');

// //   return (
// //     <div className="space-y-6">
// //       {/* Election Selector */}
// //       <div className="bg-white rounded-xl shadow-lg p-6">
// //         <h2 className="text-xl font-semibold mb-4 flex items-center">
// //           <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
// //           Select Election
// //         </h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //           {completedElections.map(election => (
// //             <button
// //               key={election.id}
// //               onClick={() => handleElectionSelect(election.id)}
// //               className={`text-left p-3 border rounded-lg transition ${
// //                 selectedElectionId === election.id
// //                   ? 'border-blue-500 bg-blue-50'
// //                   : 'border-gray-200 hover:border-blue-300'
// //               }`}
// //             >
// //               <h3 className="font-semibold">{election.name}</h3>
// //               <p className="text-sm text-gray-500">{election.constituencyName}</p>
// //             </button>
// //           ))}
// //         </div>
// //         {completedElections.length === 0 && (
// //           <p className="text-gray-500 text-center py-4">No completed elections yet.</p>
// //         )}
// //       </div>

// //       {/* Results Display */}
// //       {results.length > 0 && (
// //         <div className="bg-white rounded-xl shadow-lg p-6">
// //           <h2 className="text-xl font-semibold mb-4">Election Results</h2>
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-4 py-2 text-left">Rank</th>
// //                   <th className="px-4 py-2 text-left">Candidate</th>
// //                   <th className="px-4 py-2 text-left">Party</th>
// //                   <th className="px-4 py-2 text-right">Votes</th>
// //                   <th className="px-4 py-2 text-right">Percentage</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {results.map(result => (
// //                   <tr key={result.id} className="border-b">
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center space-x-1">
// //                         {getMedalIcon(result.rank)}
// //                         <span>{result.rank}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3 font-medium">{result.candidate.name}</td>
// //                     <td className="px-4 py-3">{result.candidate.party?.name}</td>
// //                     <td className="px-4 py-3 text-right">{result.totalVotes}</td>
// //                     <td className="px-4 py-3 text-right">{result.votePercentage}%</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Winner Highlight */}
// //           {results[0] && (
// //             <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
// //               <div className="flex items-center space-x-3">
// //                 <Trophy className="w-8 h-8 text-yellow-500" />
// //                 <div>
// //                   <p className="text-sm text-green-700">Winner</p>
// //                   <p className="font-bold text-lg">
// //                     {results[0].candidate.name} ({results[0].candidate.party?.name})
// //                   </p>
// //                   <p className="text-sm text-green-600">
// //                     Won by {results[0].totalVotes} votes ({results[0].votePercentage}%)
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ResultsView;

// import React, { useState, useEffect } from 'react';
// import { getCompletedElections } from '../../services/voter.service';
// import { getElectionResults, getWinner } from '../../services/admin.service';
// import { Election, ElectionResult } from '../../types';
// import { Trophy, Medal, BarChart3, RefreshCw, AlertCircle } from 'lucide-react';
// import toast from 'react-hot-toast';

// const ResultsView: React.FC = () => {
//   const [elections, setElections] = useState<Election[]>([]);
//   const [selectedElection, setSelectedElection] = useState<Election | null>(null);
//   const [results, setResults] = useState<ElectionResult[]>([]);
//   const [winner, setWinner] = useState<ElectionResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [loadingElections, setLoadingElections] = useState(true);

//   useEffect(() => {
//     loadCompletedElections();
//   }, []);

//   const loadCompletedElections = async () => {
//     setLoadingElections(true);
//     try {
//       const data = await getCompletedElections();
//       console.log('📊 Completed elections:', data);
//       setElections(data);
//     } catch (error) {
//       console.error('Failed to load completed elections:', error);
//       toast.error('Failed to load elections');
//     } finally {
//       setLoadingElections(false);
//     }
//   };

//   const loadResults = async (electionId: number) => {
//     setLoading(true);
//     try {
//       const [resultsData, winnerData] = await Promise.all([
//         getElectionResults(electionId),
//         getWinner(electionId)
//       ]);
//       setResults(resultsData);
//       setWinner(winnerData);
//     } catch (error: any) {
//       console.error('Failed to load results:', error);
//       if (error.response?.status !== 404) {
//         toast.error('Failed to load results');
//       }
//       setResults([]);
//       setWinner(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleElectionSelect = async (election: Election) => {
//     setSelectedElection(election);
//     await loadResults(election.id);
//   };

//   const getMedalIcon = (rank: number) => {
//     if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
//     if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
//     if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
//     return null;
//   };

//   if (loadingElections) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
//         <span className="ml-2 text-gray-600">Loading elections...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Election Selector */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-xl font-semibold mb-4 flex items-center">
//           <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
//           Select Election
//         </h2>
        
//         {elections.length === 0 ? (
//           <div className="text-center py-8 bg-gray-50 rounded-lg">
//             <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//             <p className="text-gray-500">No completed elections yet.</p>
//             <p className="text-sm text-gray-400 mt-1">When elections are completed, results will appear here.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {elections.map(election => (
//               <button
//                 key={election.id}
//                 onClick={() => handleElectionSelect(election)}
//                 className={`text-left p-4 border rounded-lg transition ${
//                   selectedElection?.id === election.id
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
//                 }`}
//               >
//                 <h3 className="font-semibold text-lg">{election.name}</h3>
//                 <p className="text-sm text-gray-500 mt-1">{election.constituencyName}</p>
//                 <div className="flex justify-between items-center mt-2">
//                   <p className="text-xs text-gray-400">
//                     {new Date(election.electionEndDate).toLocaleDateString()}
//                   </p>
//                   {selectedElection?.id === election.id && (
//                     <span className="text-xs text-blue-600">Selected</span>
//                   )}
//                 </div>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Results Display */}
//       {selectedElection && loading && (
//         <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//           <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
//           <p className="text-gray-500">Loading results...</p>
//         </div>
//       )}

//       {selectedElection && !loading && results.length > 0 && (
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
//             <h2 className="text-xl font-semibold text-white">
//               Results for {selectedElection.name}
//             </h2>
//             <p className="text-blue-100 text-sm mt-1">{selectedElection.constituencyName}</p>
//           </div>

//           <div className="p-6">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left">Rank</th>
//                     <th className="px-4 py-3 text-left">Candidate</th>
//                     <th className="px-4 py-3 text-left">Party</th>
//                     <th className="px-4 py-3 text-right">Votes</th>
//                     <th className="px-4 py-3 text-right">Percentage</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {results.map(result => (
//                     <tr key={result.id} className="border-b hover:bg-gray-50">
//                       <td className="px-4 py-3">
//                         <div className="flex items-center space-x-2">
//                           {getMedalIcon(result.rank)}
//                           <span className="font-medium">{result.rank}</span>
//                         </div>
//                        </td>
//                       <td className="px-4 py-3 font-medium">{result.candidate?.name || 'N/A'}</td>
//                       <td className="px-4 py-3">{result.candidate?.party?.name || 'Independent'}</td>
//                       <td className="px-4 py-3 text-right">{result.totalVotes?.toLocaleString() || 0}</td>
//                       <td className="px-4 py-3 text-right">
//                         <div className="flex items-center justify-end space-x-2">
//                           <span>{result.votePercentage || 0}%</span>
//                           <div className="w-24 bg-gray-200 rounded-full h-2">
//                             <div 
//                               className="bg-blue-600 h-2 rounded-full" 
//                               style={{ width: `${result.votePercentage || 0}%` }}
//                             />
//                           </div>
//                         </div>
//                       </td>
//                      </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Winner Highlight */}
//             {winner && (
//               <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
//                 <div className="flex items-center space-x-4">
//                   <div className="bg-green-500 rounded-full p-3">
//                     <Trophy className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-green-700 font-semibold">WINNER</p>
//                     <p className="font-bold text-2xl text-green-800">
//                       {winner.candidate?.name}
//                     </p>
//                     <p className="text-green-600">
//                       {winner.candidate?.party?.name || 'Independent'} • Won by {winner.totalVotes?.toLocaleString()} votes ({winner.votePercentage}%)
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {selectedElection && !loading && results.length === 0 && !loadingElections && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
//           <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
//           <p className="text-yellow-700 font-medium">Results Not Available</p>
//           <p className="text-sm text-yellow-600 mt-1">
//             Results have not been computed for this election yet.
//           </p>
//           <p className="text-xs text-yellow-500 mt-2">
//             Please check back later or contact the election officer.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResultsView;
import React, { useState, useEffect } from 'react';
import { getCompletedElections, getElectionResults, getWinner } from '../../services/voter.service';  // ✅ Use voter.service, not admin.service
import { Election, ElectionResult } from '../../types';
import { Trophy, Medal, BarChart3, RefreshCw, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ResultsView: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [results, setResults] = useState<ElectionResult[]>([]);
  const [winner, setWinner] = useState<ElectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingElections, setLoadingElections] = useState(true);

  useEffect(() => {
    loadCompletedElections();
  }, []);

  const loadCompletedElections = async () => {
    setLoadingElections(true);
    try {
      const data = await getCompletedElections();
      console.log('📊 Completed elections:', data);
      setElections(data);
    } catch (error) {
      console.error('Failed to load completed elections:', error);
      toast.error('Failed to load elections');
    } finally {
      setLoadingElections(false);
    }
  };

  const loadResults = async (electionId: number) => {
    setLoading(true);
    try {
      const [resultsData, winnerData] = await Promise.all([
        getElectionResults(electionId),
        getWinner(electionId)
      ]);
      setResults(resultsData);
      setWinner(winnerData);
      console.log('📊 Results loaded:', resultsData);
      console.log('🏆 Winner:', winnerData);
    } catch (error: any) {
      console.error('Failed to load results:', error);
      if (error.response?.status === 403) {
        toast.error('Access denied. Please login with correct role.');
      } else if (error.response?.status !== 404) {
        toast.error('Failed to load results');
      }
      setResults([]);
      setWinner(null);
    } finally {
      setLoading(false);
    }
  };

  const handleElectionSelect = async (election: Election) => {
    setSelectedElection(election);
    await loadResults(election.id);
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
  };

  if (loadingElections) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading elections...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Election Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Select Election
        </h2>
        
        {elections.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No completed elections yet.</p>
            <p className="text-sm text-gray-400 mt-1">When elections are completed, results will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {elections.map(election => (
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
                <p className="text-sm text-gray-500 mt-1">{election.constituencyName}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">
                    {new Date(election.electionEndDate).toLocaleDateString()}
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
      {selectedElection && loading && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-500">Loading results...</p>
        </div>
      )}

      {selectedElection && !loading && results.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Results for {selectedElection.name}
            </h2>
            <p className="text-blue-100 text-sm mt-1">{selectedElection.constituencyName}</p>
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
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedElection && !loading && results.length === 0 && !loadingElections && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <p className="text-yellow-700 font-medium">Results Not Available</p>
          <p className="text-sm text-yellow-600 mt-1">
            Results have not been computed for this election yet.
          </p>
          <p className="text-xs text-yellow-500 mt-2">
            Please check back later or contact the election officer.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsView;