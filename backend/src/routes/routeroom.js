
const express = require('express')
const router = express.Router()
const room = require('../services/convroom')
router.post('/add/:User1_param/:User2_param',room.creatrome)
router.delete('/delete/:ConvName',room.deleteroom)
router.get('/getroom/:User1_param/:User2_param',room.getroombyuser12)
module.exports = router