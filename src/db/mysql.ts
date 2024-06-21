import { createConnection } from "mysql2/promise";

export const mysql = async () => {
  await createConnection({
    host: "localhost",
    user: "root",
    database: "mydatabase",
    password: "password",
  });
  console.log("Connected to MySQL");
};
