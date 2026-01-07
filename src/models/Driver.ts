

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Zone from "./Zone.js";

const Driver = sequelize.define(
  "Driver",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
  
      latitude: {
      type: DataTypes.DECIMAL(10, 8),
    },
     longitude: {
      type: DataTypes.DECIMAL(10, 8),
    },
capacity: {
      type: DataTypes.INTEGER,
    },
   staus: {
      type: DataTypes.ENUM('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'),
      defaultValue: 'PENDING'
    },
     ZoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Zone,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "drivers",
    timestamps: true, // createdAt + updatedAt automatiques
    createdAt: "created_at",
     updatedAt: "updated_at",
  }
);


export default Driver;
