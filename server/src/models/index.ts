import * as sequelize from "sequelize";
import { ItemFactory } from "./item";
import { PointFactory } from "./point";
import { PointItemFactory } from "./pointItem";
import { CountryFactory } from "./country";

export const dbConfig = process.env.NODE_ENV==='production'
    ? new sequelize.Sequelize(
        process.env.DATABASE_URL as string,
        {
          dialect: "postgres",
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          }
        }
      )
    : new sequelize.Sequelize(
        process.env.DATABASE_URL as string,
        { dialect: "postgres", }
    );

export const Item = ItemFactory(dbConfig);
export const Point = PointFactory(dbConfig);
export const PointItem = PointItemFactory(dbConfig);
export const Country = CountryFactory(dbConfig);

PointItem.belongsTo(Point, { foreignKey: 'pointId' });

Point.belongsToMany(Item, { through: 'PointItems', foreignKey: 'pointId', otherKey: 'itemId' });
