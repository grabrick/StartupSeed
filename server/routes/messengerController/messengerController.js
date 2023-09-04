const Message = require('../../modals/Messenger')
const User = require('../../modals/User')
const email = require('@emailjs/nodejs');

class messengerController {
    async sendInvite(req, res) {
        try {
            const { id } = req.params
            const value = req.body
            const findMe = await User.findById(id)

            const data = {
                authorID: id,
                authorEmail: findMe.email,
                interlocutorID: value.interlocutor._id,
                interlocutorEmail: value.interlocutor.email,
                message: value.sendValue
            }

            if (data) {
                findMe.mySendInvite.push(data);
                await findMe.save();

                return res.status(200).json({ message: 'Done!' })
            } else {
                return res.status(400).json({ message: 'Проект уже добален' })
            }
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async sendEmailInvite(req, res) {
        try {
            // const { id } = req.params
            const value = req.body
            // const findMe = await User.findById(id)
            const fromHost = 'mail.my';
            const from = `Mail@${fromHost}`; // Придумайте свой адрес отправителя (может быть несуществующим)
            const to = `Кому отправить: ${value.interlocutor.interlocutorEmail}`.trim();

            // Создайте объект для отправки письма
            const message = email.message({
                from: from,
                to: to,
                subject: 'Заголовок письма'
            });

            // Добавьте HTML-содержимое письма
            message.html = `<h1>Security code: ${fromHost}</h1>`;

            // Создайте SMTP клиента для отправки письма
            const client = email.server.connect({
                user: 'startup-seed@mail.ru',
                password: 'yUEuo3LU^ri2',
                host: 'smtp.your-email-provider.com',
            });

            // Отправьте письмо
            client.send(message, (err, message) => {
                if (err) {
                    console.error('Ошибка при отправке:', err);
                    return res.status(500).json({ message: 'Ошибка при отправке письма' });
                } else {
                    console.log('Письмо отправлено');
                    return res.status(201).send('testing');
                }
            });
        } catch (e) {
            res.status(500).json({ message: e });
        }
    }
}

module.exports = new messengerController()