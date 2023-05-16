import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

import groupRoutes from './routes/group.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

/* SWAGGER */
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API",
            version: "1.0.0",
            description: "REST API for the application sliceIT",
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    swaggerOptions: {
        authAction: {
            jwt: {
                name: "JWT",
                schema: {
                    type: "http",
                    in: "header",
                },
                value : "Bearer <JWT>",
            },
        }, 
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/v1/groups", groupRoutes);

/* MOONGOSE */
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(error.message));