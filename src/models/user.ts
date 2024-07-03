import { IUser } from "@app/types";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

// to be replaced by ORM specific model style
export const users: IUser[] = [];

export const findUserByUsername = (username: string): IUser | undefined => {
  return users.find((user) => user.username === username);
};

export const createUser = async (
  email: string,
  username: string,
  password: string
): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password
  const newUser: IUser = {
    id: uuidv4(),
    email,
    username,
    password: hashedPassword,
  };
  console.log("newUSer : ", newUser);
  users.push(newUser);
  return newUser;
};
