import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestRide, getRidesByPassengerId } from '../ride';
import type { Ride, Passenger } from '../types';
import {
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

const PassengerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Passenger | null>(null);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [rideType, setRideType] = useState<'Bike' | 'Car' | 'Rickshaw'>('Bike');
  const [preferredDriverGender, setPreferredDriverGender] = useState<'male' | 'female' | undefined>(undefined);
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as Passenger;
    if (!currentUser.id) navigate('/');
    setUser(currentUser);
    setRides(getRidesByPassengerId(currentUser.id));
  }, [navigate]);

  const handleRequestRide = (e: React.FormEvent) => {
    e.preventDefault();
    const ride: Ride = {
      id: uuidv4(),
      passengerId: user!.id,
      pickup,
      drop,
      rideType,
      preferredDriverGender,
      status: 'Requested',
    };
    requestRide(ride);
    setRides(getRidesByPassengerId(user!.id));
    setPickup('');
    setDrop('');
    setPreferredDriverGender(undefined);
  };

  const currentRide = rides.find(ride => ride.status !== 'Completed');
  const completedRides = rides.filter(ride => ride.status === 'Completed');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Requested':
        return <ArrowPathIcon className="h-6 w-6 text-yellow-500 animate-spin" />;
      case 'In Progress':
        return <ArrowPathIcon className="h-6 w-6 text-blue-500 animate-pulse" />;
      case 'Completed':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'Cancelled':
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#ED008C] mb-6 animate-fade-in">Passenger Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem('currentUser');
          navigate('/');
        }}
        className="mb-4 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition"
      >
        Logout
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg animate-slide-in">
          <h2 className="text-xl font-semibold text-[#ED008C] mb-4">Book a Ride</h2>
          <form onSubmit={handleRequestRide} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <div className="mt-1 relative">
                <MapPinIcon className="absolute top-2 left-2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  className={`w-full p-2 pl-8 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C] ${currentRide ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  required
                  disabled={!!currentRide}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Drop-off Location</label>
              <div className="mt-1 relative">
                <MapPinIcon className="absolute top-2 left-2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={drop}
                  onChange={e => setDrop(e.target.value)}
                  className={`w-full p-2 pl-8 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C] ${currentRide ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  required
                  disabled={!!currentRide}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ride Type</label>
              <select
                value={rideType}
                onChange={e => setRideType(e.target.value as 'Bike' | 'Car' | 'Rickshaw')}
                className={`mt-1 w-full p-2 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C] ${currentRide ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                disabled={!!currentRide}
              >
                <option value="Bike">Bike</option>
                <option value="Car">Car</option>
                <option value="Rickshaw">Rickshaw</option>
              </select>
            </div>
            {user.gender === 'female' && rideType === 'Bike' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Driver Gender</label>
                <select
                  value={preferredDriverGender || ''}
                  onChange={e => setPreferredDriverGender(e.target.value as 'female' | undefined)}
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring-[#ED008C] focus:border-[#ED008C] ${currentRide ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  disabled={!!currentRide}
                >
                  <option value="">Any</option>
                  <option value="female">Female</option>
                </select>
              </div>
            )}
            <button
              type="submit"
              className={`w-full p-2 rounded-lg transition ${currentRide ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#ED008C] text-white hover:bg-[#C7007A]'}`}
              disabled={!!currentRide}
            >
              Request Ride
            </button>
          </form>
          {currentRide && (
            <p className="mt-4 text-red-500 text-sm">Please complete your current ride before requesting another.</p>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg animate-slide-in">
            <h2 className="text-xl font-semibold text-[#ED008C] mb-4 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" /> Current Ride
            </h2>
            {currentRide ? (
              <div className="relative">
                <div className="absolute top-0 right-0">{getStatusIcon(currentRide.status)}</div>
                <p><strong>Pickup:</strong> {currentRide.pickup}</p>
                <p><strong>Drop-off:</strong> {currentRide.drop}</p>
                <p><strong>Ride Type:</strong> {currentRide.rideType}</p>
                <p><strong>Status:</strong> {currentRide.status}</p>
                {currentRide.preferredDriverGender && (
                  <p><strong>Preferred Driver Gender:</strong> {currentRide.preferredDriverGender}</p>
                )}
              </div>
            ) : (
              <p>No active ride</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg animate-slide-in">
            <h2 className="text-xl font-semibold text-[#ED008C] mb-4 flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2" /> Ride History
            </h2>
            {completedRides.length > 0 ? (
              <ul className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {completedRides.map(ride => (
                  <li key={ride.id} className="border p-4 rounded-lg">
                    <p><strong>Pickup:</strong> {ride.pickup}</p>
                    <p><strong>Drop-off:</strong> {ride.drop}</p>
                    <p><strong>Ride Type:</strong> {ride.rideType}</p>
                    <p><strong>Status:</strong> {ride.status}</p>
                    {ride.preferredDriverGender && (
                      <p><strong>Preferred Driver Gender:</strong> {ride.preferredDriverGender}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No completed rides</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
