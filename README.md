Mini Ride Booking System
🚀 Project Overview
This is a prototype for a lite ride-hailing app designed for smaller cities in Pakistan, with a focus on female-friendly features, particularly for bike rides. The app allows passengers to register/login, request rides, view ride status, and view ride history. Drivers can accept/reject rides. The app uses a feminine color scheme (#ED008C pink and white) to align with the female-friendly branding.
🌟 Tech Stack

Frontend: React with TypeScript, Vite
Styling: Tailwind CSS
Routing: React Router
Data Storage: LocalStorage (simulating backend)
Icons: Heroicons
UUID: uuid for generating unique IDs

🧠 Assumptions

No real backend or GPS integration; pickup and drop-off locations are text inputs.
Data is stored in LocalStorage to simulate persistence.
Driver matching considers ride type and gender preference (female passengers can request female drivers for bikes).
Ride status transitions are simulated via UI controls.

✨ Female-Friendly Feature

Female passengers can select female drivers for bike rides.
Male passengers cannot select female drivers.
Gender is captured during registration for both passengers and drivers.

📊 Data Model
Passenger
{
  id: string;
  name: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
}

Driver
{
  id: string;
  name: string;
  gender: 'male' | 'female';
  vehicleType: 'Bike' | 'Car' | 'Rickshaw';
  availability: boolean;
}

Ride
{
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: string;
  drop: string;
  rideType: 'Bike' | 'Car' | 'Rickshaw';
  preferredDriverGender?: 'male' | 'female';
  status: 'Requested' | 'Accepted' | 'In Progress' | 'Completed';
}

🧩 Project Structure
src/
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── PassengerDashboard.tsx
│   ├── DriverDashboard.tsx
├── App.tsx
├── index.tsx
├── types.ts
├── auth.ts
├── ride.ts
├── index.css
├── tailwind.config.js
├── vite.config.ts
├── package.json

📝 Setup Instructions

Clone the repository: git clone <repo-url>
Install dependencies: npm install
Run the app: npm run dev
Build for production: npm run build

📒 Submission Notes

Code: Push to a public GitHub repository.
Demo Video: Record a ~5-minute video explaining the UI, data flow, and female-friendly feature.
Design Document: Included as this README.md.
ER Diagram: [Include a link to a draw.io diagram or similar tool showing the data model relationships.]

🎨 UI/UX

Colors: #ED008C (feminine pink), #C7007A (hover), white background.
Style: Rounded corners, smooth transitions, shadow effects, and Heroicons for a feminine, modern look.
