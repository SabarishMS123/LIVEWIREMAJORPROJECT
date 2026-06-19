// import React, { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { castVote } from '../../services/voter.service';
// import { Election, Candidate } from '../../types';
// import { CheckCircle, AlertCircle, Trophy } from 'lucide-react';

// interface CastVoteProps {
//   elections: Election[];
//   hasVotedStatus: Record<number, boolean>;
//   onVoteCast: () => void;
// }

// const CastVote: React.FC<CastVoteProps> = ({ elections, hasVotedStatus, onVoteCast }) => {
//   const [selectedElection, setSelectedElection] = useState<Election | null>(null);
//   const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [loading, setLoading] = useState(false);

//   const loadCandidates = async () => {
//     // This would call an API to get candidates for the election.
//     // For now, we'll use mock data until the candidate endpoint is available.
//     setCandidates([]);
//   };

//   useEffect(() => {
//     if (selectedElection) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       loadCandidates();
//     }
//   }, [selectedElection]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedElection || !selectedCandidate) {
//       toast.error('Please select a candidate');
//       return;
//     }

//     if (hasVotedStatus[selectedElection.id]) {
//       toast.error('You have already voted in this election');
//       return;
//     }

//     setLoading(true);
//     try {
//       await castVote(selectedCandidate, selectedElection.id);
//       toast.success('Vote cast successfully!');
//       onVoteCast();
//       setSelectedCandidate(null);
//       setSelectedElection(null);
//     } catch (error: unknown) {
//       const message = error instanceof Error ? error.message : String(error);
//       toast.error(message || 'Failed to cast vote');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const activeElections = elections.filter(e => e.status === 'ELECTION_ONGOING');
//   const completedElections = elections.filter(e => e.status === 'COMPLETED');

//   return (
//     <div className="space-y-6">
//       {/* Active Elections */}
//       {activeElections.length > 0 && (
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Active Elections</h2>
//           <div className="space-y-4">
//             {activeElections.map(election => (
//               <div
//                 key={election.id}
//                 className={`border rounded-lg p-4 cursor-pointer transition ${
//                   selectedElection?.id === election.id
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 hover:border-blue-300'
//                 }`}
//                 onClick={() => setSelectedElection(election)}
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold text-lg">{election.name}</h3>
//                     <p className="text-gray-500 text-sm">{election.description}</p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       Constituency: {election.constituencyName}
//                     </p>
//                   </div>
//                   {hasVotedStatus[election.id] && (
//                     <span className="flex items-center text-green-600 text-sm">
//                       <CheckCircle className="w-4 h-4 mr-1" />
//                       Voted
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Vote Form */}
//       {selectedElection && !hasVotedStatus[selectedElection.id] && (
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Cast Vote for: {selectedElection.name}
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-3 mb-6">
//               {candidates.map(candidate => (
//                 <label
//                   key={candidate.id}
//                   className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
//                     selectedCandidate === candidate.id
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:bg-gray-50'
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="candidate"
//                     value={candidate.id}
//                     checked={selectedCandidate === candidate.id}
//                     onChange={() => setSelectedCandidate(candidate.id)}
//                     className="mr-3"
//                   />
//                   <div>
//                     <p className="font-medium">{candidate.name}</p>
//                     <p className="text-sm text-gray-500">{candidate.party?.name}</p>
//                   </div>
//                 </label>
//               ))}
//             </div>

//             <div className="flex space-x-3">
//               <button
//                 type="submit"
//                 disabled={loading || !selectedCandidate}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {loading ? 'Casting Vote...' : 'Cast Vote'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setSelectedElection(null)}
//                 className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Completed Elections with Winners */}
//       {completedElections.length > 0 && (
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
//             Completed Elections Results
//           </h2>
//           <div className="space-y-4">
//             {completedElections.map(election => (
//               <div key={election.id} className="border-b pb-3">
//                 <h3 className="font-semibold">{election.name}</h3>
//                 <p className="text-sm text-gray-500">{election.constituencyName}</p>
//                 <button
//                   onClick={() => setSelectedElection(election)}
//                   className="text-blue-600 text-sm hover:underline mt-1"
//                 >
//                   View Results
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* No Active Elections */}
//       {activeElections.length === 0 && !selectedElection && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
//           <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-yellow-800">No Active Elections</h3>
//           <p className="text-yellow-600">There are no ongoing elections in your constituency at this time.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CastVote;

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { castVote, hasVoted, getWinner } from '../../services/voter.service';
import { getCandidatesByElection } from '../../services/candidate.service';
import { Election, Candidate } from '../../types';
import { CheckCircle, AlertCircle, Trophy, UserCheck, Send } from 'lucide-react';

interface CastVoteProps {
  elections: Election[];
  hasVotedStatus: Record<number, boolean>;
  onVoteCast: () => void;
}

