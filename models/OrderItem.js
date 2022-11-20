const BaseModel = require("./BaseModel");

class OrderItem extends BaseModel {
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
                order_id: {
                    type: DataTypes.TEXT,
                    defaultValue: null,
                },
                product_id: {
                    type: DataTypes.DOUBLE,
                    defaultValue: null,
                },
            },
            {
                modelName: "OrderItem",
                tableName: "order_item",
                underscored: true,
                sequelize,
            }
        );
    }
}

module.exports = OrderItem;
