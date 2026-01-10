import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Zone extends Model {
  public id!: number;
  public name!: string;
  public centerLat!: number | null;
  public centerLng!: number | null;
  public radius!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Zone.init(
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
    centerLat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      field: 'center_lat'
    },
    centerLng: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      unique: true,
      field: 'center_lng'
    },
    radius: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
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
    tableName: 'zones',
    timestamps: true,
    underscored: true,
  }
);

export default Zone;
