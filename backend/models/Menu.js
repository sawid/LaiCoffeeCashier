const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
        menuName:{
                type:String
        },
        menuPrice:{
                type:Number
        },
        menuSection:{
                type:String
        },
        menuStatus:{
                type:Boolean,
                default:true
        },
        menuOption:{
                type:Array,
        },
        menuImages:{
                type:String
        },
},
{ timestamps: true }
);

module.exports = Menu = mongoose.model('menus', MenuSchema);