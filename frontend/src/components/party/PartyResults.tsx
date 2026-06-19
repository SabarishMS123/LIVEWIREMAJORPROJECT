// import React, { useState, useEffect } from 'react';
// import { getAllElections } from '../../services/admin.service';
// import { getPartyResults, getWinner } from '../../services/party.service';
// import { Election, ElectionResult } from '../../types';
// import { Trophy, Medal, BarChart3, RefreshCw } from 'lucide-react';
// import toast from 'react-hot-toast';

// const PartyResults: React.FC = () => {
//   const [elections, setElections] = useState<Election[]>([]);
//   const [selectedElection, setSelectedElection] = useState<Election | null>(null);
//   const [results, setResults] = useState<ElectionResult[]>([]);
//   const [winner, setWinner] = useState<ElectionResult | null>(null);
//   const [loading, setLoading] = useState(false);

//  const loadElections = async () => {
//     setLoading(true);
//     try {
//       // Use party-specific endpoint
//       const data = await getPartyElections();
//       setElections(data);
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : String(error);
//       console.error('Failed to load elections:', message);
//       toast.error('Failed to load elections');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadElections();
//   }, []);
//   const loadResults = async (electionId: number) => {
//     setLoading(true);
//     try {
//       const [resultsData, winnerData] = await Promise.all([
//         getPartyResults(electionId),
//         getWinner(electionId)
//       ]);
//       setResults(resultsData);
//       setWinner(winnerData);
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : String(error);
//       if (!message.includes('404')) {
//         toast.error('Failed to load results');
//       }
//       setResults([]);
//       setWinner(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleElectionSelect = (election: Election) => {
//     setSelectedElection(election);
//     loadResults(election.id);
//   };

//   const getMedalIcon = (rank: number) => {
//     if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
//     if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
//     if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
//     return null;
//   };

//   const completedElections = elections.filter(e => e.status === 'COMPLETED');

