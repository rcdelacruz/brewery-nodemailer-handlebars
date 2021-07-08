require("dotenv").config();

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const log = console.log;


const sendMail = (mailOptions, engineOptions, SMTPCredentials) => {
  let credentials = {};
  if (SMTPCredentials === undefined) {
    credentials = {
      port: process.env.SMTP_PORT,
      host: process.env.SMTP_HOST,
      secure: true,
      auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
      },
      debug: process.env.IS_DEBUG
    }
  } else {
    credentials = {
      port: SMTPCredentials.port,
      host: SMTPCredentials.host,
      secure: SMTPCredentials.secure,
      auth: {
          user: SMTPCredentials.auth.user,
          pass: SMTPCredentials.auth.pass,
      },
      debug: SMTPCredentials.is_debug
    }
  }
  let transporter = nodemailer.createTransport(credentials);
  

  transporter.use(
    "compile",
    hbs({
        viewEngine: {
          extName: ".hbs" || engineOptions.extName,
          partialsDir: "./templates" || engineOptions.templatePath,
          layoutsDir: "./templates" || engineOptions.templatePath,
          defaultLayout: "",
        },
        viewPath: "./templates" || engineOptions.templatePath,
        extName: ".hbs" || engineOptions.extName,
    })
  );

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return log({ 
        "nodemailer-error": err,
        "message": "Error occurs"
      });
    }
    return log({"nodemailer-success": "Email sent!"});
  });
}

module.exports = {
    sendMail
}