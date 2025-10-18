const mongoose = require('mongoose');
const Empleado = require('../src/models/Empleado');

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/usuarios_db');
    console.log('Conectado a MongoDB');

    const datos = [
      { nombre: 'Ana Torres', cargo: 'Analista', departamento: 'TI', sueldo: 1200 },
      { nombre: 'Luis Pérez', cargo: 'Gerente', departamento: 'Operaciones', sueldo: 3000 },
    ];

    await Empleado.insertMany(datos);
    console.log('Datos de ejemplo insertados');

    await mongoose.disconnect();
    console.log('Desconectado');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
