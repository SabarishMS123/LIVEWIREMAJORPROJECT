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
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const role = user?.role || '';
    
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
        { path: '/party/nominations', label: 'Nominations', icon: FileCheck },
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
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Vote className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold">Election</h1>
              <p className="text-xs text-gray-400">Management System</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-sm">{user?.username}</p>
              <p className="text-xs text-gray-400">
                {user?.role?.replace('ROLE_', '').replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-6 py-3 transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
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