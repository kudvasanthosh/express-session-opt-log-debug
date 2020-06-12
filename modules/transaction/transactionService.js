const db=require('../../_helpers/db');
const mongoose= require('mongoose')

const Order=db.Order;
const Fawn= require('fawn');

Fawn.init(mongoose);


module.exports={
    handleTransaction
}

async function handleTransaction(oderObj){       
    let order=new Order(oderObj)
    Fawn.Task()
    .save('orders',order)
    .update('products',{_id:mongoose.Types.ObjectId(oderObj.productId)},{$inc:{stock:-1}})
    .run()
    .catch((err)=>{
        console.log(err);
    });
    return {"status":200,"data":order}
}