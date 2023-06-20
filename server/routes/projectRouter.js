const {Router} = require('express')
const router = Router()
const controller = require('../routes/projectController/projectController')

router.get(
    '/:id/project',
    controller.getProject
)

router.post(
    '/:id/create',
    controller.createProject
)

module.exports = router