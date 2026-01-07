import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Delivery extends Model {
  public id!: number;
  public driverId!: number;
  public zoneId!: number;
  public capacity!: number;
  public remainingCapacity!: number;
  public available!: boolean;
}

Delivery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    remainingCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'delivery',
    timestamps: true
  }
);