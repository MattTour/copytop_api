import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

//Add router here
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';


export default function (database) {
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(bodyParser())

  //add routes here
  app.use('/api/user', userRouter);
  app.use('/api/post', postRouter);

  // Swagger documentation

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Node JS API project for copytop api',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:5001/'
        }
      ]
    },
    apis: ['./routes/*.js']
  }

  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


  // Global routes
  app.get('/api/', (req, res) => {
    res.status(200).send('Hello world !');
  });

  return app
}
