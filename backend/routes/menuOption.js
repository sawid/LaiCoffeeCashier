const express = require('express');
const router = express.Router();

const { addMenuOption } = require('../controllers/menuoption')

router.post('/addMenuOption', addMenuOption)

module.exports = router