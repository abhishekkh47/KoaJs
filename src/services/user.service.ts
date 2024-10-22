import { firestore } from "../config";
import { User } from "../models/user";

export class UserService {
  private userCollection = firestore.collection("users");

  public async getAllUsers() {
    console.log("here");
    const usersSnapshot = await this.userCollection.get();
    console.log("usersSnapshot : ", usersSnapshot);
    return usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  public async getUserById(id: string) {
    console.log("here1");
    const userDoc = await this.userCollection.doc(id).get();
    console.log("userDoc : ", userDoc);
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    return { id: userDoc.id, ...userDoc.data() };
  }

  public async updateUser(id: string, data: Partial<User>) {
    const userDoc = this.userCollection.doc(id);
    await userDoc.update(data);
    const updatedUser = await userDoc.get();
    return { id: updatedUser.id, ...updatedUser.data() };
  }

  public async deleteUser(id: string) {
    await this.userCollection.doc(id).delete();
  }
}
