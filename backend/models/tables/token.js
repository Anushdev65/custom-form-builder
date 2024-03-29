import { DataTypes } from "sequelize";

const TokenModel = (sequelize) => {
  const Token = sequelize.define(
    "token",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("access", "reset_password", "verify_email"),
        defaultValue: "access",
        allowNull: false,
      },
      expiration: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Token;
};
export default TokenModel;
