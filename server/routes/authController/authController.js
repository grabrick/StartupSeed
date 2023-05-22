const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../modals/User')


const createToken = (id) => {
    return jwt.sign({ id }, "secret_govno", {
        expiresIn: '1h'
    })
}

class authController {
    async register(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const { fname, lname, email, password } = req.body

            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже есть' })
            }


            const hash = await bcrypt.hash(password, 4);
            const date = {
                fname, lname, email, password: hash,
                more: {}
            }
            const user = new User(date)

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }

    async login(req, res) {
        const { email, password } = req.body
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const user = await User.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } }).exec()

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.status(400).json({ message: 'Неверный пароль' })
            }

            const token = createToken(user._id)

            res.json({ token })
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }

    async editPassword(req, res) {
        try {
            const { hashPassword, oldPassword, newPassword, repeatNewPassword } = req.body

            const passwordMatch = await bcrypt.compare(oldPassword, hashPassword);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Старый пароль неверен' });
            }

            if (newPassword !== repeatNewPassword) {
                return res.status(401).json({ message: "Новый пароль не подходит с повторным" })
            }

            const hashNewPassword = await bcrypt.hash(newPassword, 4);

            const update = await User.findOneAndUpdate(
                {}, 
                {
                    "password": hashNewPassword,
                }, 
                {new: true}
            )
            return res.status(200).json(update);
            // return res.status(200).send("dede")
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }

    async editNumber(req, res) {
        const { number, currentPhone } = req.body

        if (number === currentPhone) {
            return res.status(400).json({ message: "Пароль не совпадает" })
        }
        try {
            const update = await User.findOneAndUpdate(
                {},
                {
                    "phoneNumber": number,
                },
                { new: true }
            )
            return res.json(update);
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }

    async editTimeZone(req, res) {
        const { timeZone } = req.body
        try {
            const update = await User.findOneAndUpdate(
                {},
                {
                    "timeZone": timeZone,
                },
                { new: true }
            )
            return res.json(update);
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }

    // DONE!
    // async deleteUser(req, res) {
    //     try {
    //         const {id} = req.params

    //         if(!id) {
    //             return res.status(400).json({message: "ID not found"})
    //         }

    //         const findId = await User.findById(id)
    //         return res.json(findId)
    //         // const deleteElement = await User.findByIdAndDelete(id)
    //         // return res.json(deleteElement)
    //     } catch (e) {
    //         res.status(500).json(e)
    //     }   
    // }

    // async changeEmail(req, res) {
    //     try {
    //         const {id} = req.params

    //         if(!id) {
    //             return res.status(400).json({message: "ID not found"})
    //         }

    //         // const findId = await Tweet.findById(id)
    //         const deleteElement = await User.findByIdAndDelete(id)
    //         return res.json(deleteElement)
    //     } catch (e) {
    //         res.status(500).json(e)
    //     }   
    // }

    // Form controllers //

    async getPerson(req, res) {
        try {
            const find = await User.findOne({})
            return res.json(find)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async uploadImage(req, res) {
        try {
            const { profilePic } = req.body;
            const update = await User.findOneAndUpdate(
                {},
                {
                    "more.pers.profilePic": profilePic,
                },
                { new: true }
            )

            // const updatedUser = await update.save();
            return res.json(update);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async editPerson(req, res) {
        try {
            const { fname, lname, gender, country, hb, city } = req.body;

            const update = await User.findOneAndUpdate(
                {},
                {
                    "fname": fname,
                    "lname": lname,
                    "more.pers.gender": gender,
                    "more.pers.country": country,
                    "more.pers.hb": hb,
                    "more.pers.city": city,
                },
                { new: true }
            )

            return res.json(update);
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }
    async editProf(req, res) {
        try {
            const { post, postLevel, lang, langLevel, skills, } = req.body

            const update = await User.findOneAndUpdate(
                {},
                {
                    "more.job.post": post,
                    "more.job.postLevel": postLevel,
                    "more.job.lang": lang,
                    "more.job.langLevel": langLevel,
                    "more.job.skills": skills,
                },
                { new: true }
            )
            return res.json(update)
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }
    async editExp(req, res) {
        try {
            const { jobPost, company, startJob, endJob, progress, } = req.body

            const update = await User.findOneAndUpdate(
                {},
                {
                    "more.exp.jobPost": jobPost,
                    "more.exp.company": company,
                    "more.exp.startJob": startJob,
                    "more.exp.endJob": endJob,
                    "more.exp.progress": progress,
                },
                { new: true }
            )
            return res.json(update)
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }
    async editEdu(req, res) {
        try {
            const { specialization, institution, startEdu, endEdu } = req.body

            const update = await User.findOneAndUpdate(
                {},
                {
                    "more.edu.specialization": specialization,
                    "more.edu.institution": institution,
                    "more.edu.startEdu": startEdu,
                    "more.edu.endEdu": endEdu,
                },
                { new: true }
            )
            return res.json(update)
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }
    async editQual(req, res) {
        try {
            const { qualName, qualInstitution, startQual, endQual } = req.body

            const update = await User.findOneAndUpdate(
                {},
                {
                    "more.qual.qualName": qualName,
                    "more.qual.qualInstitution": qualInstitution,
                    "more.qual.startQual": startQual,
                    "more.qual.endQual": endQual,
                },
                { new: true }
            )
            return res.json(update)
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }
    async editAbout(req, res) {
        try {
            const { aboutMe } = req.body

            const update = await User.findOneAndUpdate(
                {},
                {
                    "more.about.aboutMe": aboutMe,
                },
                { new: true }
            )
            return res.json(update)
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }
}

module.exports = new authController()