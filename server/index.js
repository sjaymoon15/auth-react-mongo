const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

console.log('above connect');
//DB setup
mongoose.connect('mongodb://localhost/auth'); 

mongoose.connection.once('connected', function() {
  console.log("Connected to database")
});
//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on:', port);