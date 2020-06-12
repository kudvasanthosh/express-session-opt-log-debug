const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const Customerschema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', Customerschema);