import { Sequelize, DataTypes, Model } from "sequelize";
import { IUser } from "@app/types";

class UserTable extends Model<IUser> {}

export default (sequelize: Sequelize) => {
  UserTable.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  return UserTable;
};
