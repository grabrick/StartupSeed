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

router.post(
    '/:id/sendInvite',
    controller.sendInvate
)

router.delete(
    '/:id/deleteUser/:id',
    controller.deleteUser
)

module.exports = router