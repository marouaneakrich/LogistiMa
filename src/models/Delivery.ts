import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Delivery extends Model {
  public id!: number;
  public driverId!: number | null;
  public zoneId!: number | null;
  public capacity!: number | null;
  public remainingCapacity!: number | null;
  public available!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Delivery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'driver_id'
    },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'zone_id'
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    remainingCapacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'remaining_capacity'
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  },
  {
    sequelize,
    tableName: 'deliveries',
    timestamps: true,
    underscored: true,
  }
);

export default Delivery;