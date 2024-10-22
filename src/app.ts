import express from "express";
import cors from "cors";
// import helmet from "helmet";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Middleware
app.use(cors());
// app.use(helmet());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api", userRoutes);

// Error middleware
app.use(errorHandler);

export default app;
