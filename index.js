require('dotenv').config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const { PORT } = require("./src/config/configs");
const connectDB = require("./src/config/db");
const allRoutes = require("./app");

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173","https://xenonnotebook.netlify.app"],
    credentials: true, 
}));

app.get("/", (req, res) => res.send("Notes API is running..."));

app.use("/api", allRoutes)

const Port = PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${Port}`)
});
 