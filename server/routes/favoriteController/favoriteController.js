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

    // async addProjectFavorite(req, res) {
    //     try {
    //         const { id } = req.params
    //         const value = req.body;
    //         const projectID = value.projectID
    //         const update = await User.findByIdAndUpdate(
    //             id,
    //             {
    //                 "favorites.project": value
    //             },
    //             { new: true }
    //         )

    //         if (value.isFavorite === false) {
    //             const deleter = await User.findByIdAndRemove(projectID)
    //             // findByIdAndRemove(projectID)
    //             return console.log(deleter);
    //             // return res.json(deleter)
    //         }

    //         return res.status(200).json(update)
    //     } catch (e) {
    //         return res.status(500).json({ message: e })
    //     }
    // }

    // async addProjectFavorite(req, res) {
    //     try {
    //         const { id } = req.params
    //         const value = req.body;
    //         const projectID = value.projectID
    //         const update = await User.findByIdAndUpdate(
    //             id,
    //             {
    //                 "favorites.project": value
    //             },
    //             { new: true }
    //         )

    //         return res.status(200).json(update)
    //     } catch (e) {
    //         return res.status(500).json({ message: e })
    //     }
    // }

    async addProjectFavorite(req, res) {
        try {
            const { id } = req.params
            const value = req.body;
            const projectID = value.projectID
            const project = await User.findById(id);
            const newProject = {
                projectID: projectID,
                projectName: value.projectName,
                jobPost: value.jobPost,
                postLevel: value.postLevel,
                profilePic: value.profilePic,
                isFavorite: true
            };

            // if(project.favorites.project.projectID)
            // const findCopyProject = project.favorites.project.find(items => items)
            const findCopyProject = project.favorites.project
            if (findCopyProject.projectID !== projectID) {
                project.favorites.project.push(newProject);
                await project.save();

                return res.status(200).json({ message: 'Done!' })
            } else {
                return res.status(400).json({ message: 'Проект уже добален' })
            }
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }

    async deleteProjectFavorite(req, res) {
        try {
            const { id } = req.params
            const value = req.body;
            const projectID = value.projectID
            // const currentProject = await User.findById(id);

            // Находим объекты, где isFavorite равно false по пути favorites.project
            // const projects = await User.find({ 'favorites.project.projectID': projectID });
            // const projects = currentProject.favorites.project

            // Удаляем каждый объект, удовлетворяющий условию
            const projects = await User.find({ 'favorites.project.isFavorite': true });

            // Удаляем каждый объект, удовлетворяющий условию
            const deletedProjects = [];
            for (const project of projects) {
                const index = project.favorites.project.findIndex(p => p.isFavorite === true);
                if (index !== -1) {
                    project.favorites.project.splice(index, 1);
                    const deletedProject = await project.save();
                    deletedProjects.push(deletedProject);
                }
            }

            res.status(200).json({ message: 'Удалено успешно', deletedProjects });
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка сервера' });
        }
    }
}

module.exports = new favoriteController()