import express, { Express, Request, Response } from 'express';
import router from "./routes/todos"
import { NextFunction } from "express"
import dotenv from 'dotenv';
import { json } from 'body-parser';
json
const app:Express = express()
dotenv.config();
app.use(json())
app.use('/todos', router);
const port = process.env.PORT;

app.use((err: Error,req: Request, res: Response, next: NextFunction)=>{
res.status(500).json({message: err.message})
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 