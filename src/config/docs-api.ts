import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LogistiMa API",
            version: "1.0.0",
            description: "API documentation for LogistiMa backend",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Local server"
            },
            {
                url: "https://logistima.up.railway.app/api",
                description: "Production server"
            },
        ],
        components: {
            schemas: {
                Driver: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        phone: { type: "string" },
                        latitude: { type: "number" },
                        longitude: { type: "number" },
                        capacity: { type: "integer" },
                        status: { type: "string", enum: ["PENDING", "ASSIGNED", "IN_TRANSIT", "DELIVERED"] },
                        zoneId: { type: "integer" },
                    }
                },
                Zone: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        centerLat: { type: "number" },
                        centerLng: { type: "number" },
                        radius: { type: "number" },
                    }
                },
                Parcel: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        status: { type: "string", enum: ["PENDING", "ASSIGNED", "IN_TRANSIT", "DELIVERED"] },
                        pickupAddress: { type: "string" },
                        deliveryAddress: { type: "string" },
                        driverId: { type: "integer" },
                        zoneId: { type: "integer" },
                        deliveryId: { type: "integer" },
                    }
                },
                Delivery: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        driverId: { type: "integer" },
                        zoneId: { type: "integer" },
                        capacity: { type: "integer" },
                        remainingCapacity: { type: "integer" },
                        available: { type: "boolean" },
                    }
                },
                Error: {
                    type: "object",
                    properties: {
                        error: {
                            type: "oneOf",
                            oneOf: [
                                { type: "string" },
                                {
                                    type: "object",
                                    properties: {
                                        message: { type: "string" },
                                        stack: { type: "string" }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
    apis: [path.join(__dirname, "../routes/*.{ts,js}")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
