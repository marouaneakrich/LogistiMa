import sequelize from "../config/database";
import Zone from "./Zone";
import Driver from "./Driver";
import Delivery from "./Delivery";
import Parcel from "./Parcel";

Zone.hasMany(Driver, { foreignKey: "zoneId", as: "drivers" });
Driver.belongsTo(Zone, { foreignKey: "zoneId", as: "zone" });

Zone.hasMany(Parcel, { foreignKey: "zoneId", as: "parcels" });
Parcel.belongsTo(Zone, { foreignKey: "zoneId", as: "zone" });

Driver.hasMany(Delivery, { foreignKey: "driverId", as: "deliveries" });
Delivery.belongsTo(Driver, { foreignKey: "driverId", as: "driver" });


Driver.hasMany(Parcel, { foreignKey: "driverId", as: "parcels" });
Parcel.belongsTo(Driver, { foreignKey: "driverId", as: "driver" });


Delivery.hasMany(Parcel, { foreignKey: "deliveryId", as: "parcels" });
Parcel.belongsTo(Delivery, { foreignKey: "deliveryId", as: "delivery" });

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

export { sequelize, Driver, Parcel, Delivery, Zone };