const User = require('../../modals/User')

class specialistController {
    async getCurrentUser(req, res) {
        try {
            const {id} = req.params

            const find = await User.findById(id)
            return res.json(find)
        } catch (e) {
            return res.status(500).json(e)
        }
    }
}

module.exports = new specialistController()