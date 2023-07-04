const {Router} = require('express')
const router = Router()
const controller = require('../routes/favoriteController/favoriteController')

router.put(
    '/:id/addProjectFavorites',
    controller.addProjectFavorite
)

router.put(
    '/:id/addUserFavorites',
    controller.addUserFavorite
)

module.exports = router