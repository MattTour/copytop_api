import { connect } from './connection.js';
import { configure as configureUser } from '../models/userModel.js';
import { configure as configurePost } from '../models/postModel.js';
import { configure as configureTag } from '../models/tagModel.js';
import { configure as configurePostTag } from '../models/postTagModel.js';
import { configure as configurePush } from '../models/pushModel.js'
import { configure } from '../models/associations.js';

export const createSequelize = async () => {
    const sequelize = await connect();
    configureUser(sequelize);
    configurePost(sequelize);
    configureTag(sequelize);
    configurePostTag(sequelize);
    configurePush(sequelize);
    configure(sequelize);

    return sequelize;
}
