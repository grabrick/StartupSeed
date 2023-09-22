const {Router} = require('express')
const router = Router()
const controller = require('../routes/adminController/adminController')

router.get(
    '/:id/getNotVerefyUser',
    controller.getNotVerefyUser
)

router.get(
    '/:id/getVerefyUser',
    controller.getVerefyUser
)

router.get(
    '/:id/getVerefyProject',
    controller.getVerifyProject
)

router.get(
    '/:id/getNotVerefyProject',
    controller.getNotVerifyProject
)

module.exports = router