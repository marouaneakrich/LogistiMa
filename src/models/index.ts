import  sequelize from "../config/database";
import  Zone from  "./Zone";
import  Driver from  "./Driver";
import  Delivery from  "./Delivery";  
import  Parcel from  "./Parcel";  

Zone.hasMany(Driver, { foreignKey: "ZoneId" });
Driver.belongsTo(Zone, { foreignKey: "ZoneId" });

Zone.hasMany(Parcel, { foreignKey: "ZoneId" });
Parcel.belongsTo(Zone, { foreignKey: "ZoneId" });

Driver.hasMany(Delivery, { foreignKey: "DriverId" });
Delivery.belongsTo(Driver, { foreignKey: "DriverId" });

Driver.hasMany(Parcel, { foreignKey: "DriverId" });
Parcel.belongsTo(Driver, { foreignKey: "DriverId" });

Delivery.hasOne(Parcel, { foreignKey: "DeliveryId" });
Parcel.belongsTo(Delivery, { foreignKey: "DeliveryId" });

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