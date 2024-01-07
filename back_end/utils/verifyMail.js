import nodemailer from 'nodemailer';

const verifyMail = async(email, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Send email
    let info = await transporter.sendMail({
      from: process.env.USER, // Sender email
      to: email, // Receiver
      subject: "One-Time Password (OTP)",
      text: text, // Use the provided OTP text
    });

    console.log("Mail sent successfully");
  } catch(error) {
    console.error("Mail failed to send:", error);
  }
};

export default verifyMail;
  