//   return (
//     <div className="space-y-6">
//       {/* Election Selector */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-xl font-semibold mb-4 flex items-center">
//           <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
//           Select Election
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {completedElections.map(election => (
//             <button
//               key={election.id}
//               onClick={() => handleElectionSelect(election)}
//               className={`text-left p-3 border rounded-lg transition ${
//                 selectedElection?.id === election.id
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-blue-300'
//               }`}
//             >
//               <h3 className="font-semibold">{election.name}</h3>
//               <p className="text-sm text-gray-500">{election.constituencyName}</p>
//               <p className="text-xs text-gray-400 mt-1">
//                 {new Date(election.electionEndDate).toLocaleDateString()}
//               </p>
//             </button>
//           ))}
//         </div>
//         {completedElections.length === 0 && (
//           <p className="text-gray-500 text-center py-4">No completed elections yet.</p>
//         )}
//       </div>

//       {/* Results Display */}
//       {selectedElection && loading && (
//         <div className="text-center py-8">Loading results...</div>
//       )}

//       {selectedElection && !loading && results.length > 0 && (
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">
//               Results for {selectedElection.name}
//             </h2>
//             <button
//               onClick={() => loadResults(selectedElection.id)}
//               className="text-blue-600 hover:text-blue-700"
//             >
//               <RefreshCw className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Rank</th>
//                   <th className="px-4 py-2 text-left">Candidate</th>
//                   <th className="px-4 py-2 text-left">Party</th>
//                   <th className="px-4 py-2 text-right">Votes</th>
//                   <th className="px-4 py-2 text-right">Percentage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map(result => (
//                   <tr key={result.id} className="border-b">
//                     <td className="px-4 py-3">
//                       <div className="flex items-center space-x-1">
//                         {getMedalIcon(result.rank)}
//                         <span>{result.rank}</span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 font-medium">{result.candidate.name}</td>
//                     <td className="px-4 py-3">{result.candidate.party?.name}</td>
//                     <td className="px-4 py-3 text-right">{result.totalVotes}</td>
//                     <td className="px-4 py-3 text-right">{result.votePercentage}%</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Winner Highlight */}
//           {winner && (
//             <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <Trophy className="w-8 h-8 text-yellow-500" />
//                 <div>
//                   <p className="text-sm text-green-700">Winner</p>
//                   <p className="font-bold text-lg">
//                     {winner.candidate.name} ({winner.candidate.party?.name})
//                   </p>
//                   <p className="text-sm text-green-600">
//                     Won by {winner.totalVotes} votes ({winner.votePercentage}%)
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {selectedElection && !loading && results.length === 0 && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
//           <p className="text-yellow-700">Results not yet computed for this election.</p>
//           <p className="text-sm text-yellow-600 mt-1">Please check back later.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PartyResults;

import React, { useState, useEffect } from 'react';
import { getPartyResults, getWinner, getPartyElections } from '../../services/party.service';
import { Election, ElectionResult } from '../../types';
import { Trophy, Medal, BarChart3, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const PartyResults: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [results, setResults] = useState<ElectionResult[]>([]);
  const [winner, setWinner] = useState<ElectionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const loadElections = async () => {
    setLoading(true);
    try {
      const data = await getPartyElections();
      setElections(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to load elections:', message);
      toast.error('Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadElections();
  }, []);

  const loadResults = async (electionId: number) => {
    setLoading(true);
    try {
      const [resultsData, winnerData] = await Promise.all([
        getPartyResults(electionId),
        getWinner(electionId)
      ]);
      setResults(resultsData);
      setWinner(winnerData);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes('404')) {
        toast.error('Failed to load results');
      }
      setResults([]);
      setWinner(null);
    } finally {
      setLoading(false);
    }
  };

  const handleElectionSelect = (election: Election) => {
    setSelectedElection(election);
    loadResults(election.id);
  };

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const completedElections = elections.filter(e => e.status === 'COMPLETED');

  if (loading && elections.length === 0) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {completedElections.map(election => (
            <button
              key={election.id}
              onClick={() => handleElectionSelect(election)}
              className={`text-left p-3 border rounded-lg transition ${
                selectedElection?.id === election.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="font-semibold">{election.name}</h3>
              <p className="text-sm text-gray-500">{election.constituencyName}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(election.electionEndDate).toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>
        {completedElections.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            <p>No completed elections yet.</p>
            <p className="text-sm mt-2">When elections are completed, results will appear here.</p>
          </div>
        )}
      </div>

      {/* Results Display */}
      {selectedElection && loading && (
        <div className="text-center py-8">
          <RefreshCw className="w-6 h-6 text-blue-600 animate-spin mx-auto mb-2" />
          <p className="text-gray-500">Loading results...</p>
        </div>
      )}

      {selectedElection && !loading && results.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Results for {selectedElection.name}
            </h2>
            <button
              onClick={() => loadResults(selectedElection.id)}
              className="text-blue-600 hover:text-blue-700"
              title="Refresh Results"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Rank</th>
                  <th className="px-4 py-2 text-left">Candidate</th>
                  <th className="px-4 py-2 text-left">Party</th>
                  <th className="px-4 py-2 text-right">Votes</th>
                  <th className="px-4 py-2 text-right">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        {getMedalIcon(result.rank)}
                        <span>{result.rank}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{result.candidate.name}</td>
                    <td className="px-4 py-3">{result.candidate.party?.name || 'Independent'}</td>
                    <td className="px-4 py-3 text-right">{result.totalVotes?.toLocaleString() || 0}</td>
                    <td className="px-4 py-3 text-right">{result.votePercentage || 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Winner Highlight */}
          {winner && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-green-700 font-semibold">Winner</p>
                  <p className="font-bold text-lg">
                    {winner.candidate.name} ({winner.candidate.party?.name || 'Independent'})
                  </p>
                  <p className="text-sm text-green-600">
                    Won by {winner.totalVotes?.toLocaleString()} votes ({winner.votePercentage}%)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedElection && !loading && results.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-yellow-700">Results not yet computed for this election.</p>
          <p className="text-sm text-yellow-600 mt-1">Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default PartyResults;