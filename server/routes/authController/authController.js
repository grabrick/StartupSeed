const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../modals/User')


const createToken = (id) => {
    return jwt.sign({id}, "secret_govno", {
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
            const user = new User({fname, lname, email, password: hash})

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })
        } catch (e) {
            res.status(500).json({ message: 'error???? pizda' })
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })
            if(!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                res.status(400).json({ message: 'Неверный пароль' })
            }

            const token = createToken(user._id)

            res.json({token})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }

}

module.exports = new authController()