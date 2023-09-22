const nodemailer = require('nodemailer');
const User = require('../../modals/User')
const directTransport = require('nodemailer-direct-transport');
const Project = require('../../modals/Project');
const code = Math.floor(1000 + Math.random() * 9000);

class verifyController {
    async sentCode(req, res) {
        try {
            const { email } = req.body
            const fromHost = `mail.my`;
            const from = `Mail@${fromHost}`; //придумываете свою почту(может быть несуществующая)
            const to = (`Кому отправить: ${email} `).trim();
            const transport = nodemailer.createTransport(directTransport({
                name: fromHost
            }));

            transport.sendMail({
                from, to,
                subject: 'Заголовок письма',
                html: `
                    <h1>Security code: ${code}</h1>
                `
            }, (err, data) => {
                if (err) {
                    console.error('Ошибка при отправке:', err)
                } else {
                    console.log('Письмо отправлено')
                }
            })
            return res.status(201).send('testing')
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }

    async changeEmail(req, res) {
        try {
            const { inputCode, email } = req.body
            const { id } = req.params
            const convertInputCode = parseInt(inputCode)

            if (convertInputCode !== code) {
                return res.status(400).json("The code doesn't match")
            }

            const update = await User.findByIdAndUpdate(
                id,
                {
                    "email": email,
                },
                { new: true }
            )

            return res.status(200).json(update)
        } catch (e) {
            res.status(500).json({ message: "Этот email уже занят" })
        }
    }

    async changeVerification(req, res) {
        try {
            const value = req.body
            if (value.config === 'access') {
                const update = await User.findByIdAndUpdate(
                    value.userID,
                    {
                        "isVerification": true
                    },
                    { new: true }
                )
                return res.status(200).json(update)
            } else {
                const update = await User.findByIdAndUpdate(
                    value.userID,
                    {
                        "isVerification": false
                    },
                    { new: true }
                )
                return res.status(200).json(update)
            }
        } catch (e) {
            res.status(500).json({ message: "Ошиибка верефикации" })
        }
    }

    async changeProjectVerification(req, res) {
        try {
            const value = req.body
            if (value.config === 'access') {
                const update = await Project.findByIdAndUpdate(
                    value.userID,
                    {
                        "isVerification": true
                    },
                    { new: true }
                )
                return res.status(200).json(update)
            } else {
                const update = await Project.findByIdAndUpdate(
                    value.userID,
                    {
                        "isVerification": false
                    },
                    { new: true }
                )
                return res.status(200).json(update)
            }
        } catch (e) {
            res.status(500).json({ message: "Ошиибка верефикации" })
        }
    }
}

module.exports = new verifyController()