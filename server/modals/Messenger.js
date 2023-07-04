const { Schema, model } = require('mongoose')

const schema = Schema({
    yourID: {type: String},
    InterlocutorID: {type: String},
    content: [
        {
            _id: false,
            sendTime: {type: Date, default: Date.now},
            isEdit: {type: Boolean, default: false},
            message: {type: String},
            messageID: {type: String}
        }
    ],
})

module.exports = model('Messenger', schema)