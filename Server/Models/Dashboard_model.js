const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({}, { strict: false });
const BusSchema = new mongoose.Schema({}, { strict: false });
const RouteSchema = new mongoose.Schema({}, { strict: false });
const BookingSchema = new mongoose.Schema({}, { strict: false });
const PaymentSchema = new mongoose.Schema({}, { strict: false });
const SeatSchema = new mongoose.Schema({}, { strict: false });
const ContactSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Bus = mongoose.models.Bus || mongoose.model('Bus', BusSchema);
const Route = mongoose.models.Route || mongoose.model('Route', RouteSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
const Seat = mongoose.models.Seat || mongoose.model('Seat', SeatSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

module.exports = { User, Bus, Route, Booking, Payment, Seat, Contact };
