import React, { useState } from 'react';
import AddCandidate from './AddCandidate';
import CandidateList from './CandidateList';
import PartyResults from './PartyResults';
import { Building2, Users, BarChart3, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ecilogo from '../../assets/ecilogo.png';

type TabType = 'candidates' | 'addCandidate' | 'results';

const PartyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('candidates');
  const { logout } = useAuth();

  const tabs = [
    { id: 'candidates', label: 'My Candidates', icon: Users },
    { id: 'addCandidate', label: 'Add Candidate', icon: PlusCircle },
    { id: 'results', label: 'Election Results', icon: BarChart3 },
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
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-600">Political Party</p>
              <h1 className="section-title mt-2">Party Dashboard</h1>
              <p className="mt-2 text-sm text-slate-500">Manage candidates, nominations, and election results.</p>
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
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6">
        {activeTab === 'candidates' && <CandidateList />}
        {activeTab === 'addCandidate' && <AddCandidate />}
        {activeTab === 'results' && <PartyResults />}
      </div>
    </div>
  );
};

export default PartyDashboard;
