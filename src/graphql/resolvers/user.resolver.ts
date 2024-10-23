import { UserTable } from "../../models";
import { signJWT } from "@app/utils";
import bcrypt from "bcrypt";

export const userResolvers = {
  Query: {
    users: async () => {
      return await UserTable.find();
    },
  },
  Mutation: {
    signup: async (_: any, { input }: any) => {
      const { name, email, password } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserTable({ name, email, password: hashedPassword });
      await user.save();

      const token = signJWT(user);
      return { user, token };
    },
    login: async (_: any, { email, password }: any) => {
      const user: any = await UserTable.find({ email });
      if (!user) throw new Error("User Not Found");

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error("Invalid Password");

      const token = signJWT(user);
      return { token, user };
    },
  },
};