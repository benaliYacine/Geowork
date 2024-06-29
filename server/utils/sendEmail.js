const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const textEmail = [
            "Thank you for registering on our platform. To complete your registration and access all the features of our service, please verify your email address by clicking on the link below:\n" +
                text +
                "\nSincerely,\nGeowork",
            text,
        ];

        switch (subject) {
            case "Verify Email":
                await transporter.sendMail({
                    from: process.env.USER,
                    to: email,
                    subject: subject,
                    text: textEmail[0],
                });
                break;
            case "Recuperation Password":
                await transporter.sendMail({
                    from: process.env.USER,
                    to: email,
                    subject: subject,
                    text: textEmail[1],
                });
                break;
            default:
                throw new Error("Invalid subject");
        }

        console.log("Email sent Successfully");
    } catch (error) {
        console.log("Email not sent", error);
        return error;
    }
};
