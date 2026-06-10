const { User, Bus, Route, Booking, Payment, Seat, Contact } = require('../Models/Dashboard_model');

const getDashboardCounts = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBuses = await Bus.countDocuments();
        const totalRoutes = await Route.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalPayments = await Payment.countDocuments();
        const totalSeats = await Seat.countDocuments();
        const totalComplaints = await Contact.countDocuments(); // Treating contact as complaints

        res.json({
            totalUsers,
            totalBuses,
            totalRoutes,
            totalBookings,
            totalPayments,
            totalSeats,
            totalComplaints
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
};

module.exports = { getDashboardCounts };
