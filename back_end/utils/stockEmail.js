import nodemailer from 'nodemailer';

// Function to create and return a nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });
};

// Function to send a low stock alert email
const sendLowStockEmail = async () => {
  return new Promise(async (resolve, reject) => {
    const transporter = createTransporter();  // Create a nodemailer transporter

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'Low Stock Alert',
      text: 'Some inventory items are below 20. Check the admin dashboard for details.',
    };

    try {
      await transporter.sendMail(mailOptions);
      resolve(); // Resolve the promise after sending email successfully
    } catch (error) {
      console.error('Error sending email:', error);
      reject(error); 
    }
  });
};

export default sendLowStockEmail;
