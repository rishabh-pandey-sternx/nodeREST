const express =require('express');
const path = require('path');
const dotenv =require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./src/routes');


const app = express();
const port = process.env.PORT || 3000;
// load environments variables
dotenv.config();

// Middleware registration
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// DB connection

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
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
   

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});

