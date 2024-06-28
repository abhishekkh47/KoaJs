import mongoose from "mongoose";
import { IUser, MongooseModel } from "@app/types";

export type IUserSchema = MongooseModel<IUser> & mongoose.Document;

const schema = new mongoose.Schema<IUserSchema>(
  {
    email: {
      type: mongoose.Schema.Types.String,
      unique: true,
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserTable = mongoose.model<IUserSchema>("user", schema);
