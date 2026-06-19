import React, { useState, useEffect } from 'react';
import { getPartyCandidates } from '../../services/party.service';
import { Candidate } from '../../types';
import { Loader2 } from 'lucide-react';

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCandidates = async () => {
    try {
      const data = await getPartyCandidates();
      setCandidates(data);
    } catch (error: unknown) {
      console.error('Failed to load candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCandidates();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm text-center">
        <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600" />
        <p className="mt-4 text-gray-600">Loading candidates...</p>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">Candidate List</h2>
        <p className="mt-4 text-gray-600">No candidate data available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Candidate List</h2>
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">ID</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Party</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Constituency</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id} className="border-t">
              <td className="px-4 py-3 text-sm text-gray-700">{candidate.id}</td>
              <td className="px-4 py-3 text-sm font-medium text-gray-800">{candidate.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{candidate.party?.name || '-'}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{candidate.constituency?.name || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
