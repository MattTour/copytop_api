import { DataTypes, Model } from "sequelize";

export class Push extends Model { };

export const configure = (sequelize) => {
    Push.init({
        endpoint: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //auth_token = p256h
        auth_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // public_key = auth
        public_key: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'PUSHS',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
}

export default Push;
