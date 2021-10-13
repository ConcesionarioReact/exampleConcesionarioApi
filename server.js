// Hacer el import de express tradicional --> const express = require('express');

import Express from "express";

const app = Express();
app.use(Express.json())

app.get('/vehiculos', (req, res) => {
   console.log('Alguien hizo get en la ruta /vehiculos');
   const vehiculos = [
      { nombre: 'Corolla', marca: 'Toyota', modelo: '2014' },
      { nombre: 'Yaris', marca: 'Toyota', modelo: '2018' },
      { nombre: 'Fiesta', marca: 'Ford', modelo: '2019' },
      { nombre: 'TXL', marca: 'Toyota', modelo: '2020' },
   ];
   res.send(vehiculos);
});

app.post('/vehiculos/nuevo', (req, res) => {
   //Implementar codigo para crear vehiculo en la base de datos
   console.log('vehiculo a crear:', req.body);
   res.send('Ok, vehiculo creado')
});

app.listen(5000, () => {
   console.log('Esuchando puerto 5000');
});