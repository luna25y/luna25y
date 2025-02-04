const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001; // 后端服务运行的端口

app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  // 邮件发送逻辑
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // 你的邮箱地址
        pass: process.env.PASSWORD, // 你的邮箱密码或应用专用密码
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // 发件人地址
      to: process.env.EMAIL, // 收件人地址（即你的邮箱）
      subject: `New message from your website by ${email}`, // 邮件主题
      text: `You received a new message:\n\nFrom: ${email}\n\nMessage:\n${message}`, // 邮件正文
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
