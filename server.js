// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OrderAPI = require("../asma-hijab-shop/backend/api/orders"); // مسار حسب مشروعك

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/api/orders", OrderAPI.createOrder);
app.get("/api/orders", OrderAPI.getOrder);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
