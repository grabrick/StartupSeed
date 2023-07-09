const {Router} = require('express')
const router = Router()
const controller = require('../routes/favoriteController/favoriteController')

router.post(
    '/:id/addProjectFavorites',
    controller.addProjectFavorite
)

router.put(
    '/:id/addUserFavorites',
    controller.addUserFavorite
)

router.delete(
    '/:id/removeFavorites',
    controller.deleteProjectFavorite
)

module.exports = router