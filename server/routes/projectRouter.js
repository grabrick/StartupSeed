const {Router} = require('express')
const router = Router()
const controller = require('../routes/projectController/projectController')

router.get(
    '/:id/project',
    controller.getProject
)

router.post(
    '/:id/project/create',
    controller.createProject
)

router.put(
    '/:id/project/edit',
    controller.editProject
)

router.get(
    '/:id/users/project',
    controller.getUsersProject
)

module.exports = router