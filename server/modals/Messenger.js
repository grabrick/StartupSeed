const { Schema, model } = require('mongoose')

const schema = Schema({ 
    yourObject: {
        myID: { type: String },
        fname: { type: String },
        lname: { type: String },
        profilePic: { type: String },
        jobPost: { type: String },
    },
    projectOwnerObject: {
        ownerID: { type: String },
        fname: { type: String },
        lname: { type: String },
        profilePic: { type: String },
        jobPost: { type: String },
    },
    inviteMessage: {
        authorID: { type: String },
        interlocutorID: { type: String },
        sendTime: { type: Date },
        message: { type: Object },
    },
    message: [
        {
            authorID: { type: String },
            interlocutorID: { type: String },
            sendTime: { type: Date, default: Date.now() },
            message: { type: Object },
            isEdit: { type: Boolean, default: false },
            isRead: { type: Boolean, default: false },
            
        }
    ],
})

module.exports = model('Messenger', schema)