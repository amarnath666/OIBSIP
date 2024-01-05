import nodemailer from 'nodemailer';

const verifyMail = async(email, link) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
  
      //send email
      let info = await transporter.sendMail({
        from: process.env.USER,//sender email
        to: email,//receiver
        subject: "Account Verification",
        text: "Welcome",
        html:`
        <div>
        <a href=${link}>Click here to activate your account</a>
        </div>
        `
      });
      console.log("mail send successfully");
    } catch(error) 
    {
      console.log(error, "mail failed to send")
    }
  };
  
  export default verifyMail;
  