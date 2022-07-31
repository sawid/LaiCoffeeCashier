const express = require('express');
const router = express.Router();

const { addMenuOption, listMenuOption } = require('../controllers/menuoption')

router.get('/listMenuOption', listMenuOption)

router.post('/addMenuOption', addMenuOption)

module.exports = router