const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    const { to, subject, text } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    try {
      await transporter.sendMail(mailOptions);
      return {
        statusCode: 200,
        body: "Email sent successfully!",
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error sending email: ${error.message}`,
      };
    }
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
};
