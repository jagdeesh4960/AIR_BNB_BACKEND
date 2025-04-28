const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devendradhote179@gmail.com",
    pass: "qdcuulwjlujxhmxs",
  },
});

exports.sendMail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: "devendradhote179@gmail.com",
    to,
    subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("error in mail->", err);
    console.log("info->", info);
  });
};
