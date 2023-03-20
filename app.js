import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
import apiRoute from "./routes/api.js";

// Use routes
app.use("/api", apiRoute);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

