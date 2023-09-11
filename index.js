import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/users.js";
import { casesRoutes } from "./routes/cases.js";
import { assigneeRoutes } from "./routes/assignee.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(casesRoutes);
app.use(assigneeRoutes);

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tostadas Valencia SAS",
      version: "1.0.0",
      description: "API para registro de novedades de Tostadas Valencia SAS",
    },
  },
  apis: ["./routes/users.js", "./routes/cases.js", "./routes/assignee.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () =>
  console.log(`
🚀 Server ready at: ${port}`)
);

export default app;
