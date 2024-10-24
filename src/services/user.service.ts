import { UserTable } from "@app/models/user.model";

class UserDBService {
  public async getAllUsers() {
    return await UserTable.find();
  }

  public async getUserNames() {
    try {
      const users = await UserTable.find();
      return users.map((user) => user.name);
    } catch (error) {
      throw new Error("Could not fetch user names");
    }
  }

  public async getUserById(userId: string) {
    try {
      const user: any = await UserTable.findOne({ _id: userId }); // Use findOne instead of find
      if (!user) {
        throw new Error("User Not Found"); // Handle user not found
      }
      return user;
    } catch (error) {
      throw new Error("Login failed"); // Throw an error to be caught in GraphQL
    }
  }
}

export default new UserDBService();
