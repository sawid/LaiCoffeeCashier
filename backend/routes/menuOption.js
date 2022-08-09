const express = require('express');
const router = express.Router();

const { addMenuOption, listMenuOption, listMenuOptionPrice } = require('../controllers/menuoption')

router.get('/listMenuOption', listMenuOption)

router.get('/listMenuOptionPrice', listMenuOptionPrice)

router.post('/addMenuOption', addMenuOption)

module.exports = router