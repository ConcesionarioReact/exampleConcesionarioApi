import Cors from 'cors';
import dotenv from 'dotenv';
import Express from "express";
import { conectarDB } from './db/db.js'
import rutasVehiculo from './views/vehiculos/routes.js';

dotenv.config({path:'./.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVehiculo);

const main = () => {
   return app.listen(process.env.PORT, () => {
      console.log(`Esuchando puerto ${process.env.PORT}`);
   });
};

conectarDB(main);