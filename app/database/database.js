import { createSequelize } from "./sequelize.js";

const database = await createSequelize();

export default database;
