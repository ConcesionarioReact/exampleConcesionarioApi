import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

let conexion;

dotenv.config({path:'./.env'});

const stringConection = process.env.DATABASE_URL;

const client = new MongoClient(stringConection,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const conectarDB = (callback) => {
   client.connect((err, db) => {
      if (err) {
         console.error('Error conectando a la base de datos')
         return false;
      } 

      conexion = db.db('Concesionario');
      console.log('Conexión Exitosa!')
      return callback(); 
   });
};

const getDB = () => {
   return conexion;
}

export { conectarDB, getDB };