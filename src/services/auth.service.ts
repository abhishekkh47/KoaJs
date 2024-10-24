import { UserTable } from "@app/models/user.model";
import { signJWT } from "@app/utils"; // Adjust this import according to your project structure
import bcrypt from "bcrypt";

class AuthDBService {
  public async signup(input: any) {
    try {
      const { name, email, password } = input;
      const existingUser = await UserTable.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserTable({ name, email, password: hashedPassword });
      await user.save();

      const token = signJWT(user);
      return { token, user };
    } catch (error) {
      throw new Error("Signup failed");
    }
  }

  public async login(email: string, password: string) {
    try {
      const user: any = await UserTable.findOne({ email }); // Use findOne instead of find
      if (!user) {
        throw new Error("User Not Found"); // Handle user not found
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Invalid Password"); // Handle invalid password
      }

      const token = signJWT(user);
      return { token, user }; // Ensure you're returning a valid response
    } catch (error) {
      throw new Error("Login failed"); // Throw an error to be caught in GraphQL
    }
  }
}

export default new AuthDBService();
