const express = require('express')
const saveGameController = require('../controller/saveGame')
const router = express.Router()


router.route('/saveGame').post(saveGameController.saveGame);
router.route('/getUser').get(saveGameController.getUser)


module.exports = router