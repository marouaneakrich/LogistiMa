import  Zone from  "./Zone";
import  Driver from  "./Driver";
import  Delivery from  "./Delivery";  
import  Pacel from  "./Parcel";  


//associations
Zone.hasMany(Driver, { foreignKey: "ZoneId" });
Driver.belongsTo(Zone, { foreignKey: "ZoneId" });

Zone.hasMany(Pacel, { foreignKey: "ZoneId" });
Pacel.belongsTo(Zone, { foreignKey: "ZoneId" });

Driver.hasMany(Delivery, { foreignKey: "DriverId" });
Delivery.belongsTo(Driver, { foreignKey: "DriverId" });

Driver.hasMany(Pacel, { foreignKey: "DriverId" });
Pacel.belongsTo(Driver, { foreignKey: "DriverId" });

Delivery.hasOne(Pacel, { foreignKey: "DeliveryId" });
Pacel.belongsTo(Delivery, { foreignKey: "DeliveryId" });

