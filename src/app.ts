// src/app.ts
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./graphql/schema";
import {
  errorHandlerMiddleware,
  loggingMiddleware,
  authMiddleware,
} from "./middlewares";
import cors from "cors";
import { authRoutes, userRoutes } from "./routes";
import DotEnv from "dotenv";
DotEnv.config();
import config from "@app/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// MongoDB Connection
mongoose.connect(config.MONGO_DB_PATH as string);

// Auth routes
app.use("/auth", authRoutes);

app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP((req: any, res: any) => {
    return {
      schema,
      graphiql: true,
      context: {
        user: req.user, // Pass the user information to the context
      },
    };
  })
);
// User routes
app.use("/users", userRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;
