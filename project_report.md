# Travel Agency Management System - Project Report

## 1. Project Overview
The **Travel Agency Management System** is a comprehensive full-stack web application designed to streamline the process of bus ticket booking and travel agency management. It provides a seamless interface for users to search for buses, select seats, and book tickets, while offering a robust administrative dashboard for managing fleet, routes, and bookings.

## 2. System Architecture
The application follows the **MERN Stack** architecture:
- **Frontend**: React.js with modern functional components and hooks.
- **Backend**: Node.js and Express.js providing a RESTful API.
- **Database**: MongoDB (NoSQL) for flexible and scalable data storage.
- **State Management**: React state and local storage (for tokens/auth).

---

## 3. Key Modules & Features

### A. User Module
The User Module is designed for the end-customer experience:
- **Authentication**: Secure registration and login system.
- **Bus Search**: Search buses by origin, destination, and date using a dynamic search form.
- **Seat Selection**: Interactive seat layout where users can pick available seats in real-time.
- **Booking Engine**: A multi-step flow for entering traveler details and selecting seats.
- **Payments**: Integrated payment processing (simulated or real) to confirm bookings.
- **Profile/Tickets**: Users can view their booked tickets and account status.

### B. Admin Module
The Admin Module provides control over the agency's operations:
- **Admin Dashboard**: Visual overview of total bookings, revenue, and active buses.
- **Bus Management**: Add, update, or remove buses from the fleet.
- **Route Management**: Define routes with pickup/drop-off points and timing.
- **Booking Management**: View and manage all user bookings.
- **Feedback & Support**: Manage user inquiries and feedback via a dedicated interface.

---

## 4. Technical Implementation

### Backend Structure (`/Server`)
- **`Models/`**: Defines the data schema using Mongoose.
  - `user_model.js`: Stores user credentials and profile info.
  - `Bus_model.js`: Detailed information about buses (name, type, seats, price).
  - `busroute_model.js`: Stores route paths and schedules.
  - `Booking_model.js`: Records bookings, including user reference and travel details.
  - `Payment_model.js`: Logs transaction details.
- **`Routes/`**: Maps API endpoints to controller logic (e.g., `/api/user`, `/api/bus`).
- **`Controllers/`**: Contains the business logic for each route.
- **`db.js`**: Handles the connection to MongoDB.

### Frontend Structure (`/client`)
- **`src/Modules/User/`**: Contains components like `Login.jsx`, `Home.jsx`, `Bus_routeform.jsx`, and `Booking.jsx`.
- **`src/Modules/Admin/`**: Contains admin-specific dashboards and management views.
- **Routing**: Uses `react-router-dom` to manage navigation between user and admin portals.

---

## 5. Typical User Workflow
1. **Search**: The user enters their travel details (From, To, Date) on the Home page.
2. **Select Bus**: A list of available buses matching the criteria is displayed.
3. **Seat Selection**: The user selects their preferred seats from the interactive layout.
4. **Checkout**: The user provides passenger details and proceeds to payment.
5. **Confirmation**: Upon successful payment, a ticket is generated and stored in the system.

---

## 6. Key Technologies
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, CSS (Glassmorphism/Modern UI), React Router |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Testing** | Postman (API Testing) |
| **Dev Tools** | nodemon |
