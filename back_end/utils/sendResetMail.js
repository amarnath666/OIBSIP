import nodemailer from 'nodemailer';

const sendResetMail = async (email, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD,
            },
        });

        // SEND EMAIL
        let info = await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: "One-Time Password (OTP)", // Fix typo here
            text: text, // Use the provided OTP text
        });
        console.log("Reset password email sent successfully");
    } catch (error) {
        console.error("Reset password email failed to send:", error);
    }
}

export default sendResetMail;
