import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";

// APP CONFIG

const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();
// Middlewares
app.use(express.json());
app.use(cors());

// API ROUTES
app.get("/", (req, res) => res.send("api working"));

app.listen(PORT, () => console.log("sever running on port" + PORT));
