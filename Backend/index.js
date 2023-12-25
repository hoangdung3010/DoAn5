const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const departmentRoute = require('./routes/department');
const employeeRoute = require('./routes/employee');
const contractRoute = require('./routes/contract');
const dashboardRoute = require('./routes/dashboard');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/department',departmentRoute);
app.use('/employee',employeeRoute);
app.use('/contract',contractRoute);
app.use('/dashboard',dashboardRoute);


module.exports= app;