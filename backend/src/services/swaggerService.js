import swaggerJSDoc from 'swagger-jsdoc';
import * as path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Konfigurace Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Dokumentace Punchstarter',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:2580', // URL serveru
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../swaggerDocs/*.js')],  // Cesta k souborům
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
