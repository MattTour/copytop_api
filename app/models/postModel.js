import { DataTypes, Model } from "sequelize";

export class Post extends Model { };

export const configure = (sequelize) => {
    Post.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'POSTS',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
}

export default Post;
