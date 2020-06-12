const express =require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const router= express.Router();
const transactionService=require('./transactionService');
const utils=require('../../_helpers/utils')

function validateOrder(order){
    const schema={
        productId :Joi.objectId().required(),
        customerId :Joi.objectId().required(),
    }

    return Joi.validate(order,schema)
   
}
router.post('/',utils.exceptionHandler(handleTransation));


async function handleTransation(req,res){
    const {error} =validateOrder(req.body);
    if(error){
        delete error.details[0].context;
        delete error.details[0].path;
        res.status(400).send(error.details[0])
        return;
    }
    let response=await transactionService.handleTransaction(req.body);
    if(response){
      res.status(response.status).send(response)
    }else{
      res.status(400).send({"message":"something went wrong"})
    }

}

module.exports=router;