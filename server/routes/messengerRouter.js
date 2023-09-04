const {Router} = require('express')
const router = Router()
const controller = require('../routes/messengerController/messengerController')

router.post(
    '/:id/sendInvite',
    controller.sendInvite
)

router.post(
    '/:id/sendEmailInvite',
    controller.sendEmailInvite
)

module.exports = router