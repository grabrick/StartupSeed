const User = require('../../modals/User')
const Project = require('../../modals/Project')

class adminController {
    async getNotVerefyUser(req, res) {
        try {
            const { id } = req.params;
            const isVerification = true
            const perPage = parseInt(req.query.perPage) || 10; // Значение по умолчанию: 10
            const page = parseInt(req.query.page) || 1; // Значение по умолчанию: 1

            const skip = (page - 1) * perPage;

            const count = await User.countDocuments({ _id: { $ne: id } });
            const totalPages = Math.ceil(count / perPage);

            const find = await User.find({ _id: { $ne: id }, isAdmin: false, isVerification: { $ne: isVerification } }).skip(skip).limit(perPage);

            return res.json({
                data: find,
                totalPages: totalPages,
                currentPage: page,
                perPage: perPage
            });
        } catch (e) {
            return res.status(500).json(e);
        }
    }
    async getVerefyUser(req, res) {
        try {
            const { id } = req.params;
            const isVerification = false
            const perPage = parseInt(req.query.perPage) || 10; // Значение по умолчанию: 10
            const page = parseInt(req.query.page) || 1; // Значение по умолчанию: 1

            const skip = (page - 1) * perPage;

            const count = await User.countDocuments({ _id: { $ne: id } });
            const totalPages = Math.ceil(count / perPage);

            const find = await User.find({ _id: { $ne: id }, isAdmin: false, isVerification: { $ne: isVerification } }).skip(skip).limit(perPage);

            return res.json({
                data: find,
                totalPages: totalPages,
                currentPage: page,
                perPage: perPage
            });
        } catch (e) {
            return res.status(500).json(e);
        }
    }
    async getVerifyProject(req, res) {
        const { id } = req.params;
        const isVerification = false

        const perPage = parseInt(req.query.perPage) || 10;
        const page = parseInt(req.query.page) || 1;

        const skip = (page - 1) * perPage;

        const count = await Project.countDocuments({ _id: { $ne: id } });
        const totalPages = Math.ceil(count / perPage);

        const find = await Project.find({ _id: { $ne: id }, isVerification: { $ne: isVerification } }).skip(skip).limit(perPage);

        return res.json({
            data: find,
            totalPages: totalPages,
            currentPage: page,
            perPage: perPage
        });
    }
    async getNotVerifyProject(req, res) {
        const { id } = req.params;
        const isVerification = true

        const perPage = parseInt(req.query.perPage) || 10;
        const page = parseInt(req.query.page) || 1;

        const skip = (page - 1) * perPage;

        const count = await Project.countDocuments({ _id: { $ne: id } });
        const totalPages = Math.ceil(count / perPage);

        const find = await Project.find({ _id: { $ne: id }, isVerification: { $ne: isVerification } }).skip(skip).limit(perPage);

        return res.json({
            data: find,
            totalPages: totalPages,
            currentPage: page,
            perPage: perPage
        });
    }
}

module.exports = new adminController()