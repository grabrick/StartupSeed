const {Router} = require('express')
const router = Router()
const controller = require('../routes/favoriteController/favoriteController')

router.get(
    '/:id/getFavorite',
    controller.getFavorite
)

router.post(
    '/:id/addProjectFavorites',
    controller.addProjectFavorite
)

router.post(
    '/:id/addUserFavorites',
    controller.addUserFavorite
)

router.put(
    '/:id/removeFavorites',
    controller.deleteProjectFavorite
)

router.put(
    '/:id/removeUserFavorites',
    controller.deleteUserFavorite
)

module.exports = router