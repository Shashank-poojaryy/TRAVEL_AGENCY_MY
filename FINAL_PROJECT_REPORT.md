# Final Project Report: Travel Agency Management System (BusBee)

This is the comprehensive "Source of Truth" document for the BusBee Travel Agency system. It captures the technical architecture, design philosophy, functional capabilities, and implementation state as of April 9, 2026.

---

## 1. Project Overview & Mission
BusBee is a high-performance, full-stack MERN application designed to provide a premium bus booking experience. It bridges the gap between complex travel logistics and a modern, "Gen Z" aesthetic, utilizing advanced web technologies to ensure security, speed, and visual excellence.

### Core Objectives
- **Seamless Booking**: Real-time seat selection with zero-conflict logic.
- **Administrative Power**: Full-cycle management of fleet, routes, and financial transparency.
- **Cinematic Experience**: A high-fidelity UI that utilizes Glassmorphism and fluid animations.

---

## 2. Full-Stack Technology Stack

### Frontend (Client-Side)
- **Framework**: **React 19**
- **UI Library**: **Material UI (MUI) 6** (Custom-themed)
- **Animations**: **Framer Motion + CSS3 Keyframes**
- **Routing**: **React Router Dom 7**
- **State Management**: React Hooks (Context-ready architecture)
- **Payments**: **Stripe integration** (@stripe/stripe-js)
- **Imaging**: **qrcode.react** for digital ticket validation.

### Backend (Server-Side)
- **Runtime**: **Node.js**
- **Server Framework**: **Express.js**
- **Database**: **MongoDB Atlas** with **Mongoose ODM**
- **Auth**: **JWT (JSON Web Tokens)** for stateless session security.
- **Email Service**: **Nodemailer** for automated boarding pass dispatch.
- **File Handling**: **Multer** for administrative asset uploads.

---

## 3. UI/UX & Design Architecture
The "Soul" of BusBee lies in its visual identity, which follows a **Glassmorphism** design pattern.

### Aesthetic Standards
- **Typography**: **Outfit** (Modern Sans-serif with high geometric clarity).
- **Glass Effects**: `backdrop-filter: blur(15px)` and semi-transparent layers for a "floating" interface feel.
- **Micro-Interactions**: 
  - Shine effects on hover for primary action buttons.
  - Bounce-in effects for seat selection and modal windows.
  - Smooth parallax-style gradients on the Hero section.
- **Seat Engine UI**: A RedBus-inspired layout featuring a steering wheel indicator, color-coded seat states, and tactile hover feedback.

---

## 4. Functional Modules & Working Mechanism

### A. User Experience Flow
1. **Intelligent Search**: Users filter buses by origin, destination, and travel date.
2. **Interactive Seat Matrix**: A specialized component rendering a 2D bus layout. Users select available seats (white) which turn green on selection.
3. **Traveller Profiling**: Multi-field form for passenger details (Age, Gender, Contact).
4. **Secure Checkout**: Integration with Stripe for secure transaction processing.
5. **Digital Fulfillment**: Immediate generation of a QR-coded ticket and an automated, professionally styled HTML boarding pass sent via email.

### B. Administrative Power
1. **The Intelligence Suite**: Dashboards displaying revenue metrics, feedback patterns, and fleet utilization.
2. **Bus Orchestration**: CRUD management for AC/Non-AC buses, seat densities, and pricing models.
3. **Route Architect**: Defining complex routes with multiple boarding/dropping points and synchronized arrival/departure schedules.
4. **Member Support**: Managing user feedback and contact queries through a centralized CRM interface.

---

## 5. Technical Data Flow (For AI Models)
If integrating or extending this system, follow this logic flow:

- **Search Query**: `GET /api/bus/search?from=X&to=Y&date=Z` -> Returns matching `Bus` objects.
- **Booking Sequence**:
  1. Frontend sends payment intent to Stripe.
  2. Success triggers `POST /api/bookings`.
  3. Controller performs atomic check: `Seat.status == "Available"`.
  4. Controller updates `Seat.status = "Booked"`.
  5. Controller creates `Booking` document.
  6. Controller triggers `sendBoardingPassEmail()`.
- **Cancellation Logic**: Reverts `Booking.status` to "Cancelled" and restores `Seat.status` to "Available".

---

## 6. Security & Stability Measures
- **Future-Date Logic**: System prevents bookings for past dates at the controller level.
- **Double-Booking Protection**: Atomic checks during the booking transaction to prevent concurrent seat reservation conflicts.
- **CORS & Environment Control**: Strict access control for the API, with all sensitive keys (DB, Stripe, Email) stored in `.env`.

---

## 7. Setup & Run Instructions
1. **Server**: Navigate to `/Server`, run `npm i`, then `npm i -g nodemon`, and start with `nodemon index.js`.
2. **Client**: Navigate to `/client`, run `npm i`, then start with `npm start`.
3. **Environment**: Ensure `.env` contains `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, and `STRIPE_SECRET`.

---

## 8. Development Checkpoint (April 9, 2026)
- **Status**: **Phase 1 Production-Ready**
- **Accomplishments**: All core search, seat-selection, and booking features are operational. Admin controls for fleet and routes are fully implemented.
- **Up Next**: Real-time socket updates for seat availability and PWA (Progressive Web App) conversion for mobile offline access.

---

## 9. AI Compatibility Index (Technical Spec)
```json
{
  "project_type": "MERN Stack",
  "frontend_primary": "React 19 / MUI 6 / Framer Motion",
  "backend_primary": "Node / Express / MongoDB",
  "key_logic": "Atomic Booking + Dynamic Seat Mapping",
  "design_system": "Glassmorphism / Outfit Typography",
  "integrations": ["Stripe", "Nodemailer", "Multer", "QRCode.react"]
}
```
