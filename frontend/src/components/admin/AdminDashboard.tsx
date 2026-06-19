import React, { useState } from 'react';
import ManageConstituencies from './ManageConstituencies';
import ManageElections from './ManageElections';
import ManageNominations from './ManageNominations';
import ManageParties from './ManageParties';
import ManageVoters from './ManageVoters';
import { MapPin, Vote, FileCheck, Building2, Users, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type TabType = 'constituencies' | 'elections' | 'nominations' | 'parties' | 'voters';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('constituencies');
  const { logout } = useAuth();

  const tabs = [
    { id: 'constituencies', label: 'Constituencies', icon: MapPin },
    { id: 'elections', label: 'Elections', icon: Vote },
    { id: 'nominations', label: 'Nominations', icon: FileCheck },
    { id: 'parties', label: 'Parties', icon: Building2 },
    { id: 'voters', label: 'Voters', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Returning Officer Dashboard
          </h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center space-x-2 px-4 py-2 transition ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {activeTab === 'constituencies' && <ManageConstituencies />}
        {activeTab === 'elections' && <ManageElections />}
        {activeTab === 'nominations' && <ManageNominations />}
        {activeTab === 'parties' && <ManageParties />}
        {activeTab === 'voters' && <ManageVoters />}
      </div>
    </div>
  );
};

export default AdminDashboard;