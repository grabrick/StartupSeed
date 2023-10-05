const { Schema, model } = require('mongoose')

const schema = Schema({
    respond: {
        position: {
            jobPost: { type: String },
            jobTask: { type: String },
            postLevel: { type: String },
            skills: [
                { type: String },
            ],
        },
        respondMessage: { type: String },
        sendTime: { type: Date, default: Date.now() }
    },
    users: {
        author: {
            authorID: { type: Schema.Types.ObjectId },
            fname: { type: String },
            lname: { type: String },
            post: { type: String },
            profilePic: { type: String },
        },
        interlocutor: {
            interlocutorID: { type: Schema.Types.ObjectId },
            fname: { type: String },
            lname: { type: String },
            post: { type: String },
            profilePic: { type: String },
        }

    }
})

module.exports = model('Chat', schema)