const Chat = require('../../modals/Chat')
const User = require('../../modals/User')
const Message = require('../../modals/Messege')


class messengerController {
    async sendRespond(req, res) {
        try {
            const { id } = req.params
            const value = req.body
            const findAuthor = await User.findById(id)
            const findInterlocator = await User.findById(value.interlocutorID)
            const findCopyChat = await Chat.find({ 'users.interlocutor.interlocutorID': value.interlocutorID })

            const data = {
                respond: {
                    position: {
                        jobPost: value.jobPost,
                        jobTask: value.jobTask,
                        postLevel: value.postLevel,
                        skills: value.skills,
                    },
                    respondMessage: value.respondMessage,
                    sendTime: value.sendTime,
                },
                users: {
                    author: {
                        authorID: id,
                        fname: findAuthor.fname,
                        lname: findAuthor.lname,
                        post: findAuthor.more.job.post ? findAuthor.more.job.post : null,
                        profilePic: findAuthor.more.pers.profilePic ? findAuthor.more.pers.profilePic : null,
                        isAdmin: findAuthor.isAdmin === true ? true : false
                    },
                    interlocutor: {
                        interlocutorID: value.interlocutorID,
                        fname: findInterlocator.fname,
                        lname: findInterlocator.lname,
                        post: findInterlocator.more.job.post ? findInterlocator.more.job.post : null,
                        profilePic: findInterlocator.more.pers.profilePic ? findInterlocator.more.pers.profilePic : null,
                        isAdmin: findInterlocator.isAdmin === true ? true : false
                    }
                }
            }

            if (findCopyChat.length === 0) {
                const update = new Chat(data)
                await update.save()

                return res.status(200).json({ message: 'Done!' })
            } else {
                return res.status(400).json({ message: 'Проект уже добален' })
            }
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async fetchCatalog(req, res) {
        const { id } = req.params;

        try {
            const findAuthorIDChats = await Chat.find({ 'users.author.authorID': id });

            const findInterlocutorIDChats = await Chat.find({ 'users.interlocutor.interlocutorID': id });

            const allChats = [...findAuthorIDChats, ...findInterlocutorIDChats];

            if (allChats.length > 0) {
                return res.json(allChats);
            } else {
                // Чаты не найдены
                return res.status(404).json({ message: 'Чаты не найдены' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Произошла ошибка сервера' });
        }
    }

    async setIsOpenChat(req, res) {
        try {
            const value = req.body
            // console.log(value.id);
            const findObject = await Chat.findById(value.id)
            if (findObject.isOpen === true) {
                const update = await Chat.findByIdAndUpdate(
                    value.id,
                    {"isOpen": false},
                    {new: true}
                )
                return res.status(200).json(update)
            } else {
                const update = await Chat.findByIdAndUpdate(
                    value.id,
                    {"isOpen": true},
                    {new: true}
                )
                return res.status(200).json(update)
            }
            
        } catch(e) {
            return res.status(500).json({ message: 'Произошла ошибка сервера' });
        }
    }

    async sendMessage(req, res) {
        try {
            const { id } = req.params;
            const value = req.body
            const data = {
                authorID: id,
                chatID: value.chatID,
                message: {
                    msg: value.msg,
                    sendTime: value.sendTime,
                },
            }
            // console.log(data);
            const update = new Message(data)
            await update.save()
            return res.status(200).json({ message: '' })
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка сервера' });
        }
    }

    async getChatMesseges(req, res) {
        try {
            const update = await Message.find()

            res.status(200).json(update)
        } catch (e) {
            return res.status(500).json({ message: 'Произошла ошибка сервера' });
        }
    }
}

module.exports = new messengerController()