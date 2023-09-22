const {Router} = require('express')
const router = Router()
const controller = require('../routes/verifyController/verifyController')

router.post(
    '/verify',
    controller.sentCode
)

router.put(
    '/:id/change',
    controller.changeEmail
)

router.put(
    '/:id/changeVerefy',
    controller.changeVerification
)

router.put(
    '/:id/changeProjectVerefy',
    controller.changeProjectVerification
)

module.exports = router