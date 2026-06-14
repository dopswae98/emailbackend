const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const name = req.body.name || "No name provided";
    const email = req.body.email || "No email provided";
    const subject = req.body.subject || "No subject provided";
    const message = req.body.message || "No message provided";

    const mailOptions = {
      from: `"Swift & Gentle Website" <${process.env.EMAIL_USER}>`,
      to: "ephraimmatarutse@gmail.com",
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
<div style="
  font-family:'Poppins','Cascadia Code','Segoe UI',Arial,sans-serif;
  background:#f4f7f6;
  padding:30px;
  font-size:18px;
  line-height:1.8;
">
  <div style="
    max-width:700px;
    margin:auto;
    background:white;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 4px 20px rgba(0,0,0,0.1);
  ">

    <div style="
      background:#0f5132;
      color:white;
      padding:25px;
    ">
      <h1 style="
        margin:0;
        font-size:30px;
        font-weight:700;
      ">
        Swift & Gentle Moving + Storage
      </h1>

      <p style="
        margin-top:10px;
        font-size:18px;
      ">
        New Contact Form Submission
      </p>
    </div>

    <div style="padding:30px;">

      <p style="font-size:18px;">
        <strong style="color:#0f5132;">Name:</strong>
        ${name}
      </p>

      <p style="font-size:18px;">
        <strong style="color:#0f5132;">Email:</strong>
        ${email}
      </p>

      <p style="font-size:18px;">
        <strong style="color:#0f5132;">Subject:</strong>
        ${subject}
      </p>

      <div style="
        margin-top:25px;
        background:#eef8f2;
        padding:25px;
        border-left:6px solid #0f5132;
        border-radius:8px;
      ">
        <h3 style="
          margin-top:0;
          color:#0f5132;
          font-size:22px;
        ">
          Message
        </h3>

        <p style="
          font-family:'Cascadia Code',monospace;
          font-size:18px;
          white-space:pre-wrap;
          color:#222;
        ">
${message}
        </p>
      </div>

    </div>
  </div>
</div>
`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// app.get("/send-email", (req, res) => {
//   const email = req.body.email;
//   const subject = req.body.subject;
//   const message = req.body.message;
//   // console.log("body", body);
//   console.log(req.body.email);
//   res.send(email);
  //   const email = "ephraimmatarutse@gmail.com";
  //   const subject = "req.body.subject";
  //   const message = "req.body.message";

  //   const mailOptions = {
  //     from: "kingpingx88@gmail.com",
  //     to: email,
  //     subject: subject,
  //     text: message,
  //   };

  //   transporter.sendMail(mailOptions, (err, info) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send("Error sending email", err.message);
  //     } else {
  //       res.send("Email sent successfully!");
  //     }
  //   });
// });
  

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port $4000!");
});

app.get("/api/data", (req, res) => {
  const data = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 40 },
  ];
  res.json(data);
});