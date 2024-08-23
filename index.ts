import express from 'express';
import cors from 'cors';
import config from './config';
import mySQLDb from './mysqlDB';
import categoriesRouter from './routers/categories';
import placesRouter from "./routers/places";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
app.use('/items', itemsRouter);

const run = async () => {
  await mySQLDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(console.error);
