const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Store API',
      version: '1.0.0',
      description: 'API for managing books in a store'
    },
    servers: [
      {
        url: 'http://localhost:5000/api'
      }
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['title', 'author', 'description', 'coverImage', 'genres', 'publicationDate', 'pageCount'],
          properties: {
            title: {
              type: 'string',
              description: 'The title of the book'
            },
            author: {
              type: 'string',
              description: 'The author of the book'
            },
            description: {
              type: 'string',
              description: 'Description of the book'
            },
            coverImage: {
              type: 'string',
              description: 'URL of the book cover image'
            },
            genres: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of genres'
            },
            publicationDate: {
              type: 'string',
              format: 'date',
              description: 'Publication date'
            },
            rating: {
              type: 'number',
              minimum: 0,
              maximum: 5,
              description: 'Rating from 0 to 5'
            },
            pageCount: {
              type: 'number',
              description: 'Number of pages'
            },
            publisher: {
              type: 'string',
              description: 'Publisher name'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
