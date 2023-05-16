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

// router.delete(
//     '/delete/:id',
//     controller.deleteUser
// )

// router.put(
//     '/change/email',
//     controller.changeEmail
// )

// router.put(
//     '/change/number',
//     controller.changeNumber
// )

router.get(
    '/get',
    controller.getPerson
)

router.put(
    '/upload',
    controller.uploadImage
)

router.put(
    '/edit/person',
    controller.editPerson
)
router.put(
    '/edit/prof',
    controller.editProf
)
router.put(
    '/edit/exp',
    controller.editExp
)
router.put(
    '/edit/edu',
    controller.editEdu
)
router.put(
    '/edit/qual',
    controller.editQual
)
router.put(
    '/edit/about',
    controller.editAbout
)

module.exports = router