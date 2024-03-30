import { DataTypes } from "sequelize";

const FormFieldsModel = (sequelize) => {
  const FormFields = sequelize.define(
    "form_fields",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING, // Define as a string in the database
        allowNull: false,
        get() {
          // Convert string representation to array
          const typesString = this.getDataValue("type");
          return typesString ? typesString.split(",") : [];
        },
        set(value) {
          // Convert array to string representation
          this.setDataValue("type", value.join(","));
        },
      },

      formId: {
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
  return FormFields;
};

export default FormFieldsModel;
