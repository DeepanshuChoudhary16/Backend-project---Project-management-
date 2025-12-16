import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    Credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//import routes

import healthCheckRouter from "./routes/healthCheck.routes.js";
import authRouter from "./routes/auth.routes.js"

app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/auth",authRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
