import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ItemAttributes {
  id: number;
  name: string;
  image: string;
}

export interface ItemModel extends Model<ItemAttributes>, ItemAttributes {}

export class Item extends Model<ItemModel, ItemAttributes> {}

export type ItemStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ItemModel;
};

export function ItemFactory (sequelize: Sequelize): ItemStatic {
  return <ItemStatic>sequelize.define("Items", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    modelName: 'Item',
    timestamps: false
  });
}