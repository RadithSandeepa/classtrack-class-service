import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Class Service API",
      version: "1.0.0",
      description: "Manages classes, students, schedules, subjects, and attendance",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
        {
          bearerAuth: [],
        },
    ],
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};