const mongoose = require('mongoose'); // Import mongoose

const routeSchema = new mongoose.Schema({
    routeName: { type: String, required: true },
    sourceCity: { type: String, required: true },
    destinationCity: { type: String, required: true },
    estimatedTime: { type: String, required: true }, // e.g., "5h 30m"
    distance: { type: Number, required: true },
    boardingPoints: [
        {
            pointName: { type: String, required: true },
            stopOrder: { type: Number, required: true }
        }
    ],
    droppingPoints: [
        {
            pointName: { type: String, required: true },
            stopOrder: { type: Number, required: true }
        }
    ],
    busid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: false },
    date: { type: Date }
});

// Export the model
module.exports = mongoose.model('Route', routeSchema);
