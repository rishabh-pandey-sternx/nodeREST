const dotenv =require('dotenv');
const compression = require('compression')
const cors = require('cors');
const express =require('express');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const httpStatus = require( 'http-status');
const mongoose = require('mongoose');
const winston = require('winston');


const router = require('./routes');
const config = require('./config');
const customBodyTrimmer = require('./middlewares/body-trimmer')
const logger = require('./middlewares/logger');


const app = express();

// load environments variables
dotenv.config();

const port = process.env.PORT || 3000;

/*   Middleware registration   */
app.use(express.json({limit: '1 MB'}));
app.use(express.urlencoded({extended:false}));
// Enables the CORS
app.use(cors());
app.use(compression());
// secure apps by setting various HTTP headers
app.use(helmet());
// Body trimmer
app.use(customBodyTrimmer());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// // enable detailed API logging in dev env
if (config.env === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// DB connection

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true,
  autoIndex: true,
}, () => {
 console.log('connected to db');
});
mongoose.connection.on('error', (err) => {
    console.log(err, 'Database connection error');
});

// Routes registration
app.get('/', (req, res) => {
 res.send('Hello World!');
});

apiVersion = '/api/v0';
// Routes registration
app.use(`${apiVersion}`, router);


// catch 404 and forward to error handler
app.use('*',(req, res, next) => {
    const err = res.status(404)
    .send({ message: 'No such API', success: false, data: {} });
    return next(err);
  });
    
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});

