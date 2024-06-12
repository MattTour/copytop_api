import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class post extends Model { };

post.init({
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
    createdAt: true,
    updatedAt: true,
    tableName: 'POST',
})

export default post;
