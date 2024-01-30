import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });
};

const sendLowStockEmail = async () => {
  return new Promise(async (resolve, reject) => {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'Low Stock Alert',
      text: 'Some inventory items are below 20. Check the admin dashboard for details.',
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      resolve(); // Resolve the promise after sending email successfully
    } catch (error) {
      console.error('Error sending email:', error);
      reject(error); // Reject the promise if there is an error
    }
  });
};

export default sendLowStockEmail;
