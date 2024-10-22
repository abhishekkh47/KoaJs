import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { firestore } from "../config/firestore.config";
import config from "@app/config";

export class AuthService {
  private userCollection = firestore.collection("users");

  public async signup(data: {
    email: string;
    password: string;
    name: string | "";
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser: User = {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    };

    const userDoc = await this.userCollection.add(newUser);
    return { id: userDoc.id, email: newUser.email };
  }

  public async login(data: { email: string; password: string }) {
    try {
      const userSnapshot = await this.userCollection
        .where("email", "==", data.email)
        .get();

      if (userSnapshot.empty) {
        throw new Error("User not found");
      }

      const userData = userSnapshot.docs[0].data() as User;
      console.log("userData : ", userData);
      const isPasswordValid = await bcrypt.compare(
        data.password,
        userData.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: userSnapshot.docs[0].id },
        config.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      return { token };
    } catch (error) {
      console.log("error : ", error);
    }
  }
}
