import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const Zone = sequelize.define(
  "Zone",
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
    centraLat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    centraLng: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
      unique: true,
    },
    radius: {
type: DataTypes.DECIMAL(10, 8) ,    
 allowNull: false,
    },
    
  },
  {
    tableName: "zones",
    timestamps: true, // createdAt + updatedAt automatiques
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Zone;



