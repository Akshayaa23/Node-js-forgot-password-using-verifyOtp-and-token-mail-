const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')
 
mongoose.connect(process.env.mongo_url,{useUnifiedTopology:true,useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
});
 
db.once('open', () => {
    console.log('Database connection established')
});

const app = express();

app.use(express.json())
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

//to see image public in localhost
app.use("/uploads", express.static('uploads'));


const port = 5000;
app.listen(port, () => {
    console.log(`listening to port ${port}`)
});

app.use('/api/employee',EmployeeRoute)
app.use('/api/auth',AuthRoute)