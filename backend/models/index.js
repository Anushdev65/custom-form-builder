import { database, user, host } from "../config/config.js";
import { DataTypes, Sequelize } from "sequelize";
import UserModel from "./tables/user.js";
import TokenModel from "./tables/token.js";
import OrganizationModel from "./tables/organization.js";
import FormFieldsModel from "./tables/formFields.js";
const sequelize = new Sequelize(database, "mist-dev", "sqlrookiedev", {
  host: host,
  dialect: "mysql",
  // logging: false,
});

export const User = UserModel(sequelize, DataTypes);
export const Token = TokenModel(sequelize, DataTypes);
export const Organization = OrganizationModel(sequelize, DataTypes);

export const FormFields = FormFieldsModel(sequelize, DataTypes);

const db = { User, Token, Organization, FormFields, sequelize };

// Synchronizing models with the database

async function syncDatabase() {
  // await sequelize.sync({ alter: true });
}
export default { db, syncDatabase };
