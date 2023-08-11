const Message = require('../../modals/Messenger')
const User = require('../../modals/User')

class messengerController {
    async createMessenger(req, res) {
        try {
            const { id } = req.params
            const value = req.body

            const findMe = await User.findById(id)
            const findProjectOwner = await User.findOne({_id: value.projectOwner})
            const findCopyMessage = await Message.findOne({ "projectOwnerObject.ownerID": value.projectOwner })

            const data = {
                yourObject: {
                    myID: findMe._id,
                    fname: findMe.fname,
                    lname: findMe.lname,
                    profilePic: findMe.more.pers.profilePic,
                    jobPost: findMe.more.job.post,
                },
                projectOwnerObject: {
                    ownerID: findProjectOwner._id,
                    fname: findProjectOwner.fname,
                    lname: findProjectOwner.lname,
                    profilePic: findProjectOwner.more.pers.profilePic,
                    jobPost: findProjectOwner.more.job.post,
                },
            }

            if (findCopyMessage && findCopyMessage.projectOwnerObject.ownerID === findProjectOwner._id.toString()) {
                return res.status(400).json({ message: 'Вы уже откликнулись' });
            }

            const newMessage = new Message(data)

            await newMessage.save()
            return res.status(200).json({ message: 'Done!', data: newMessage })
        } catch (e) {
            return res.status(500).json({message: e})
        }
    }

    async sendInvate(req, res) {
        try {
            const value = req.body
            const { id } = req.params
            const findMe = await User.findById(id)
            const findProjectOwner = await User.findOne({_id: value.projectOwnerObject._id})
            const findCopyMessage = await Message.findOne({ "projectOwnerObject.ownerID": value.projectOwnerObject._id })

            const data = {
                yourObject: {
                    myID: findMe._id,
                    fname: findMe.fname,
                    lname: findMe.lname,
                    profilePic: findMe.more.pers.profilePic,
                    jobPost: findMe.more.job.post,
                },
                projectOwnerObject: {
                    ownerID: value.projectOwnerObject._id,
                    fname: value.projectOwnerObject.fname,
                    lname: value.projectOwnerObject.lname,
                    profilePic: value.projectOwnerObject.more.pers.profilePic,
                    jobPost: value.projectOwnerObject.more.job.post,
                },
                message: [
                    {
                        authorID: id,
                        message: value.sendValue
                    }
                ]
            }

            if (findCopyMessage && findCopyMessage.projectOwnerObject.ownerID === findProjectOwner._id.toString()) {
                return res.status(400).json({ message: 'Вы уже откликнулись' });
            }
            
            const newMessage = new Message(data)

            await newMessage.save()

            return res.status(200).json({ message: 'Done!' })
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async getMyCatalog(req, res) {
        try {
            const { id } = req.params
            // МБ в будущем будут проблемы с 48 строкой
            const findObject = await Message.find({ "yourObject.myID": id })
            return res.status(200).json({findObject: findObject})
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params

            const update = await Message.findByIdAndDelete(id)
            return res.status(200).json({ message: "Пользователь удален",  update: update})
        } catch (e) {
            return res.status(500).json(e)
        }
    }
}

module.exports = new messengerController()