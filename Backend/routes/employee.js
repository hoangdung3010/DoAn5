const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let product = req.body;
    var query = "insert into employee (name,departmentId,description,salary,status) values(?,?,?,?,'true')";
    connection.query(query,[product.name,product.departmentId,product.description,product.salary],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Thêm nhân viên mới thành công!"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query  = "select e.id, e.name,e.description,e.salary,e.status,d.id as departmentId, d.name as departmentName from employee as e INNER JOIN department as d where e.departmentId = d.id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getByDepartment/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id, name from employee where departmentId=? and status='true'";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getById/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id, name, description, salary from employee where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results[0]);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product = req.body;
    var query = "update employee set name=?, departmentId=?,description=?,salary=? where id=? ";
    connection.query(query,[product.name,product.departmentId, product.description,product.salary,product.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Mã nhân viên không tìm thấy!"});
            }
            return res.status(200).json({message:"Đã cập nhật thành công nhân viên!"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from employee where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Mã nhân viên không tìm thấy!"});
            }
            return res.status(200).json({message:"Đã xóa nhân viên thành công!"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateStatus',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let user = req.body;
    var query = "update employee set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Mã nhân viên không tìm thấy!"});
            }
            return res.status(200).json({message:"Đã cập nhật trạng thái nhân viên!"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})
module.exports = router;