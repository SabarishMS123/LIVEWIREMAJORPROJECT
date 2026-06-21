import React, { useState } from 'react';
import ManageConstituencies from './ManageConstituencies';
import ManageElections from './ManageElections';
import ManageNominations from './ManageNominations';
import ManageParties from './ManageParties';
import ManageVoters from './ManageVoters';
import { MapPin, Vote, FileCheck, Building2, Users, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ecilogo from '../../assets/ecilogo.png';

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
    <div>
      <div className="glass rounded-[2rem] p-8 mb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-white/70 p-2 shadow-lg sm:flex">
              <img src={ecilogo} alt="Election Commission logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Returning Officer</p>
              <h1 className="section-title mt-2">Admin Dashboard</h1>
              <p className="mt-2 text-sm text-slate-500">Manage elections, nominations, parties, voters, and constituencies.</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="secondary-button text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="glass-card mb-8 rounded-3xl p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center space-x-2 rounded-2xl px-4 py-3 text-sm font-bold transition duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6 min-h-[70vh] lg:min-h-[75vh]">
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
