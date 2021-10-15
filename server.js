import Cors from 'cors';
import dotenv from 'dotenv';
import Express from "express";
import { conectarDB, getDB } from './db/db.js'

dotenv.config({path:'./.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/vehiculos', (req, res) => {
   console.log('Alguien hizo get en la ruta /vehiculos');
   const conexion = getDB();
   conexion.collection('Vehiculo').find({}).limit(50).toArray((err, result) => {
      if (err) {
         res.status(500).send('Error consultando los vehiculos')
      } else {
         res.json(result);
      }
   });
});

app.post('/vehiculos/nuevo', (req, res) => {
   const datosVehiculos = req.body;
   console.log('Llaves: ', Object.keys(datosVehiculos));
   try {
      if (
         Object.keys(datosVehiculos).includes('name') &&
         Object.keys(datosVehiculos).includes('brand') &&
         Object.keys(datosVehiculos).includes('model')
      ) {
         const conexion = getDB();
         //Implementar codigo para crear vehiculo en la base de datos
         conexion.collection('Vehiculo').insertOne(datosVehiculos, (err ,result) => {
            if (err) {
               console.error(err);
               res.sendStatus(500);
            } else {
               console.log(result);
               res.sendStatus(200);
            }
         });
      } else {
         res.sendStatus(500);
      }
   } catch {
      res.sendStatus(500);
   }
});

app.patch('/vehiculos/editar', (req, res) => {
   const edicion = req.body;
   console.log(edicion);
   const filtroVehiculo = { _id: new ObjectId(edicion.id) };
   delete edicion.id
   const operacion = {
      $set: edicion
   }
   const conexion = getDB();
   conexion.collection('Vehiculo').findOneAndUpdate(filtroVehiculo, operacion, { upsert: true, returnOriginal: true }, (err, result) => {
      if (err){ 
         console.error('Error al actualizar el vehiculo', err);
         res.sendStatus(500);
      } else {
         console.log('Actualización');
         res.sendStatus(200);
      }
   });
});

app.delete('/vehiculos/eliminar', (req, res) => {
   const filtroVehiculo = { _id: new ObjectId(req.body.id) };
   const conexion = getDB();
   conexion.collection('Vehiculo').deleteOne(filtroVehiculo, (err, result) => {
      if (err) {
         console.error(err)
         res.sendStatus(500);
      } else {
         res.sendStatus(200);
      }
   });
});

const main = () => {
   return app.listen(process.env.PORT, () => {
      console.log(`Esuchando puerto ${process.env.PORT}`);
   });
};

conectarDB(main);