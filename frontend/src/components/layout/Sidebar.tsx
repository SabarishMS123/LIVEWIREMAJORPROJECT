import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Vote,
  Users,
  Building2,
  FileCheck,
  MapPin,
  Calendar,
  BarChart3,
  UserCheck,
  LogOut,
  X,
} from 'lucide-react';
import ecilogo from '../../assets/ecilogo.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const role = (user?.role || '').toUpperCase();

  const getMenuItems = () => {
    if (role.includes('VOTER')) {
      return [
        { path: '/voter/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/voter/cast-vote', label: 'Cast Vote', icon: Vote },
        { path: '/voter/results', label: 'Results', icon: BarChart3 },
        { path: '/voter/profile', label: 'My Profile', icon: UserCheck },
      ];
    }

    if (role.includes('PARTY')) {
      return [
        { path: '/party/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/party/candidates', label: 'My Candidates', icon: Users },
        { path: '/party/add-candidate', label: 'Add Candidate', icon: UserCheck },
        { path: '/party/results', label: 'Results', icon: BarChart3 },
      ];
    }

    if (role.includes('CANDIDATE')) {
      return [
        { path: '/candidate/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/candidate/nominations', label: 'Nominations', icon: FileCheck },
      ];
    }

    if (role.includes('RO_RETURNING_OFFICER')) {
      return [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/constituencies', label: 'Constituencies', icon: MapPin },
        { path: '/admin/elections', label: 'Elections', icon: Calendar },
        { path: '/admin/nominations', label: 'Nominations', icon: FileCheck },
        { path: '/admin/parties', label: 'Parties', icon: Building2 },
        { path: '/admin/voters', label: 'Voters', icon: Users },
        { path: '/admin/results', label: 'Results', icon: BarChart3 },
      ];
    }

    return [];
  };

  const menuItems = getMenuItems();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 h-screen min-h-screen w-80 transform overflow-y-auto border-r border-slate-200/10 bg-slate-950/95 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/10 p-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src={ecilogo}
              alt="Election Commission logo"
              className="h-12 w-12 rounded-2xl bg-white/90 p-2 shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Election</h1>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/90 text-slate-200 transition hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-4 mt-4 rounded-3xl border border-white/10 bg-white/10 p-4 text-slate-100 shadow-lg backdrop-blur-xl lg:mx-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-lg">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user?.username || 'Guest'}</p>
              <p className="truncate text-xs uppercase tracking-[0.18em] text-slate-400">
                {user?.role?.replace('ROLE_', '').replace(/_/g, ' ') || 'Visitor'}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-3 lg:px-6">
          <ul className="space-y-2">
            {menuItems.length === 0 ? (
              <li className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/90 p-4 text-sm text-slate-400">
                No menu items available for this role.
              </li>
            ) : (
              menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))
            )}
          </ul>
        </nav>

        <div className="mt-auto border-t border-slate-200/10 p-6 lg:px-8">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-3xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
