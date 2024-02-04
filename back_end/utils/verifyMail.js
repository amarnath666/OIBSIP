import nodemailer from 'nodemailer';

// Function to send a verification email with a one-time password (OTP)
const verifyMail = async(email, text) => {
  try {
     // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    // Send email
    let info = await transporter.sendMail({
      from: process.env.ADMIN_EMAIL, // Sender email
      to: email, // Receiver
      subject: "One-Time Password (OTP)",
      text: text, // Use the provided OTP text
    });
  } catch(error) {
    console.error("Mail failed to send:", error);
  }
};

export default verifyMail;
  