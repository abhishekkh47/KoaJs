import mongoose from "mongoose";
import { MongooseModel, IUser } from "../types";

export type IUserSchema = MongooseModel<any> & mongoose.Document;

const schema = new mongoose.Schema<IUserSchema>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserTable = mongoose.model<IUser>("users", schema);
