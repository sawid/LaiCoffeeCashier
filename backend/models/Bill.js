const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
        billTitle:{
                type:String
        },
},
{ timestamps: true }
);

module.exports = Bill = mongoose.model('bills', BillSchema);