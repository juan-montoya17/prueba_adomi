const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

require('./utils/auth');
app.get('/',(req, res) => {
  res.send('Hola mi server en express');
});

app.get('/home', checkApiKey, (req, res) =>{
  res.send('Pagina principal');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);





app.listen(port, () =>{
  console.log('Mi port' + port);
});


