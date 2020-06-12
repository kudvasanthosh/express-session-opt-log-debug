const express = require('express');
const debug=require('debug')('app:product')
const Joi = require('joi');

const router = express.Router();
const productservice = require('./productservice');
const utils=require('../../_helpers/utils')
// routes
router.get('/',utils.exceptionHandler(getAll));
router.get('/:productname',utils.exceptionHandler(getByproductname));
router.post('/',utils.exceptionHandler(addproduct))
router.put('/:productname',utils.exceptionHandler(update));
router.delete('/:productname',utils.exceptionHandler(removeproduct));



module.exports = router;



function validateproduct(auth){
    const schema={
        productname:Joi.string().min(3).required(),
        productprice:Joi.number().required(),
        productcategory:Joi.string().required(),
        status:Joi.boolean(),
        createdAt:Joi.date()
    }

    return Joi.validate(auth,schema) 
}
 
async function getAll(req,res){
    debug('get all products');
    let response=await productservice.getall(req.query)
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }

}

async function addproduct(req,res){

    const {error} =validateproduct(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    let response=await productservice.create(req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
    
}

async function getByproductname(req,res){
    if(!req.params.productname){
        res.status(400).send({"message":" id param is missing"});
        return;
    }
    let response=await productservice.getbyproductname(req.params.productname);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}


async function update(req,res){
    const {error} =validateproduct(req.body);
    if(error){
        res.status(400).send(error)
        return;
    }
    let response=await productservice.update(req.params.productname,req.body);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    } 
}

async function removeproduct(req,res){
    let response= await productservice.delete(req.params.productname);
    if(response){
        res.status(response.status).send(response)
    }else{
        res.status(400).send({"message":"something went wrong"})
    }
}