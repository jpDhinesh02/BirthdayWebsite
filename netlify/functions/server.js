const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jpdhinesh2002@gmail.com",
      pass: "hffi ddmx udjj hfeu",
    },
  });
  const mailOptions = {
    from: "jpdhinesh2002@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email", error });
    }
    res.status(200).json({ message: "Email sent", info });
  });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
