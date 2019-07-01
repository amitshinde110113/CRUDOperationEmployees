const express = require("express");
const mongoose = require('mongoose');
const Employee = require('../models/employees');
const router = express.Router();

router.get('/', (req, res, next) => {
    Employee.find().select('_id firstName lastName age email salary gender').exec()
        .then(result => {
            res.status(200).json(
                result
            )

        }).catch(err => {
            res.status(404).json({
                error: err
            })
        });
});




router.post('/create', (req, res, next) => {

    employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        salary: req.body.salary,
        gender:req.body.gender


    })
    employee.save().then(result => {
       
        res.status(200).json(
            {
                Message: 'success employee created',
                data: employee
            })
        
    }

    ).catch(err => {
        res.status(404).json({
            error: err
        })
    })

});



router.patch('/update/:id', (req, res, next) => {

    const id = req.params.id;
    const updateOps = {};
    for (const op of req.body) {
        updateOps[op.propName] = op.value;
    }
    Employee.update({ _id: id }, { $set: updateOps }).select('_id firstName lastName age email salary')
        .then(result => {
            res.status(200).json({
                data: result
            })
        }).catch(err => {
            res.status(404).json({
                error: err
            })
        })

});


router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    Employee.remove({_id:id}).exec()
    .then(result=>{
        res.status(200).json(
            {
                Message: 'success'
            })
    }).catch(err => {
        res.status(404).json(
            {
            error: err
        })
    })
    
    
});


module.exports = router;