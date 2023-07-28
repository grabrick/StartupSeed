const User = require('../../modals/User')

class favoriteController {
    async getFavorite(req, res) {
        try {
            const { id } = req.params
            const find = await User.findById(id)
            return res.json(find.favorites)
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async addUserFavorite(req, res) {
        try {
            const { id } = req.params
            const value = req.body;
            const userID = value.userID
            const user = await User.findById(id);
            const newUser = {
                userID: value.userID,
                fname: value.fname,
                lname: value.lname, 
                post: value.post, 
                postLevel: value.postLevel,
                isFavorite: true
            };

            const findCopyProject = user.favorites.users
            if (findCopyProject.userID !== userID) {
                user.favorites.users.push(newUser);
                await user.save();

                return res.status(200).json({ message: 'Done!' })
            } else {
                return res.status(400).json({ message: 'Проект уже добален' })
            }
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }

    async addProjectFavorite(req, res) {
        try {
            const { id } = req.params
            const value = req.body;
            const projectID = value.projectID
            const project = await User.findById(id);
            const newProject = {
                postID: value.postID,
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
            const postID = value.postID
            const updatedProject = await User.findOneAndUpdate(
                { _id: id },
                { $pull: { 'favorites.project': { postID: postID } } },
                { new: true }
            );

            if (updatedProject) {
                res.status(200).json({ message: 'Удалено успешно', deletedProject: updatedProject });
            } else {
                res.status(404).json({ message: 'Проект не найден' });
            }
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка сервера' });
        }
    }

    async deleteUserFavorite(req, res) {
        try {
            const { id } = req.params
            const value = req.body;
            const userID = value.userID
            const updatedUser = await User.findOneAndUpdate(
                { _id: id },
                { $pull: { 'favorites.users': { userID: userID } } },
                { new: true }
            );

            if (updatedUser) {
                res.status(200).json({ message: 'Удалено успешно', deletedProject: updatedUser });
            } else {
                res.status(404).json({ message: 'Проект не найден' });
            }
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка сервера' });
        }
    }
}

module.exports = new favoriteController()