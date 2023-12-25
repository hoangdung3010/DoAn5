const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let department = req.body;
    query = "insert into department (name) values(?)";
    connection.query(query,[express.name],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Thêm phòng ban thành công!"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query = "select * from department order by name";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let employee = req.body;
    var query = "update department set name=? where id=?";
    connection.query(query,[employee.name,employee.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Không tìm thấy mã phòng ban."});
            }
            return res.status(200).json({message:"Đã cập nhật thông tin phòng ban thành công!"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;