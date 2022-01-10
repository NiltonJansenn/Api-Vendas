import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/erros/AppError';
//import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, resṕonse: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        staus: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      mesage: 'erro interno do servidor',
    });
  },
);

const port = 3333;

app.listen(port, () => {
  console.log(`servidor funcionado na porta ${port}`);
});
