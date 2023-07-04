const {Router} = require('express')
const router = Router()
const controller = require('../routes/specialistController/specialistController')

router.get(
    '/get/currentUser/:id',
    controller.getCurrentUser
)

module.exports = router