import nodemailer from 'nodemailer';

const sendResetMail = async (email, text) => {
    try {
        // Create a nodemailer transporter using Gmail service
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD,
            },
        });

        // Compose and send the email
        let info = await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: "One-Time Password (OTP)", 
            text: text,
        });
    } catch (error) {
        console.error("Reset password email failed to send:", error);
    }
}

export default sendResetMail;
