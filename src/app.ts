// src/app.ts
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./graphql/schema";
import { errorHandlerMiddleware } from "./middlewares";
import cors from "cors";
import { authRoutes, userRoutes } from "./routes";
import DotEnv from "dotenv";
DotEnv.config();
import config from "@app/config";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(config.MONGO_DB_PATH as string);

// Auth routes
app.use("/auth", authRoutes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
// User routes
app.use("/users", userRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;
