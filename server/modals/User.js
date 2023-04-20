const {Schema, model} = require('mongoose')

const schema = Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

module.exports = model('User', schema)