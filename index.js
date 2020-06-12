require('dotenv').config();
const debug=require('debug')('app:root')
const config=require('config');
const express = require('express');
const bodyparser=require('body-parser')
const errorHandler=require('./_helpers/error-handler');
const http = require('http');
const app = express()
const server = http.createServer(app);


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json({limit:'1mb'}));

debug(`Application name ${config.get('mongoUrl')}`)

app.use( (req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, authorization, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.send({"message":"Api server"})
})

app.use('/categories',require('./modules/category/categorycontroller'));
app.use('/products',require('./modules/product/productcontroller'));
app.use('/transactions',require('./modules/transaction/transactionController'));
app.use(errorHandler);
const port=config.get('port') || 3000;

server.listen(port, () => {
    debug(`Listening on port  ${port}`);
});
