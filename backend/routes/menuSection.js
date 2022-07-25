const express = require('express');
const router = express.Router();

const { addMenuSection, listMenuSection } = require('../controllers/menusection')

router.get('/listMenuSection', listMenuSection)

router.post('/addMenuSection', addMenuSection)

module.exports = router