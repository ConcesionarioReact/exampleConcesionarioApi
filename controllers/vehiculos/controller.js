import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const queryAllVehicles = async (callback) => {
   const conexion = getDB();
   await conexion.collection('Vehiculo').find({}).limit(50).toArray(callback);
};

const createVehicle = async (datosVehiculos, callback) => {
   if (
      Object.keys(datosVehiculos).includes('name') &&
      Object.keys(datosVehiculos).includes('brand') &&
      Object.keys(datosVehiculos).includes('model')
   ) {
      const conexion = getDB();
      //Implementar codigo para crear vehiculo en la base de datos
      await conexion.collection('Vehiculo').insertOne(datosVehiculos, callback); 
   } else {
      return 'error';
   }
};

const editVehicle = async (edicion, callback) => {
   const filtroVehiculo = { _id: new ObjectId(edicion.id) };
   delete edicion.id
   const operacion = {
      $set: edicion
   }
   const conexion = getDB();
   await conexion.collection('Vehiculo').findOneAndUpdate(filtroVehiculo, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteVehicle = async (id, callback) => {
   const filtroVehiculo = { _id: new ObjectId(id) };
   const conexion = getDB();
   await conexion.collection('Vehiculo').deleteOne(filtroVehiculo, callback);
};

export { queryAllVehicles, createVehicle, editVehicle, deleteVehicle };