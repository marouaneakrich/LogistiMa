import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Parcel extends Model {
  public id!: number;
  public status!: 'PENDING' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED';
  public pickupAddress!: string | null;
  public deliveryAddress!: string | null;
  public driverId!: number | null;
  public zoneId!: number | null;
  public deliveryId!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Parcel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'),
      defaultValue: 'PENDING',
    },
    pickupAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'pickup_address'
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'delivery_address'
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
    deliveryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'delivery_id'
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
    tableName: 'parcels',
    timestamps: true,
    underscored: true,
  }
);

export default Parcel;