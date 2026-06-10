const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const paymentRoutes = require("./Routes/PaymentRoutes");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debugging: Log when payments route is hit
app.use("/api/payments", (req, res, next) => {
  console.log("Payments Route Hit:", req.method, req.url);
  next();
});

// Register Routes
app.use("/api/payments", paymentRoutes);

const PORT = 4000;

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/your_database_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
