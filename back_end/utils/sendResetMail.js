import nodemailer from 'nodemailer';

const sendResetMail = async (email, link) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        //SEND EMAIL
        let info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Reset Password",

            text: "Rest your password",
            html: `<div><a href=${link}>Click here to reset your password</a></div>`,
        });
        console.log("Reset password email sent successfully");
    }catch(error) {
        console.error("Reset password email failed to send:", error);
    }
 }

 export default sendResetMail;