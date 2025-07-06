import { v4 as uuidv4 } from 'uuid';
import type { Passenger, Driver, Ride } from './types';
import { registerUser } from './auth';
import { requestRide } from './ride';

export const initializeDummyData = (): void => {
  // Check if data already exists in LocalStorage
  const passengers = JSON.parse(localStorage.getItem('passengers') || '[]') as Passenger[];
  const drivers = JSON.parse(localStorage.getItem('drivers') || '[]') as Driver[];
  const rides = JSON.parse(localStorage.getItem('rides') || '[]') as Ride[];

  if (passengers.length > 0 || drivers.length > 0 || rides.length > 0) {
    return; // Skip if data already exists
  }

  // Dummy Passengers
  const dummyPassengers: Passenger[] = [
    { id: uuidv4(), name: 'Ayesha Khan', gender: 'female', email: 'ayesha@example.com', password: 'pass123' },
    { id: uuidv4(), name: 'Ali Ahmed', gender: 'male', email: 'ali@example.com', password: 'pass123' },
    { id: uuidv4(), name: 'Sana Malik', gender: 'female', email: 'sana@example.com', password: 'pass123' },
    { id: uuidv4(), name: 'Usman Riaz', gender: 'male', email: 'usman@example.com', password: 'pass123' },
  ];

  // Dummy Drivers
  const dummyDrivers: Driver[] = [
    { id: uuidv4(), name: 'Fatima Noor', gender: 'female', vehicleType: 'Bike', availability: true, email: 'fatima@example.com', password: 'pass123' },
    { id: uuidv4(), name: 'Hassan Iqbal', gender: 'male', vehicleType: 'Car', availability: true, email: 'hassan@example.com', password: 'pass123' },
    { id: uuidv4(), name: 'Zainab Ali', gender: 'female', vehicleType: 'Rickshaw', availability: true, email: 'zainab@example.com', password: 'pass123' },
    { id: uuidv4(), name: 'Bilal Khan', gender: 'male', vehicleType: 'Bike', availability: false, email: 'bilal@example.com', password: 'pass123' },
  ];

  // Dummy Rides
  const dummyRides: Ride[] = [
    {
      id: uuidv4(),
      passengerId: dummyPassengers[0].id, // Ayesha (female)
      driverId: dummyDrivers[0].id, // Fatima (female)
      pickup: 'Mall Road',
      drop: 'Airport',
      rideType: 'Bike',
      preferredDriverGender: 'female',
      status: 'In Progress',
    },
    {
      id: uuidv4(),
      passengerId: dummyPassengers[1].id, // Ali (male)
      driverId: dummyDrivers[1].id, // Hassan (male)
      pickup: 'Gulberg',
      drop: 'Lahore Fort',
      rideType: 'Car',
      status: 'In Progress',
    },
    {
      id: uuidv4(),
      passengerId: dummyPassengers[2].id, // Sana (female)
      driverId: undefined,
      pickup: 'Model Town',
      drop: 'Liberty Market',
      rideType: 'Bike',
      preferredDriverGender: 'female',
      status: 'Requested',
    },
    {
      id: uuidv4(),
      passengerId: 'invalid-id', // Simulate unassigned passenger for testing
      driverId: undefined,
      pickup: 'DHA',
      drop: 'Wapda Town',
      rideType: 'Rickshaw',
      status: 'Requested',
    },
  ];

  // Save to LocalStorage
  dummyPassengers.forEach(passenger => registerUser(passenger, 'passenger'));
  dummyDrivers.forEach(driver => registerUser(driver, 'driver'));
  dummyRides.forEach(ride => requestRide(ride));
};
