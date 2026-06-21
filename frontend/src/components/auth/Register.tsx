import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerVoter } from '../../services/voter.service';
import { getAllConstituencies } from '../../services/admin.service';
import { Constituency } from '../../types';
import { User, Mail, Calendar, Home, CreditCard, Building2, Lock } from 'lucide-react';
import ecilogo from '../../assets/ecilogo.png';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [formData, setFormData] = useState({
    voterId: '',
    name: '',
    fatherName: '',
    dateOfBirth: '',
    address: '',
    city: '',
    pincode: '',
    email: '',
    constituencyId: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const loadConstituencies = async () => {
    try {
      const data = await getAllConstituencies();
      setConstituencies(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to load constituencies:', message);
      toast.error('Failed to load constituencies');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadConstituencies();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await registerVoter({
        voterId: formData.voterId,
        name: formData.name,
        fatherName: formData.fatherName,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        email: formData.email,
        constituencyId: parseInt(formData.constituencyId),
        username: formData.username,
        password: formData.password
      });
      toast.success('Registration successful! Please check your email for verification.');
      navigate('/login');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <div className="glass relative w-full max-w-5xl rounded-[2rem] p-8 shadow-2xl md:p-10">
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/70 p-3 shadow-xl">
            <img src={ecilogo} alt="Election Commission logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Voter Registration</h1>
          <p className="text-sm text-slate-500 mt-2">Create your voter account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voter ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voter ID *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="voterId"
                  value={formData.voterId}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  placeholder="Enter your Voter ID"
                  required
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Father's Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Father's Name *
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="soft-input pl-10"
                placeholder="Enter father's name"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="soft-input pl-10"
                placeholder="Enter city"
                required
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="soft-input pl-10"
                placeholder="Enter pincode"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            {/* Constituency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Constituency *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="constituencyId"
                  value={formData.constituencyId}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  required
                >
                  <option value="">Select Constituency</option>
                  {constituencies.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} - {c.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  placeholder="Create a password (min 6 characters)"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="soft-select pl-10"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-button w-full"
          >
            {loading ? 'Registering...' : 'Register as Voter'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <Link to="/register/party" className="text-blue-600 hover:underline">
              Register as Political Party
            </Link>
          </p>
        </div>

        {/* Information Box */}
        <div className="mt-6 glass-card rounded-2xl p-4 text-center">
          <p className="text-sm leading-6 text-slate-600">
            <strong>Note:</strong> After registration, you will receive a verification email. 
            Please verify your email address before logging in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;