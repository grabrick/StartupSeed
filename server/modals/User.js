const { Schema, model } = require('mongoose')

const fileSchema = new Schema({
    name: String,
    data: Buffer,
    contentType: String
  });

const schema = Schema({
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    more: {
        pers: {
            fname: { type: String},
            lname: { type: String},
            gender: { type: String},
            country: { type: String},
            hb: { type: Date},
            сity: { type: String},
            profilePic: {type: String},
        },
        job: {
            post: { type: String},
            postLevel: { type: String},
            lang: { type: String},
            langLevel: { type: String},
            skills: { type: String},
        },
        exp: {
            jobPost: { type: String},
            company: { type: String},
            startJob: { type: Date},
            endJob: { type: Date},
            progress: { type: String},
        },
        edu: {
            specialization: { type: String},
            institution: { type: String},
            startEdu: { type: Date},
            endEdu: { type: Date},
        },
        qual: {
            qualName: { type: String},
            qualInstitution: { type: String},
            startQual: { type: Date},
            endQual: { type: Date},
        },
        about: {
            aboutMe: { type: String}
        }
    }
})

module.exports = model('User', schema)