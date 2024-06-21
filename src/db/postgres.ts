// src/db/postgres.ts
import { Pool } from "pg";

export const pool = async () => {
  const pool = new Pool({
    user: "postgres_user",
    host: "localhost",
    database: "mydatabase",
    password: "password",
    port: 5432,
  });

  pool
    .connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Error connecting to PostgreSQL", err));
};
