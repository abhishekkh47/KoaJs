import { AuthDBService } from "@app/services";

export const authResolvers = {
  Mutation: {
    signup: async (_: any, { input }: any): Promise<any> => {
      return await AuthDBService.signup(input);
    },
    login: async (_: any, { email, password }: any) => {
      return await AuthDBService.login(email, password);
    },
  },
};
