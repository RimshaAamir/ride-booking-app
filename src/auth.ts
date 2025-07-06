import type { Passenger, Driver, UserType } from './types';

export const loginUser = (email: string, password: string, userType: UserType): Passenger | Driver | null => {
  const users = JSON.parse(localStorage.getItem(`${userType}s`) || '[]') as (Passenger | Driver)[];
  return users.find(user => user.email === email && user.password === password) || null;
};

export const registerUser = (user: Passenger | Driver, userType: UserType): boolean => {
  const users = JSON.parse(localStorage.getItem(`${userType}s`) || '[]') as (Passenger | Driver)[];
  if (users.some(u => u.email === user.email)) return false;
  users.push(user);
  localStorage.setItem(`${userType}s`, JSON.stringify(users));
  return true;
};
