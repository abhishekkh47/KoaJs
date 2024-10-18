import { firestore } from "../config";
import { User } from "../models/user";

const userCollection = firestore.collection("users");

export class UserService {
  // Get all users
  static async getAllUsers(): Promise<User[] | any> {
    try {
      const snapshot = await userCollection.get();
      const users: User[] = [];
      snapshot.forEach((doc) =>
        users.push({ id: doc.id, ...doc.data() } as User)
      );
      return users;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  // Create a new user
  static async createUser(user: User): Promise<User> {
    const userRef = await userCollection.add(user);
    const newUser = { id: userRef.id, ...user };
    return newUser;
  }

  // Get user by ID
  static async getUserById(id: string): Promise<User | null | any> {
    try {
      const userDoc = await userCollection.doc(id).get();
      if (!userDoc.exists) return null;
      return { id: userDoc.id, ...userDoc.data() } as User;
    } catch (err) {
      console.log("error here: ", err);
    }
  }

  // Update user by ID
  static async updateUser(id: string, user: Partial<User>): Promise<void> {
    await userCollection.doc(id).update(user);
  }

  // Delete user by ID
  static async deleteUser(id: string): Promise<void> {
    await userCollection.doc(id).delete();
  }
}
