const {Router} = require('express')
const router = Router()
const controller = require('../routes/projectController/projectController')

router.post(
    '/:id/create',
    controller.createProject
)

module.exports = router