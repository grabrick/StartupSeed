const Project = require('../../modals/Project')

class projectController {
    async getProject(req, res) {
        try {
            const { id } = req.params

            const find = await Project.findById(id)
            return res.json(find)
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async createProject(req, res) {
        try {
            const { id } = req.params
            const { projectName, projectImage, projectDesc, projectPost, skills } = req.body
            const projectOwner = id

            const updatedProjectPost = projectPost.map((post) => ({
                // ...post,
                // skills: [...post.skills, ...skills],
                ...post,
                skills: [...skills]
            }));
            
            const project = new Project({
                projectName,
                projectImage,
                projectDesc,
                projectOwner,
                projectPost: updatedProjectPost,
            })

            await project.save()
            return res.status(201).send('Проект создан')
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }
}

module.exports = new projectController()