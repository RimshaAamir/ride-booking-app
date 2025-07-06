import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../auth';
import type { UserType } from '../types';
import { UserIcon, LockClosedIcon, TruckIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [userType, setUserType] = useState<UserType>('passenger');
  const [vehicleType, setVehicleType] = useState<'Bike' | 'Car' | 'Rickshaw'>('Bike');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: uuidv4(),
      name,
      gender,
      email,
      password,
      ...(userType === 'driver' ? { vehicleType, availability: true } : {}),
    };
    const success = registerUser(user, userType);
    if (success) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate(userType === 'passenger' ? '/passenger' : '/driver');
    } else {
      setError('Email already exists');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#ED008C] mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
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
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1 relative">
              <UserIcon className="absolute top-2 left-2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 pl-8 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C]"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={e => setGender(e.target.value as 'male' | 'female')}
              className="mt-1 w-full p-2 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
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
          {userType === 'driver' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <div className="mt-1 relative">
                <TruckIcon className="absolute top-2 left-2 h-5 w-5 text-gray-400" />
                <select
                  value={vehicleType}
                  onChange={e => setVehicleType(e.target.value as 'Bike' | 'Car' | 'Rickshaw')}
                  className="w-full p-2 pl-8 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C]"
                >
                  <option value="Bike">Bike</option>
                  <option value="Car">Car</option>
                  <option value="Rickshaw">Rickshaw</option>
                </select>
              </div>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#ED008C] text-white p-2 rounded-lg hover:bg-[#C7007A] transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/" className="text-[#ED008C] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
