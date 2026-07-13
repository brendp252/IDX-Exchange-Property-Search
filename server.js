require("dotenv").config();

const express = require("express");
const app = express();
const healthCheck = require("./routes/healthcheck");
const propertySearch = require("./routes/properties");

app.use("/api/health", healthCheck);
app.use("/api/properties", propertySearch);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});