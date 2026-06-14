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
        <div style="font-family: Arial, sans-serif; background:#f4f7f6; padding:20px;">
          <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden;">
            <div style="background:#0f5132; color:white; padding:18px;">
              <h2 style="margin:0;">Swift & Gentle Moving + Storage</h2>
              <p style="margin:5px 0 0;">New Website Contact Form Submission</p>
            </div>

            <div style="padding:20px; color:#222;">
              <p><strong style="color:#0f5132;">Name:</strong> ${name}</p>
              <p><strong style="color:#0f5132;">Sender Email:</strong> ${email}</p>
              <p><strong style="color:#0f5132;">Subject:</strong> ${subject}</p>

              <div style="margin-top:20px; padding:15px; background:#eef8f2; border-left:5px solid #0f5132;">
                <strong style="color:#0f5132;">Message:</strong>
                <p>${message}</p>
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