const CastVote: React.FC<CastVoteProps> = ({ elections, hasVotedStatus, onVoteCast }) => {
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [winner, setWinner] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedElection) {
      loadCandidates();
      loadWinner();
    }
  }, [selectedElection]);

  const loadCandidates = async () => {
    setLoadingCandidates(true);
    try {
      console.log("🔍 Loading candidates for election:", selectedElection?.id);
      const data = await getCandidatesByElection(selectedElection!.id);
      console.log("📋 Candidates received:", data);
      setCandidates(data);
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Failed to load candidates:', error);
      toast.error('Failed to load candidates');
      setCandidates([]);
    } finally {
      setLoadingCandidates(false);
    }
  };

  const loadWinner = async () => {
    if (selectedElection?.status === 'COMPLETED') {
      try {
        const data = await getWinner(selectedElection.id);
        setWinner(data);
      } catch (error) {
        console.error('Failed to load winner:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedElection || !selectedCandidate) {
      toast.error('Please select a candidate');
      return;
    }

    if (hasVotedStatus[selectedElection.id]) {
      toast.error('You have already voted in this election');
      return;
    }

    setLoading(true);
    try {
      await castVote(selectedCandidate, selectedElection.id);
      toast.success('Vote cast successfully!');
      setSubmitted(true);
      onVoteCast();
      setTimeout(() => {
        setSelectedElection(null);
        setSelectedCandidate(null);
        setSubmitted(false);
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to cast vote');
    } finally {
      setLoading(false);
    }
  };

  const activeElections = elections.filter(e => e.status === 'ELECTION_ONGOING');
  const completedElections = elections.filter(e => e.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      {/* Active Elections List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Active Elections</h2>
        {activeElections.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-800">No Active Elections</h3>
            <p className="text-yellow-600">There are no ongoing elections in your constituency at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeElections.map(election => (
              <div
                key={election.id}
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  selectedElection?.id === election.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => {
                  setSelectedElection(election);
                  setSubmitted(false);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{election.name}</h3>
                    <p className="text-gray-500 text-sm">{election.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Constituency: {election.constituencyName}
                    </p>
                    <p className="text-xs text-gray-400">
                      Election Date: {new Date(election.electionStartDate).toLocaleDateString()} - {new Date(election.electionEndDate).toLocaleDateString()}
                    </p>
                  </div>
                  {hasVotedStatus[election.id] && (
                    <span className="flex items-center text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Voted
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vote Form - Show when election is selected and not voted */}
      {selectedElection && !hasVotedStatus[selectedElection.id] && !submitted && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Cast Vote for: {selectedElection.name}
            </h2>
            <button
              onClick={() => {
                setSelectedElection(null);
                setSelectedCandidate(null);
                setCandidates([]);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>

          {loadingCandidates ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading candidates...</p>
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-8 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <p className="text-yellow-700">No candidates available for this election yet.</p>
              <p className="text-sm text-yellow-600 mt-1">Please check back later.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-3 mb-6">
                {candidates.map(candidate => (
                  <label
                    key={candidate.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                      selectedCandidate === candidate.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="candidate"
                      value={candidate.id}
                      checked={selectedCandidate === candidate.id}
                      onChange={() => setSelectedCandidate(candidate.id)}
                      className="mr-4 w-5 h-5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-lg">{candidate.name}</p>
                          <p className="text-sm text-gray-500">
                            {candidate.party?.name || 'Independent Candidate'}
                          </p>
                          {candidate.fatherName && (
                            <p className="text-xs text-gray-400">Son of {candidate.fatherName}</p>
                          )}
                        </div>
                        {candidate.party?.symbol && (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img 
                              src={candidate.party.symbol} 
                              alt={candidate.party.name}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading || !selectedCandidate}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Casting Vote...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Cast Vote</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedElection(null);
                    setSelectedCandidate(null);
                    setCandidates([]);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Success Message */}
      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800">Vote Cast Successfully!</h3>
          <p className="text-green-600">Your vote has been recorded. Thank you for participating in the democratic process.</p>
        </div>
      )}

      {/* Completed Elections Results Preview */}
      {completedElections.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            Completed Elections
          </h2>
          <div className="space-y-3">
            {completedElections.map(election => (
              <div key={election.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{election.name}</h3>
                    <p className="text-sm text-gray-500">{election.constituencyName}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedElection(election);
                      loadWinner();
                    }}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View Results
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Winner Display */}
      {winner && selectedElection?.status === 'COMPLETED' && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-500 rounded-full p-3">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-yellow-700">Winner Announcement</p>
              <p className="font-bold text-xl">
                {winner.candidate?.name} ({winner.candidate?.party?.name || 'Independent'})
              </p>
              <p className="text-sm text-yellow-600">
                Won by {winner.totalVotes} votes ({winner.votePercentage}%)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastVote;