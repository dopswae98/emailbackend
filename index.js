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
    user: "kingpingx88@gmail.com",
    pass: "bmspoqmidwltkygb",
  },
});

app.post("/send-email", (req, res) => {
  const email = req.body.email;
  const subject = req.body.name;
  const message = req.body.message;
  // console.log("body", body);
  console.log(req.body.email);
  console.log(req.body.message);
  //   const email = "ephraimmatarutse@gmail.com";
  //   const subject = "req.body.subject";
  //   const message = "req.body.message";

  const mailOptions = {
    from: "kingpingx88@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error sending email", err.message);
    } else {
      res.send("Email sent successfully!");
    }
  });
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