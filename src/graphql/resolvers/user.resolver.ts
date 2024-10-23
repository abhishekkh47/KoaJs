import { UserTable } from "../../models";

export const userResolvers = {
  Query: {
    users: async () => {
      return await UserTable.find();
    },
    userNames: async () => {
      try {
        const users = await UserTable.find();
        return users.map((user) => user.name);
      } catch (error) {
        throw new Error("Could not fetch user names");
      }
    },
  },
};
