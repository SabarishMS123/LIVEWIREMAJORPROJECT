import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Shield, Vote } from 'lucide-react';

const Navbar: React.FC = () => {
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
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Vote className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Election Commission</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-2 rounded-full">
              {user?.role?.includes('VOTER') ? (
                <User className="w-4 h-4 text-blue-600" />
              ) : (
                <Shield className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-800">{user?.username}</p>
              <p className="text-gray-500 text-xs">{getRoleDisplay()}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;