import React, { useState, useEffect } from 'react';
import { getAllElections, getPendingNominations, acceptNomination, rejectNomination } from '../../services/admin.service';
import { Election, Nomination } from '../../types';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageNominations: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);

  const loadElections = async () => {
    try {
      const data = await getAllElections();
      setElections(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to load elections:', message);
      toast.error('Failed to load elections');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadElections();
  }, []);

  const loadNominations = async (electionId: number) => {
    setLoading(true);
    try {
      const data = await getPendingNominations(electionId);
      setNominations(data);
    } catch (error) {
      console.error('Failed to load nominations:', error);
      toast.error('Failed to load nominations');
    } finally {
      setLoading(false);
    }
  };

  const handleElectionSelect = (election: Election) => {
    setSelectedElection(election);
    loadNominations(election.id);
  };

  const handleAccept = async (nominationId: number) => {
    try {
      await acceptNomination(nominationId);
      toast.success('Nomination accepted');
      if (selectedElection) {
        loadNominations(selectedElection.id);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Failed to accept nomination');
    }
  };

  const handleReject = async () => {
    if (!selectedNomination) return;
    try {
      await rejectNomination(selectedNomination.id, rejectReason);
      toast.success('Nomination rejected');
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedNomination(null);
      if (selectedElection) {
        loadNominations(selectedElection.id);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Failed to reject nomination');
    }
  };

  const openRejectModal = (nomination: Nomination) => {
    setSelectedNomination(nomination);
    setShowRejectModal(true);
  };

  const openDocument = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const nominationOngoingElections = elections.filter(e => e.status === 'NOMINATION_ONGOING');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Manage Nominations</h2>

      {/* Election Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Election
        </label>
        <select
          value={selectedElection?.id || ''}
          onChange={(e) => {
            const election = elections.find(el => el.id === parseInt(e.target.value));
            if (election) handleElectionSelect(election);
          }}
          className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an election</option>
          {nominationOngoingElections.map(election => (
            <option key={election.id} value={election.id}>
              {election.name} - {election.constituencyName}
            </option>
          ))}
        </select>
      </div>

      {/* Nominations List */}
      {selectedElection && (
        <div>
          {loading ? (
            <div className="text-center py-8">Loading nominations...</div>
          ) : nominations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No pending nominations for this election.
            </div>
          ) : (
            <div className="space-y-4">
              {nominations.map(nomination => (
                <div key={nomination.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {nomination.candidate.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Party: {nomination.party?.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Constituency: {nomination.candidate.constituency?.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Submitted: {nomination.submissionDate ? new Date(nomination.submissionDate).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {nomination.manifestoUrl && (
                        <button
                          onClick={() => openDocument(nomination.manifestoUrl!)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Manifesto</span>
                        </button>
                      )}
                      {nomination.affidavitUrl && (
                        <button
                          onClick={() => openDocument(nomination.affidavitUrl!)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Affidavit</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => handleAccept(nomination.id)}
                      className="flex items-center space-x-1 bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => openRejectModal(nomination)}
                      className="flex items-center space-x-1 bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Reject Nomination</h3>
            <p className="text-gray-600 mb-4">
              Candidate: {selectedNomination?.candidate.name}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rejection Reason *
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleReject}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                  setSelectedNomination(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNominations;