import type { Ride, Driver } from './types';

export const requestRide = (ride: Ride): void => {
  const rides = JSON.parse(localStorage.getItem('rides') || '[]') as Ride[];
  rides.push(ride);
  localStorage.setItem('rides', JSON.stringify(rides));
};

export const getRidesByPassengerId = (passengerId: string): Ride[] => {
  return JSON.parse(localStorage.getItem('rides') || '[]').filter((ride: Ride) => ride.passengerId === passengerId);
};

export const getAvailableRides = (driver: Driver): Ride[] => {
  const rides = JSON.parse(localStorage.getItem('rides') || '[]') as Ride[];
  return rides.filter((ride: Ride) => 
    (ride.status === 'Requested' && ride.rideType === driver.vehicleType && 
     (!ride.preferredDriverGender || ride.preferredDriverGender === driver.gender)) ||
    (ride.driverId === driver.id && (ride.status === 'Accepted' || ride.status === 'In Progress'))
  );
};

export const updateRideStatus = (rideId: string, status: Ride['status'], driverId?: string): void => {
  const rides = JSON.parse(localStorage.getItem('rides') || '[]') as Ride[];
  const ride = rides.find(r => r.id === rideId);
  if (ride) {
    ride.status = status;
    if (driverId) ride.driverId = driverId;
    localStorage.setItem('rides', JSON.stringify(rides));
  }
};

export const getAvailableDrivers = (rideType: string, preferredDriverGender?: 'male' | 'female'): Driver[] => {
  const drivers = JSON.parse(localStorage.getItem('drivers') || '[]') as Driver[];
  return drivers.filter(driver => 
    driver.availability && 
    driver.vehicleType === rideType && 
    (!preferredDriverGender || driver.gender === preferredDriverGender)
  );
};
