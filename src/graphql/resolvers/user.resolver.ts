import { UserDBService } from "@app/services";

export const userResolvers = {
  Query: {
    users: async () => {
      return await UserDBService.getAllUsers();
    },
    userNames: async () => {
      return await UserDBService.getUserNames();
    },
    getUserById: async (_: any, { userId }: any) => {
      return await UserDBService.getUserById(userId);
    },
  },
};
