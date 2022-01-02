import { Transporter, SendMailOptions, createTransport } from "nodemailer";

const transporter: Transporter = createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

const mailOptions: SendMailOptions = {
  from: senderEmail,
  to: recipientEmail,
  subject: "Subject Here",
  text: "text or html",
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email Sent");
  }
});
