import Express from 'express';
import { queryAllVehicles, createVehicle, editVehicle, deleteVehicle } from '../../controllers/vehiculos/controller.js';
import { getDB } from '../../db/db.js'

const rutasVehiculo = Express.Router();

const genericCallback = (res) => (err, result) => {
   if (err) {
      res.status(500).send('Error consultando los vehiculos')
   } else {
      res.json(result);
   }
};

rutasVehiculo.route('/vehiculos').get((req, res) => {
   console.log('Alguien hizo get en la ruta /vehiculos');
   queryAllVehicles(genericCallback(res));
});

rutasVehiculo.route('/vehiculos/nuevo').post((req, res) => {
   createVehicle(req.body, genericCallback(res));
});

rutasVehiculo.route('/vehiculos/editar').patch((req, res) => {
   editVehicle(req.body, genericCallback(res));
});

rutasVehiculo.route('/vehiculos/eliminar').delete((req, res) => {
   deleteVehicle(req.body.id, genericCallback(res));
});

export default rutasVehiculo;