import React, { useState, useEffect } from 'react';
import { getMyNominations, getActiveElectionsForCandidate } from '../../services/candidate.service';
import { Election, Nomination } from '../../types';
import { Clock, CheckCircle, XCircle, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const NominationStatus: React.FC = () => {
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [activeElections, setActiveElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [nominationsData, electionsData] = await Promise.all([
        getMyNominations(),
        getActiveElectionsForCandidate()
      ]);
      setNominations(nominationsData);
      setActiveElections(electionsData);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to load nominations:', message);
      toast.error('Failed to load nomination status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'ACCEPTED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  const openDocument = (url: string, type: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error(`${type} document not available`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading nominations...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            My Nomination Status
          </h2>
        </div>

        {nominations.length === 0 ? (
          <div className="p-8 text-center">
            <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Nominations Found</h3>
            <p className="text-gray-500">
              You haven't submitted any nominations yet. 
              {activeElections.length > 0 && ' There are active elections you can apply for.'}
            </p>
            {activeElections.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Active Elections: {activeElections.length}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {nominations.map((nomination) => (
              <div key={nomination.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(nomination.status)}
                      <h3 className="font-semibold text-lg">
                        {nomination.election?.name || 'Election'}
                      </h3>
                      {getStatusBadge(nomination.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Constituency</p>
                        <p className="font-medium">{nomination.election?.constituencyName || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Party</p>
                        <p className="font-medium">{nomination.party?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submission Date</p>
                        <p className="font-medium">
                          {nomination.submissionDate ? new Date(nomination.submissionDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      {nomination.reviewedDate && (
                        <div>
                          <p className="text-sm text-gray-500">Reviewed Date</p>
                          <p className="font-medium">
                            {nomination.reviewedDate ? new Date(nomination.reviewedDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      )}
                    </div>

                    {nomination.rejectionReason && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700 font-medium">Rejection Reason:</p>
                        <p className="text-sm text-red-600">{nomination.rejectionReason}</p>
                      </div>
                    )}

                    {/* Documents Section */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Submitted Documents</p>
                      <div className="flex flex-wrap gap-3">
                        {nomination.manifestoUrl && (
                          <button
                            onClick={() => openDocument(nomination.manifestoUrl!, 'Manifesto')}
                            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Manifesto</span>
                          </button>
                        )}
                        {nomination.affidavitUrl && (
                          <button
                            onClick={() => openDocument(nomination.affidavitUrl!, 'Affidavit')}
                            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Affidavit</span>
                          </button>
                        )}
                        {nomination.nominationFormUrl && (
                          <button
                            onClick={() => openDocument(nomination.nominationFormUrl!, 'Nomination Form')}
                            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Nomination Form</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedNomination(nomination)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nomination Details Modal */}
      {selectedNomination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Nomination Details</h3>
              <button
                onClick={() => setSelectedNomination(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Candidate Name</p>
                  <p className="font-medium">{selectedNomination.candidate?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Father's Name</p>
                  <p className="font-medium">{selectedNomination.candidate?.fatherName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Party</p>
                  <p className="font-medium">{selectedNomination.party?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedNomination.status)}
                    <span className="font-medium">{selectedNomination.status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Election</p>
                  <p className="font-medium">{selectedNomination.election?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Constituency</p>
                  <p className="font-medium">{selectedNomination.election?.constituencyName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="font-medium">
                    {selectedNomination.submissionDate ? new Date(selectedNomination.submissionDate).toLocaleString() : 'N/A'}
                  </p>
                </div>
                {selectedNomination.reviewedDate && (
                  <div>
                    <p className="text-sm text-gray-500">Reviewed Date</p>
                    <p className="font-medium">
                      {selectedNomination.reviewedDate ? new Date(selectedNomination.reviewedDate).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                )}
              </div>

              {selectedNomination.rejectionReason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-700">Rejection Reason</p>
                  <p className="text-red-600">{selectedNomination.rejectionReason}</p>
                </div>
              )}

              {/* Documents */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Documents</p>
                <div className="space-y-2">
                  {selectedNomination.manifestoUrl && (
                    <a
                      href={selectedNomination.manifestoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Manifesto Document</span>
                    </a>
                  )}
                  {selectedNomination.affidavitUrl && (
                    <a
                      href={selectedNomination.affidavitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Affidavit Document</span>
                    </a>
                  )}
                  {selectedNomination.nominationFormUrl && (
                    <a
                      href={selectedNomination.nominationFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Nomination Form</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedNomination(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NominationStatus;