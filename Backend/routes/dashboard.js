const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

router.get('/details',auth.authenticateToken, (req,res,next)=>{
    var departmentCount;
    var productCount;
    var billCount;
    var query = "select count(id) as departmentCount from department";
    connection.query(query,(err,results)=>{
        if(!err){
            departmentCount = results[0].departmentCount;
        }
        else{
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as employeeCount from employee";
    connection.query(query,(err,results)=>{
        if(!err){
            employeeCount = results[0].employeeCount;
        }
        else{
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as contractCount from contract";
    connection.query(query,(err,results)=>{
        if(!err){
            contractCount = results[0].contractCount;
            var data = {
                department : departmentCount,
                employee : employeeCount,
                contract: contractCount
            }
            return res.status(200).json(data);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;