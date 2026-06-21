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
      <div className="glass rounded-[2rem] p-8 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
        <p className="mt-4 text-slate-600">Loading candidates...</p>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="glass rounded-[2rem] p-8">
        <h2 className="section-title text-slate-900">Candidate List</h2>
        <p className="mt-4 text-slate-600">No candidate data available yet.</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-[2rem] p-6">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-600">Party Records</p>
        <h2 className="section-title mt-2 text-slate-900">Candidate List</h2>
      </div>
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">ID</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">Name</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">Party</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">Constituency</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <tr key={candidate.id} className="border-t border-white/60 hover:bg-white/50">
                <td className="px-4 py-3 text-sm text-slate-700">{candidate.id}</td>
                <td className="px-4 py-3 text-sm font-bold text-slate-900">{candidate.name}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{candidate.party?.name || '-'}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{candidate.constituency?.name || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateList;
