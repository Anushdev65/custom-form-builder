import { DataTypes } from "sequelize";

const FormModel = (sequelize) => {
  const Form = sequelize.define(
    "form",
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
      label: {
        type: DataTypes.JSON, // Modify data type to JSON
        allowNull: false,
        defaultValue: [], // Default value is an empty array
      },
      // Linking the form to its respective organization
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "organizations",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Defining associations
  Form.associate = (models) => {
    Form.belongsTo(models.Organization, {
      foreignKey: "organizationId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Form.hasMany(models.FormFields, {
      foreignKey: "formId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Form;
};

export default FormModel;
