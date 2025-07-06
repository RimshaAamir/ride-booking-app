import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableRides, updateRideStatus } from '../ride';
import type { Ride, Driver } from '../types';
import { TruckIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DriverDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Driver | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as Driver;
    if (!currentUser.id) navigate('/');
    setUser(currentUser);
    setRides(getAvailableRides(currentUser));
  }, [navigate]);

  const handleAcceptRide = (rideId: string) => {
    updateRideStatus(rideId, 'Accepted', user!.id);
    setRides(getAvailableRides(user!));
  };

  const handleRejectRide = (rideId: string) => {
    updateRideStatus(rideId, 'Requested');
    setRides(getAvailableRides(user!));
  };

  const handleProgressRide = (rideId: string) => {
    updateRideStatus(rideId, 'In Progress', user!.id);
    setRides(getAvailableRides(user!));
  };

  const handleCompleteRide = (rideId: string) => {
    updateRideStatus(rideId, 'Completed', user!.id);
    setRides(getAvailableRides(user!));
  };

  if (!user) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#ED008C] mb-6">Driver Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem('currentUser');
          navigate('/');
        }}
        className="mb-4 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300"
      >
        Logout
      </button>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-[#ED008C] mb-4 flex items-center">
          <TruckIcon className="h-5 w-5 mr-2" /> Available Rides
        </h2>
        {rides.length > 0 ? (
          <ul className="space-y-4">
            {rides.map(ride => (
              <li key={ride.id} className="border p-4 rounded-lg">
                <p><strong>Pickup:</strong> {ride.pickup}</p>
                <p><strong>Drop-off:</strong> {ride.drop}</p>
                <p><strong>Ride Type:</strong> {ride.rideType}</p>
                {ride.preferredDriverGender && (
                  <p><strong>Preferred Driver Gender:</strong> {ride.preferredDriverGender}</p>
                )}
                <div className="mt-2 flex space-x-2">
                  {ride.status === 'Requested' && (
                    <>
                      <button
                        onClick={() => handleAcceptRide(ride.id)}
                        className="bg-[#ED008C] text-white p-2 rounded-lg hover:bg-[#C7007A] flex items-center"
                      >
                        <CheckIcon className="h-5 w-5 mr-2" /> Accept
                      </button>
                      <button
                        onClick={() => handleRejectRide(ride.id)}
                        className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 flex items-center"
                      >
                        <XMarkIcon className="h-5 w-5 mr-2" /> Reject
                      </button>
                    </>
                  )}
                  {ride.status === 'Accepted' && ride.driverId === user.id && (
                    <button
                      onClick={() => handleProgressRide(ride.id)}
                      className="bg-[#ED008C] text-white p-2 rounded-lg hover:bg-[#C7007A] flex items-center"
                    >
                      <CheckIcon className="h-5 w-5 mr-2" /> Start Ride
                    </button>
                  )}
                  {ride.status === 'In Progress' && ride.driverId === user.id && (
                    <button
                      onClick={() => handleCompleteRide(ride.id)}
                      className="bg-[#ED008C] text-white p-2 rounded-lg hover:bg-[#C7007A] flex items-center"
                    >
                      <CheckIcon className="h-5 w-5 mr-2" /> Complete Ride
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available rides</p>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
