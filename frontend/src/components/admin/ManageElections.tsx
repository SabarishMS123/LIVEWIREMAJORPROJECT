import React, { useState, useEffect } from 'react';
import { getAllConstituencies } from '../../services/admin.service';
import { scheduleElection, getAllElections, startNomination, endNomination, startElection, endElection, computeResults, getWinner } from '../../services/admin.service';
import { Constituency, Election, ElectionResult } from '../../types';
import { Plus, Play, StopCircle, BarChart3, Calendar, MapPin, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageElections: React.FC = () => {
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [winners, setWinners] = useState<Record<number, ElectionResult | null>>({});
  const [winnerLoading, setWinnerLoading] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [searchElectionId, setSearchElectionId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    constituencyId: '',
    nominationStartDate: '',
    nominationEndDate: '',
    electionStartDate: '',
    electionEndDate: ''
  });

  const loadData = async () => {
    try {
      const [constituenciesData, electionsData] = await Promise.all([
        getAllConstituencies(),
        getAllElections()
      ]);
      setConstituencies(constituenciesData);
      setElections(electionsData);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to load data:', message);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await scheduleElection({
        name: formData.name,
        description: formData.description,
        constituencyId: parseInt(formData.constituencyId),
        nominationStartDate: new Date(formData.nominationStartDate).toISOString(),
        nominationEndDate: new Date(formData.nominationEndDate).toISOString(),
        electionStartDate: new Date(formData.electionStartDate).toISOString(),
        electionEndDate: new Date(formData.electionEndDate).toISOString()
      });
      toast.success('Election scheduled successfully');
      resetForm();
      loadData();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Failed to schedule election');
    }
  };

  const handleAction = async (electionId: number, action: string) => {
    try {
      switch (action) {
        case 'startNomination':
          await startNomination(electionId);
          toast.success('Nomination started');
          break;
        case 'endNomination':
          await endNomination(electionId);
          toast.success('Nomination ended');
          break;
        case 'startElection':
          await startElection(electionId);
          toast.success('Election started');
          break;
        case 'endElection':
          await endElection(electionId);
          toast.success('Election ended');
          break;
        case 'computeResults':
          await computeResults(electionId);
          toast.success('Results computed');
          break;
      }
      loadData();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Action failed');
    }
  };

  const loadWinner = async (electionId: number) => {
    setWinnerLoading(prev => ({ ...prev, [electionId]: true }));
    try {
      const winnerData = await getWinner(electionId);
      setWinners(prev => ({ ...prev, [electionId]: winnerData }));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes('404')) {
        toast.error('Unable to load winner');
      }
      setWinners(prev => ({ ...prev, [electionId]: null }));
    } finally {
      setWinnerLoading(prev => ({ ...prev, [electionId]: false }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      constituencyId: '',
      nominationStartDate: '',
      nominationEndDate: '',
      electionStartDate: '',
      electionEndDate: ''
    });
    setShowForm(false);
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: 'bg-gray-200 text-gray-700',
      NOMINATION_ONGOING: 'bg-yellow-100 text-yellow-700',
      NOMINATION_CLOSED: 'bg-orange-100 text-orange-700',
      ELECTION_ONGOING: 'bg-blue-100 text-blue-700',
      COMPLETED: 'bg-green-100 text-green-700'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${colors[status] || 'bg-gray-200'}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getAvailableActions = (election: Election) => {
    const actions = [];
    switch (election.status) {
      case 'DRAFT':
        actions.push({ label: 'Start Nomination', action: 'startNomination' });
        break;
      case 'NOMINATION_ONGOING':
        actions.push({ label: 'End Nomination', action: 'endNomination' });
        break;
      case 'NOMINATION_CLOSED':
        actions.push({ label: 'Start Election', action: 'startElection' });
        break;
      case 'ELECTION_ONGOING':
        actions.push({ label: 'End Election', action: 'endElection' });
        break;
      case 'COMPLETED':
        actions.push({ label: 'Compute Results', action: 'computeResults' });
        break;
    }
    return actions;
  };

  const filteredElections = elections.filter((election) => {
    return searchElectionId.trim()
      ? election.id.toString().includes(searchElectionId.trim())
      : true;
  });

  if (loading) {
    return <div className="text-center py-8">Loading elections...</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Elections</h2>
          <p className="text-gray-500 text-sm mt-1">Search elections by ID and manage election lifecycle actions.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Election</span>
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search by Election ID</label>
        <input
          type="text"
          value={searchElectionId}
          onChange={(e) => setSearchElectionId(e.target.value)}
          placeholder="Enter election ID"
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Election List */}
      <div className="space-y-4">
        {filteredElections.map(election => (
          <div key={election.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{election.name}</h3>
                <p className="text-gray-500 text-sm">{election.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {election.constituencyName}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(election.electionStartDate).toLocaleDateString()} - {new Date(election.electionEndDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(election.status)}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {getAvailableActions(election).map(action => (
                  <button
                    key={action.action}
                    onClick={() => handleAction(election.id, action.action)}
                    className="flex items-center space-x-1 text-sm bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
                  >
                    {action.action === 'startNomination' && <Play className="w-3 h-3" />}
                    {action.action === 'endNomination' && <StopCircle className="w-3 h-3" />}
                    {action.action === 'startElection' && <Play className="w-3 h-3" />}
                    {action.action === 'endElection' && <StopCircle className="w-3 h-3" />}
                    {action.action === 'computeResults' && <BarChart3 className="w-3 h-3" />}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>

              {election.status === 'COMPLETED' && (
                <div className="rounded-lg bg-green-50 border border-green-100 p-3 text-sm">
                  {winnerLoading[election.id] ? (
                    <p className="text-green-700">Loading winner...</p>
                  ) : winners[election.id] ? (
                    <div className="flex items-center gap-3 text-green-700">
                      <Trophy className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Winner:</p>
                        <p>
                          {winners[election.id]?.candidate.name} ({winners[election.id]?.candidate.party?.name})
                        </p>
                        <p className="text-sm text-green-600">
                          {winners[election.id]?.totalVotes} votes ({winners[election.id]?.votePercentage}%)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => loadWinner(election.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                    >
                      View Winner
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredElections.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No elections found matching your search criteria.
          </div>
        )}
      </div>

      {/* Schedule Election Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Schedule Election</h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Election Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Constituency *
                </label>
                <select
                  name="constituencyId"
                  value={formData.constituencyId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Constituency</option>
                  {constituencies.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomination Start *
                  </label>
                  <input
                    type="datetime-local"
                    name="nominationStartDate"
                    value={formData.nominationStartDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomination End *
                  </label>
                  <input
                    type="datetime-local"
                    name="nominationEndDate"
                    value={formData.nominationEndDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Election Start *
                  </label>
                  <input
                    type="datetime-local"
                    name="electionStartDate"
                    value={formData.electionStartDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Election End *
                  </label>
                  <input
                    type="datetime-local"
                    name="electionEndDate"
                    value={formData.electionEndDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Schedule Election
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageElections;