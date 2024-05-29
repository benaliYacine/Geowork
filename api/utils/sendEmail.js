const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const textEmail = [
            "Merci de vous être inscrit(e) sur notre plateforme. Afin de compléter votre inscription et d'accéder à toutes les fonctionnalités de notre service, nous vous prions de bien vouloir vérifier votre adresse e-mail en cliquant sur le lien ci-dessous :\n" + text + "\nCordialement,\nGeowork",
            text
        ];

        switch (subject) {
            case 'Verify Email':
                await transporter.sendMail({
                    from: process.env.USER,
                    to: email,
                    subject: subject,
                    text: textEmail[0]
                });
                break;
            case 'Recuperation Password':
                await transporter.sendMail({
                    from: process.env.USER,
                    to: email,
                    subject: subject,
                    text: textEmail[1]
                });
                break;
            default:
                throw new Error('Invalid subject');
        }

        console.log('Email sent Successfully');

    } catch (error) {
        console.log('Email not sent', error);
        return error;
    }
};
