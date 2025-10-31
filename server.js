const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const connectDB = require("./src/config/db");
const allRoutes = require("./app"); 
const { PORT } = require("./src/config/configs");

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.get("/", (req, res) => res.send("Notes API is running..."));

app.use("/api", allRoutes)

const Port = PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${Port}`)
});
