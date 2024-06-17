import { DataTypes, Model } from "sequelize";

export class Tag extends Model { };

export const configure = (sequelize) => {
    Tag.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'TAGS',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
}

export default Tag;
