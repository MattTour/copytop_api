import { connect } from './connection.js';
import { configure as configureUser } from '../models/userModel.js';
import { configure as configurePost } from '../models/postModel.js';

export const createSequelize = async () => {
    const sequelize = await connect();
    configureUser(sequelize);
    configurePost(sequelize);

    return sequelize;
}
