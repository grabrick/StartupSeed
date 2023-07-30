const {Router} = require('express')
const router = Router()
const controller = require('../routes/projectController/projectController')
const multer = require('multer');

const fileStorage = multer({
    storage: multer.diskStorage({
      destination: 'uploads',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
});

router.get(
    '/:id/project',
    controller.getProject
)

router.get(
    '/get/currentProject/:id',
    controller.getCurrentProject
)

router.delete(
    '/profile/project/:id/delete',
    controller.deleteProject
)

router.put(
    '/:id/projectImage/upload',
    fileStorage.single('upload'),
    controller.uploadImage
)

router.put(
    '/:id/project/:id/preCreate',
    controller.preCreateProject
)

router.post(
    '/:id/project/create',
    fileStorage.single('upload'),
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