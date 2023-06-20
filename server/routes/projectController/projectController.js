const Project = require('../../modals/Project')

class projectController {
    async getProject(req, res) {
        try {
            const { id } = req.params
            const projectOwner = id
            const find = await Project.find({projectOwner})
            return res.json(find)
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async createProject(req, res) {
        try {
            const { id } = req.params
            const { projectName, projectImage, projectDesc, projectPost} = req.body
            const projectOwner = id

            const project = new Project({
                projectName,
                projectImage,
                projectDesc,
                projectOwner,
                projectPost,
            })

            await project.save()
            return res.status(201).send('Проект создан')
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }
}

module.exports = new projectController()