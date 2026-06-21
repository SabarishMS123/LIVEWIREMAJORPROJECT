import React, { useState, useEffect } from 'react';
import { getAllParties, approveParty } from '../../services/admin.service';
import { Party } from '../../types';
import { CheckCircle, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageParties: React.FC = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);

  const loadParties = async () => {
    try {
      const data = await getAllParties();
      setParties(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to load parties:', message);
      toast.error('Failed to load parties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadParties();
  }, []);

  const handleApprove = async (partyId: number) => {
    try {
      await approveParty(partyId);
      toast.success('Party approved successfully');
      loadParties();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Failed to approve party');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading parties...</div>;
  }

  const pendingParties = parties.filter(p => !p.approved);
  const approvedParties = parties.filter(p => p.approved);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Manage Parties</h2>

      {/* Pending Parties */}
      {pendingParties.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            Pending Approval
          </h3>
          <div className="space-y-4">
            {pendingParties.map(party => (
              <div key={party.id} className="border border-slate-300 bg-white/85 shadow-sm rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-6 h-6 text-gray-400" />
                    <div>
                      <h4 className="font-semibold">{party.name}</h4>
                      <p className="text-sm text-gray-500">{party.abbreviation}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Headquarters: {party.headquarters}</p>
                    <p>Registered: {new Date(party.registrationDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleApprove(party.id)}
                  className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Parties */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          Approved Parties
        </h3>
        {approvedParties.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No approved parties yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedParties.map(party => (
              <div key={party.id} className="border border-slate-300 bg-white/85 shadow-sm rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{party.name}</h4>
                    <p className="text-sm text-gray-500">{party.abbreviation}</p>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Headquarters: {party.headquarters}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Clock: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default ManageParties;