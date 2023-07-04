const User = require('../../modals/User')

class favoriteController {
    async getFavorite(req, res) {
        try {
            const { id } = req.params
            const find = await User.findById(id)
            return res.json(find)
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async addUserFavorite(req, res) {
        try {
            const { id } = req.params
            const value = req.body;
            const update = await User.findByIdAndUpdate(
                id,
                {
                    "favorites.users": value
                },
                { new: true }
            )
            return res.status(200).json(update)
            // return res.send("dewfw")
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }

    async addProjectFavorite(req, res) {
        try {
            const { id } = req.params
            const value = req.body;
            const update = await User.findByIdAndUpdate(
                id,
                {
                    "favorites.project": value
                },
                { new: true }
            )
            return res.status(200).json(update)
            // return res.send("dewfw")
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }

}

module.exports = new favoriteController()