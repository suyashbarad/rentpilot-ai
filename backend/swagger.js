const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "RentPilot AI API",
      version: "1.0.0",
      description: "AI Powered Apartment Management Backend"
    },

    servers: [
      {
        url: "http://localhost:5001"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);