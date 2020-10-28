import { BuildOptions, DataTypes, Model, Sequelize, BelongsToManyAddAssociationMixin } from "sequelize";
import { Item, ItemAttributes } from "./item";

export interface PointAttributes {
  id?: number;
  name: string;
  image?: string;
  email: string;
  whatsapp?: string;
  zip?: string;
  street: string;
  number?: number;
  city: string;
  province?: string;
  country: string;
  longitude: number;
  latitude: number;
  items?: ItemAttributes;
}

export class Point extends Model<PointAttributes> {
  public image!: string;
  public readonly items?: Item[];

  public addItems!: BelongsToManyAddAssociationMixin<Item, number>;
}

export type PointStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Point;
};

export function PointFactory (sequelize: Sequelize): PointStatic {
  return <PointStatic>sequelize.define("Points", {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL,
    },
    longitude: {
      type: DataTypes.DECIMAL,
    },
  }, {
    modelName: "Point",
    timestamps: false
  });
}
