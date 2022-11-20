const BaseModel = require("./BaseModel");

class User extends BaseModel {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER(11).UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                uuid: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                },
                username: {
                    type: DataTypes.TEXT,
                    defaultValue: null,
                },
                password: {
                    type: DataTypes.TEXT,
                    defaultValue: null,
                },
                user_type: {
                    type: DataTypes.TEXT,
                    defaultValue: null,
                }
            },
            {
                modelName: "User",
                tableName: "users",
                underscored: true,
                sequelize,
            }
        );
    }
}

module.exports = User;
