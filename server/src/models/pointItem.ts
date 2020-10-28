import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface PointItemAttributes {
  pointId: number;
  itemId: number;
}

export interface PointItemModel extends Model<PointItemAttributes>, PointItemAttributes {}

export class PointItem extends Model<PointItemModel, PointItemAttributes> {}

export type PointItemStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PointItemModel;
};

export function PointItemFactory (sequelize: Sequelize): PointItemStatic {
  return <PointItemStatic>sequelize.define("PointItems", {
    pointId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    modelName: "PointItem",
    timestamps: false
  });
}