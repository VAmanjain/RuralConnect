const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const taskRoutes = require("./routes/TaskRoute");  // Updated to match the naming convention
const authRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobRoutes");  // Renamed to 'jobRoutes' to match consistency
const SkillRoutes = require("./routes/skillRoutes");  // Renamed to 'jobRoutes' to match consistency

const app = express();

const PORT = process.env.PORT || 4000;

// Enable CORS for all origins or specify your frontend URL
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin (frontend URL)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
}));

app.use(express.json()); // Middleware to parse JSON body

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define routes
app.use("/api/task", taskRoutes);  // Changed 'routes' to 'taskRoutes' for clarity
app.use("/api/users", authRoutes); 
app.use("/api/client", jobRoutes);  // Consistency with naming convention
app.use("/api/skills", SkillRoutes);  // Consistency with naming convention

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);  // Ensured the message is clear
});
