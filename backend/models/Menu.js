const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
        menuName:{
                type:String
        },
        menuPrice:{
                type:Number
        },
        menuStatus:{
                type:Boolean,
                default:true
        },
        menuSection:{
                type:String
        },
        menuImages:{
                type:String
        },
},
{ timestamps: true }
);

module.exports = Menu = mongoose.model('menus', MenuSchema);