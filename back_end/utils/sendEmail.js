import jwt from "jsonwebtoken";


export const generateLogToken = (user) => {
  return jwt.sign(
    {
      _id:user._id,
      name:user.name,
      email:user.email,
    },
    process.env.JWT_PASS || "****",
    {
      expiresIn: "10d",
    }
  );
};





// import nodemailer from 'nodemailer';

// const sendEmail = async (to, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// export default sendEmail;
