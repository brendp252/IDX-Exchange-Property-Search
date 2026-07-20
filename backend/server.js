require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const healthCheck = require("./routes/healthcheck");
const propertySearch = require("./routes/properties");

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', function() {
        const duration = Date.now() - start;
        console.log(
        `${new Date()} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );
    });
    next();
});

app.use("/api/health", healthCheck);
app.use("/api/properties", propertySearch);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});