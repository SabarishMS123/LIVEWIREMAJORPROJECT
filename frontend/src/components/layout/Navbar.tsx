import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Menu } from 'lucide-react';
import ecilogo from '../../assets/ecilogo.png';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  const getRoleDisplay = () => {
    const role = (user?.role || '').toUpperCase();
    if (role.includes('VOTER')) return 'Voter';
    if (role.includes('PARTY')) return 'Party';
    if (role.includes('CANDIDATE')) return 'Candidate';
    if (role.includes('RO_RETURNING_OFFICER')) return 'Election Officer';
    return 'User';
  };

  return (
    <nav className="glass sticky top-0 z-40 border-b border-white/60 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 lg:px-8 lg:py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/85 text-slate-700 shadow-sm transition hover:bg-white lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <img
              src={ecilogo}
              alt="Election Commission logo"
              className="h-16 w-16 rounded-3xl bg-white/95 p-3 shadow-sm"
            />
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Election Commission</h1>
              <p className="text-base font-medium text-slate-500">Management System</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 min-w-[220px]">
          <div className="glass-card flex items-center gap-3 rounded-full px-3 py-2 text-slate-700 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{user?.username || 'Guest'}</p>
              <p className="truncate text-[11px] uppercase tracking-[0.14em] text-slate-500">{getRoleDisplay()}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="secondary-button rounded-full text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-1" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
