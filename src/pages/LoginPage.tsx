import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../auth';
import type { UserType } from '../types';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('passenger');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginUser(email, password, userType);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate(userType === 'passenger' ? '/passenger' : '/driver');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#ED008C] mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              value={userType}
              onChange={e => setUserType(e.target.value as UserType)}
              className="mt-1 w-full p-2 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C]"
            >
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <UserIcon className="absolute top-2 left-2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2 pl-8 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C]"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <LockClosedIcon className="absolute top-2 left-2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2 pl-8 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C]"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#ED008C] text-white p-2 rounded-lg hover:bg-[#C7007A] transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-[#ED008C] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
