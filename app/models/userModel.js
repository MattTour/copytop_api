import { DataTypes, Model } from "sequelize";

export class User extends Model { };

export const configure = (sequelize) => {
    User.init({
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'USERS',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
}

export default User;
