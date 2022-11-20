const BaseModel = require("./BaseModel");

class Product extends BaseModel {
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
                name: {
                    type: DataTypes.TEXT,
                    defaultValue: null,
                },
                price: {
                    type: DataTypes.DOUBLE,
                    defaultValue: null,
                },
            },
            {
                modelName: "Product",
                tableName: "product",
                underscored: true,
                sequelize,
            }
        );
    }
}

module.exports = Product;
