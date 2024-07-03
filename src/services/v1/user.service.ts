import { IUser } from "@app/types";
import bcrypt from "bcrypt";
import { UserTable } from "@app/models/mongo";
import { NetworkError } from "@app/middleware";
class UserService {
  public async userSignup(body: IUser) {
    const { email, username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserTable.create({
      email,
      username,
      password: hashedPassword,
    });
  }

  async ifEmailExists(email: string) {
    return await UserTable.findOne({ email });
  }

  async ifUserNameExists(username: string) {
    return await UserTable.findOne({ username });
  }
}

export default new UserService();
