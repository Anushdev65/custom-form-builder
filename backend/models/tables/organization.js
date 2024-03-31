import { Sequelize, DataTypes } from "sequelize";

const OrganizationModel = (sequelize) => {
  const Organization = sequelize.define(
    "organization",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true, // Address is optional
      },

      adminUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Organization;
};

export default OrganizationModel;
