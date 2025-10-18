const app = require('./app');
require('./src/database'); // conecta a Mongo antes de levantar el server

app.listen(app.get('puerto'), () => {
  console.log('Nombre de la App', app.get('nombreApp'));
  console.log('Puerto del servidor', app.get('puerto'));
});
