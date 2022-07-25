const express = require('express')
const router = express.Router();

const { addMenu, listMenu } = require('../controllers/menu')

router.get('/', (req, res) => {
        res.send('Path Router Home')
})

router.post('/addMenu', addMenu)

router.get('/listMenu', listMenu)


module.exports = router