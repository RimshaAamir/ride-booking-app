# Design Document

## 1. Tech Stack Selection

This prototype is developed using the following tech stack:

- **React (v19.1.0)** with **TypeScript**: Chosen for its component-based architecture and static typing, which ensures better maintainability and fewer runtime bugs.
- **Vite**: Used as the build tool for its lightning-fast startup, hot module replacement (HMR), and optimized bundling for production.
- **Tailwind CSS (v3.4.17)**: Enables utility-first styling with rapid and responsive UI development without custom CSS.
- **React Router DOM (v7.6.3)**: Facilitates seamless and dynamic routing within the single-page application.
- **UUID (v11.1.0)**: Ensures unique identifiers for entities like users and rides, critical for mapping and simulation.
- **Local Storage**: Employed to mimic database behavior, storing users and rides persistently across sessions during development.

> This stack allows for fast prototyping with minimal setup, focusing on a clean frontend experience.

---

## 2. Assumptions

To keep the prototype simple and focused on user flow, the following assumptions are made:

- **Authentication** is mocked using static email-password checks; no JWT, OAuth, or backend auth.
- **Locations** are plain text (e.g., `'Mall Road'`) instead of GPS coordinates or map integration.
- **Driver acceptance** is updated manually (simulating button clicks), avoiding real-time matching.
- **Payment, notifications, and maps** are not implemented to reduce complexity.
- **Persistence** is managed with browser-based Local Storage.
- **Single-user session** is assumed—no multi-user or concurrent session management.

> These assumptions help isolate the core functionality for testing and demonstration.

---

## 3. Data Model

The system revolves around three core entities: `User`, `Driver`, and `Ride`.

### ➤ User

```ts
type Gender = 'male' | 'female';
type UserType = 'passenger' | 'driver';

interface User {
  id: string;
  name: string;
  gender: Gender;
  email: string;
  password: string;
  type: UserType;
}
````

* A User can be either a Passenger or a Driver.

### ➤ Driver (Extends User)

```ts
type VehicleType = 'Bike' | 'Car' | 'Rickshaw';

interface Driver extends User {
  vehicleType: VehicleType;
  availability: boolean;
}
```

* Adds vehicle type and availability status for ride assignment.

### ➤ Ride

```ts
type RideStatus = 'Requested' | 'Accepted' | 'In Progress' | 'Completed';

interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  pickupLocation: string;
  dropLocation: string;
  rideType: VehicleType;
  preferredDriverGender?: Gender;
  status: RideStatus;
}
```

* Links to a Passenger via `passengerId` and optionally a Driver via `driverId`.

---

## 4. Relationships Overview

* A **User** can act as a **Passenger** or a **Driver**.
* A **Passenger** may create multiple **Rides**.
* A **Driver** may be assigned to multiple **Rides**, if available.
* Each **Ride** connects one **Passenger**, and optionally one **Driver**.

> The system structure supports extensibility (e.g., adding trip history, rating systems) in future iterations.


## 5. Project Setup & Running Instructions

To run this Vite-based React + TypeScript project locally, follow these steps:

### ➤ Prerequisites

Ensure you have the following installed:

* **Node.js** (v18 or higher recommended)
* **npm** (comes with Node.js) or **yarn**

### ➤ Installation Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <your-project-folder>

# 2. Install dependencies
npm install
# or
yarn install

# 3. Start the development server
npm run dev
# or
yarn dev
```

> This will start the app at `http://localhost:5173` (default Vite port). Open this in your browser to view the app.

### ➤ Build for Production

```bash
npm run build
# or
yarn build
```

> The production-ready files will be generated in the `dist/` folder.


