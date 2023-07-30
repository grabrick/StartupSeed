const Project = require('../../modals/Project')

class projectController {
    async getProject(req, res) {
        try {
            const { id } = req.params
            const projectOwner = id
            const find = await Project.find({projectOwner})
            return res.status(200).json(find)
        } catch (e) {
            return res.status(500).json(e)
        }
    }
    
    async getCurrentProject(req, res) {
        try {
            const { id } = req.params
            const find = await Project.findById(id)
            return res.status(200).json(find)
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async deleteProject(req, res) {
        try {
            const { id } = req.params
            const find = await Project.findByIdAndDelete(id)

            return res.status(200).json(find)
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async getUsersProject(req, res) {
        try {
            const { id } = req.params;
            const projectOwner = id
            const perPage = parseInt(req.query.perPage) || 10; // Значение по умолчанию: 10
            const page = parseInt(req.query.page) || 1; // Значение по умолчанию: 1
        
            const skip = (page - 1) * perPage;
        
            const count = await Project.countDocuments({_id: { $ne: id }});
            const totalPages = Math.ceil(count / perPage);
        
            const find = await Project.find({projectOwner: { $ne: projectOwner }}).skip(skip).limit(perPage);
        
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

    async uploadImage(req, res) {
        try {
          const { id } = req.params;
          console.log(req.file.path);
        //   if (!req.file) {
        //     return res.status(400).json({ error: 'Файл не был загружен.' });
        //   }

        //   const project = await Project.findById(id);
        // //   const prevProfilePic
    
        //   const update = await Project.findByIdAndUpdate(
        //     id,
        //     { 'projectImage': req.file.path }, // Путь к файлу сохраняется в поле 'path' объекта req.file
        //     { new: true }
        //   );

        //   if (prevProfilePic) {
        //     fs.unlink(prevProfilePic, (err) => {
        //       if (err) {
        //         console.error('Ошибка при удалении предыдущей картинки:', err);
        //       } else {
        //         console.log('Предыдущая картинка успешно удалена.');
        //       }
        //     });
        //   }
    
        //   return res.json(update);
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }

    async createProject(req, res) {
        try {
            const { id } = req.params;
            const projectImage = req.file.path;
            const { projectName, projectDesc, projectPost } = req.body;
            const projectOwner = id;
        
            const project = new Project({
              projectName,
              projectImage,
              projectDesc,
              projectOwner,
              projectPost,
            });
        
            await project.save();
            return res.status(201).json(project);
          } catch (e) {
            return res.status(500).json({ message: e });
          }
    }

    async preCreateProject(req, res) {
        try {
            const { id } = req.params
            const { projectName, projectDesc, projectPost} = req.body

            const update = await Project.findByIdAndUpdate(
                id,
                {
                    "projectName": projectName,
                    "projectDesc": projectDesc,
                    "projectPost": projectPost,
                    
                },
                {new: true}
            )
            return res.status(201).json(update)
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }

    async editProject(req, res) {
        try {
            const { id } = req.params
            const { projectName, projectImage, projectDesc, projectPost} = req.body
            const update = await Project.findByIdAndUpdate(
                id,
                {
                    "projectName": projectName,
                    "projectImage": projectImage,
                    "projectDesc": projectDesc,
                    "projectPost": projectPost,
                    
                },
                {new: true}
            )
            return res.json(update)
            // return res.send('123')
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }
}

module.exports = new projectController()