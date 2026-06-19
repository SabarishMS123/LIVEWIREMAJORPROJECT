import React, { useState } from 'react';
import AddCandidate from './AddCandidate';
import CandidateList from './CandidateList';
import PartyResults from './PartyResults';
import { Building2, Users, BarChart3, PlusCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type TabType = 'candidates' | 'addCandidate' | 'results';

const PartyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('candidates');
  const { logout } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Party Dashboard</h1>
        </div>
        <button
          onClick={logout}
          className="text-red-600 hover:text-red-700"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 border-b">
        <button
          onClick={() => setActiveTab('candidates')}
          className={`flex items-center space-x-2 px-4 py-2 transition ${
            activeTab === 'candidates'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>My Candidates</span>
        </button>
        <button
          onClick={() => setActiveTab('addCandidate')}
          className={`flex items-center space-x-2 px-4 py-2 transition ${
            activeTab === 'addCandidate'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Candidate</span>
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`flex items-center space-x-2 px-4 py-2 transition ${
            activeTab === 'results'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Election Results</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'candidates' && <CandidateList />}
      {activeTab === 'addCandidate' && <AddCandidate />}
      {activeTab === 'results' && <PartyResults />}
    </div>
  );
};

export default PartyDashboard;