
const express = require('express')
const router = express.Router()
const message = require('../services/message')
router.post('/addmessage/:User1_param1/:ConvName', message.addmessage)
router.post('/showmessage', message.showmessage)
module.exports = router