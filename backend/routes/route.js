const express = require('express')
const router = express.Router();

const { addMenu } = require('../controllers/menu')

router.get('/', (req, res) => {
        res.send('Path Router Home')
})

router.post('/addMenu', addMenu)


module.exports = router