const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const controller = require('../routes/authController/authController')

router.post(
    '/register',
    [
        check('email', 'некорректный email').isEmail(),
        check('password', 'минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    controller.register
)

router.post(
    '/login',
    [
        check('email', 'введите коректный email').normalizeEmail().isEmail(),
        check('password', 'введите пароль').exists()
    ],
    controller.login
)

router.put(
    '/:id/edit/password',
    controller.editPassword
)

router.put(
    '/:id/edit/number',
    controller.editNumber
)

router.put(
    '/:id/edit/utc',
    controller.editTimeZone
)

// DONE!
// router.get(
//     '/delete/:id',
//     controller.deleteUser
// )

router.get(
    '/:id/get',
    controller.getPerson
)

router.put(
    '/:id/upload',
    controller.uploadImage
)

router.put(
    '/:id/edit/person',
    controller.editPerson
)
router.put(
    '/:id/edit/prof',
    controller.editProf
)
router.put(
    '/:id/edit/exp',
    controller.editExp
)
router.put(
    '/:id/edit/edu',
    controller.editEdu
)
router.put(
    '/:id/edit/qual',
    controller.editQual
)
router.put(
    '/:id/edit/about',
    controller.editAbout
)

module.exports = router