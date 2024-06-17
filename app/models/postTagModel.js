import { DataTypes, Model } from "sequelize";

export class PostTag extends Model {};

export const configure = (sequelize) => {
    PostTag.init({

    }, {
        sequelize,
        tableName: 'POSTS_TAGS',
        createdAt: false,
        updatedAt: false
    })
}

export default PostTag;
