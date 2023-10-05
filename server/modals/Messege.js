const { Schema, model } = require('mongoose')

const schema = Schema({
    authorID: { type: Schema.Types.ObjectId },
    chatID: { type: Schema.Types.ObjectId, ref: 'Chat'},
    message: {
        msg: { type: String },
        sendTime: { type: String },
    },
})

module.exports = model('Messege', schema)