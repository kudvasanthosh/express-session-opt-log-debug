const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const Orderschema = new Schema({
    productId:{type:Schema.Types.ObjectId,ref:'Product',index:true,required:true},
    customerId:{type:Schema.Types.ObjectId,ref:'Customer',index:true,required:true},
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', Orderschema);
