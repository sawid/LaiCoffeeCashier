const mongoose = require('mongoose');

const MenuSectionSchema = new mongoose.Schema({
        menuSectionName:{
                type:String
        },
        menuSectionDescription:{
                type:String
        },
},
{ timestamps: true }
);

module.exports = MenuSection = mongoose.model('menusection', MenuSectionSchema);