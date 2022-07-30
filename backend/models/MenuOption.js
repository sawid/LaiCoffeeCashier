const mongoose = require('mongoose');

const cellOptionChoiceSchema = new mongoose.Schema({
        menuOptionChoiceName: String,
        menuOptionChoicePrice: Number,
})

const MenuOptionSchema = new mongoose.Schema({
        menuOptionName:{
                type:String,
        },
        menuType: {
                type:Number,
        },
        menuOptionChoice: [cellOptionChoiceSchema],
})

module.exports = MenuOption = mongoose.model('menuoption', MenuOptionSchema);