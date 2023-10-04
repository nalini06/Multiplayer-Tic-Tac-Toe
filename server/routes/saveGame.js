const express = require('express')
const gameController = require('../controller/saveGame')
const router = express.Router()


router.route('/saveGame').post(gameController.saveGame);
router.route('/getUser').get(gameController.getUser)
router.route('/updateWin').post(gameController.updateWin)


module.exports = router