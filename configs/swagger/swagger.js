const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "todo app api",
            description: "This is the todo app api for development server.",
            contact: {
                name: "Ahmed Rafiullah",
                email: "support@example.com"
            },
            version: "0.1"
        },
        servers: [{
            url: "http://localhost:5678/api",
            description: "Development server"
        }]
    },
    // Path to the API docs
    apis: ['./api/swagger-yaml/**/*.yaml'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);


module.exports = {
    swaggerSpec
}