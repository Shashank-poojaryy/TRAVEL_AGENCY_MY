# Project Blueprint: Travel Agency Management System (BusBee)

This document serves as a comprehensive technical report and progress checkpoint for the Travel Agency Management System. It is designed to provide any AI model or developer with a complete understanding of the system's architecture, functionality, and current state.

## 1. Project Identity & Purpose
- **Name**: BusBee Travel Agency
- **Core Mission**: A full-stack MERN application for seamless bus ticket booking, seat management, and administrative fleet control.
- **Key Experience**: Premium, glassmorphic UI with real-time seat tracking and automated boarding pass generation.

---

## 2. Technical Stack (MERN+)

### Backend (Node.js & Express)
- **Framework**: Express.js
- **Database**: MongoDB (Atlas) with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) for secure session management
- **Communication**: 
  - `Nodemailer`: Sending HTML-formatted boarding passes via Gmail SMTP.
  - `Multer`: Handling image/document uploads (Bus images, etc.).
- **Security**: CORS enabled for cross-origin frontend requests, `.env` for sensitive credential management.
- **Dev Tools**: `Nodemon` for hot-reloading.

### Frontend (React 19)
- **Library**: React 19 (Functional Components & Hooks)
- **Routing**: `react-router-dom` (Version 7)
- **UI Frameworks**: 
  - `Material UI (MUI) 6`: Core component library.
  - `Framer Motion`: High-fidelity micro-interactions and page transitions.
- **Styling**: Vanilla CSS with **Glassmorphism** variables (`--glass-bg`, etc.) and `Outfit` typography.
- **Payments**: `@stripe/react-stripe-js` (Stripe integration for transaction processing).
- **Imaging**: `qrcode.react` for dynamic ticket QR code generation.

---

## 3. Core Functionality & Logic

### User Module
1. **Dynamic Search**: High-performance filtering by `Origin`, `Destination`, and `Travel Date`.
2. **Interactive Seat Selection**:
   - Visual seat map with status (Available, Booked, Selected).
   - Real-time updates to seat availability upon booking/cancellation.
3. **Multi-Step Checkout**:
   - Seat selection -> Passenger Details -> Payment Confirmation.
4. **Digital Tickets**:
   - QR code generation for on-site verification.
   - Professional HTML boarding pass sent via email upon successful payment.
5. **Manage Bookings**: User portal to view travel history and cancel upcoming trips.

### Admin Module
1. **Intelligence Dashboard**: Visualizing total revenue, active buses, and user feedback trends.
2. **Fleet Management**: CRUD operations for buses (Type: AC/Non-AC, Seating capacity, Pricing).
3. **Route Orchestration**: 
   - Defining routes with dynamic Boarding and Dropping points.
   - Arrival/Departure time management.
4. **Financial Control**: Monitoring payments and transaction statuses.
5. **Support System**: Handling user inquiries and feedback directly from the admin portal.

---

## 4. Database Schema Overview (Key Models)

- **`User`**: `name`, `email`, `password`, `phone`, `role` (Admin/User).
- **`Bus`**: `busName`, `busNumber`, `busType`, `totalSeats`, `price`, `routeId`.
- **`BusRoute`**: `origin`, `destination`, `boardingPoints[]`, `droppingPoints[]`, `distance`.
- **`Booking`**: `userId`, `busId`, `seatNumber`, `travelDate`, `travellerDetails` (Name, Age, Gender, Email), `status` (Confirmed/Cancelled).
- **`Seat`**: `busId`, `seatNumber`, `status` (Available/Booked), `travelDate`.
- **`Feedback`**: `userId`, `message`, `rating`, `date`.

---

## 5. Typical Data Flow (AI Guide)
1. **Frontend Request**: User searches for a bus via `axios.get('/api/bus/search?...)`.
2. **Controller Logic**: `BusController` queries MongoDB for matches.
3. **Transaction**: When booking, `BookingController` creates a `Booking` record AND triggers a `Seat.updateMany` to mark seats as booked.
4. **Automation**: Post-save, the `Nodemailer` service sends the boarding pass asynchronously.
5. **State Sync**: React state updates locally to reflect the booking without a full page reload.

---

## 6. Progress Checkpoint (As of April 9, 2026)

### ✅ Completed
- [x] **Architecture**: Full MERN setup with proper directory structure.
- [x] **Authentication**: Secure Login/Signup for both Users and Admins.
- [x] **User Flow**: Bus search -> Seat selection -> Booking details -> Payment.
- [x] **Email System**: Automated professionally styled boarding passes.
- [x] **Admin Controls**: Robust bus and route management modules.
- [x] **UI/UX**: Premium glassmorphic design system established in `index.css`.
- [x] **Security**: Future-date validation for bookings and prevent double-booking logic.

### 🚧 In Progress / Optimization
- [ ] **Advanced Filtering**: Adding price-range and bus-type filters in real-time.
- [ ] **Real-time Notifications**: implementing Socket.io for live seat availability.
- [ ] **Mobile Optimization**: Finalizing responsive layouts for specialized seat maps.

---

## 7. Instructions for AI Integration
- **Endpoints**: Standard RESTful patterns used (e.g., `POST /api/bookings` for creation).
- **Components**: Functional React components with state management via `useState` and `useEffect`.
- **Integration**: Stripe is in test mode; Nodemailer requires valid SMTP credentials in `.env`.
