import nodemailer from "nodemailer";

export const sendVerificationEmail = async (req, res) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transport.sendMail({
        from: `devripon.io <${process.env.MAIL_USER}>`,
        to: req.body.email,
        subject: "Verification Email",
        text: "This is a verification email",
    });
};
