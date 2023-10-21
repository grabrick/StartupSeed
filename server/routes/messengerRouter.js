const {Router} = require('express')
const router = Router()
const controller = require('../routes/messengerController/messengerController')

router.post(
    '/:id/sendRespond',
    controller.sendRespond
)

router.get(
    '/:id/fetchCatalog',
    controller.fetchCatalog
)

router.post(
    '/:id/sendNewMessage',
    controller.sendMessage
)

router.get(
    '/getMessage',
    controller.getChatMesseges
)

router.put(
    '/setIsOpen',
    controller.setIsOpenChat
)

module.exports = router