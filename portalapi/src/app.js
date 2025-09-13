import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouters from "./routes/user.routes.js";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import exhibitorRouters from "./routes/exhibitor.routes.js";
import operationRouters from "./routes/operation.routes.js";
import accountRouter from "./routes/account.routes.js";
import adminRouter from "./routes/admin.routes.js";
// import bodyParser from "body-parser";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json()); // Enable JSON body parsing
// app.use(express.urlencoded({ extended: true })); // Enable URL-encoded body parsing


app.use("/healthcheck", healthCheckRouter);
app.use("/api/v1/users", authRouters);
app.use("/api/v1/exhibitors", exhibitorRouters);
app.use("/api/v1/operation", operationRouters);
app.use("/api/v1/account", accountRouter);
app.use("/api/v1/admin", adminRouter);

export default app;
