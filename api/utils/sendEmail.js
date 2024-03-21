const nodemailer = require('nodemailer');//package pour send mail de virification
module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),//env yraja3 dima String zdna number bh yconverti String l number
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
        });
        //send mail;
        const textEmail=["Merci de vous être inscrit(e) sur notre plateforme. Afin de compléter votre inscription et d'accéder à toutes les fonctionnalités de notre service, nous vous prions de bien vouloir vérifier votre adresse e-mail en cliquant sur le lien ci-dessous :\n"+text+"\nCordialement,\nGeolans",text];
        switch (subject){
            case 'Verify Email':
                await transporter.sendMail({
                    from: process.env.USER,
                    to: email,
                    subject: subject,
                    text: textEmail[0]
                });
                case 'Recuperation Password':
                    await transporter.sendMail({
                        from: process.env.USER,
                        to: email,
                        subject: subject,
                        text: textEmail[1]
                    });
                break;
        }
        
        console.log('Email sent Successfully');

    } catch (error) {
        console.log('Email not sent');
        console.log(error);
    }
}