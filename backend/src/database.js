const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/usuarios_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado:', MONGO_URI))
  .catch(err => console.error('Error MongoDB:', err));
