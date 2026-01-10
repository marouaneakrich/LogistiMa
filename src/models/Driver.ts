import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Zone from './Zone';

export class Driver extends Model {
  public id!: number;
  public name!: string;
  public phone!: string | null;
  public latitude!: number | null;
  public longitude!: number | null;
  public capacity!: number | null;
  public status!: 'PENDING' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED';
  public zoneId!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Driver.init(
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
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'),
      defaultValue: 'PENDING',
    },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Zone,
        key: 'id',
      },
      field: 'zone_id'
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
    tableName: 'drivers',
    timestamps: true,
    underscored: true,
  }
);

export default Driver;
