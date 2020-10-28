import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CountryAttributes {
  id: number;
  name: string;
}

export interface CountryModel extends Model<CountryAttributes>, CountryAttributes {}

export class Country extends Model<CountryModel, CountryAttributes> {}

export type CountryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CountryModel;
};

export function CountryFactory (sequelize: Sequelize): CountryStatic {
  return <CountryStatic>sequelize.define("Countries", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    modelName: 'Country',
    timestamps: false
  });
}