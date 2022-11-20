const BaseModel = require("./BaseModel");

class Catalog extends BaseModel {
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
                seller_id: {
                    type: DataTypes.INTEGER,
                    defaultValue: null,
                },
                product_id: {
                    type: DataTypes.INTEGER,
                    defaultValue: null,
                },
            },
            {
                modelName: "Catalog",
                tableName: "catalog",
                underscored: true,
                sequelize,
            }
        );
    }
}

module.exports = Catalog;
