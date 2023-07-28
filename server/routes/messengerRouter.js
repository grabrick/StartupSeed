const {Router} = require('express')
const router = Router()
const controller = require('../routes/messengerController/messengerController')

router.post(
    '/:id/createMessage',
    controller.createMessenger
)

router.get(
    '/:id/getCatalog',
    controller.getMyCatalog
)

module.exports = router