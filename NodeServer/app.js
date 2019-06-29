const express = require("express");
const app = express();
const morgan = require ('morgan');
const mongoose = require('mongoose');
const productRoute = require("./api/routes/employee");
const bodyParser = require('body-parser');



mongoose.connect('mongodb+srv://amit_shinde:' +
    process.env.MONGO_PW +
    '@node-rest-shop-3odr0.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    });
    app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});





app.use('/employees', productRoute);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.err || 500);
    res.json({ error: { message: error.message } });

});





module.exports = app;