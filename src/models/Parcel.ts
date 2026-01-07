import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Parcel extends Model {
  public id!: number;
  public status!: 'PENDING' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED';
  public pickupAddress!: string;
  public deliveryAddress!: string;
  public driverId?: number;
}

Parcel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'),
      defaultValue: 'PENDING'
    },
    pickupAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'parcels',
    timestamps: true
  }
);