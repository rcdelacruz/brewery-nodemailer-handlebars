require("dotenv").config();

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
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
      debug: process.env.IS_DEBUG,
    };
  } else {
    credentials = {
      port: SMTPCredentials.port,
      host: SMTPCredentials.host,
      secure: SMTPCredentials.secure,
      auth: {
        user: SMTPCredentials.auth.user,
        pass: SMTPCredentials.auth.pass,
      },
      debug: SMTPCredentials.is_debug,
    };
  }

  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport(credentials);

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".hbs" || engineOptions.extName,
          partialsDir:
            path.resolve(__dirname, "./templates") ||
            engineOptions.templatePath,
          layoutsDir:
            path.resolve(__dirname, "./templates") ||
            engineOptions.templatePath,
          defaultLayout: "",
        },
        viewPath:
          path.resolve(__dirname, "./templates") || engineOptions.templatePath,
        extName: ".hbs" || engineOptions.extName,
      })
    );

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        log({
          "nodemailer-error": err,
          message: "Error occurs",
        });
        resolve({
          status: 400,
          message: "Error occurs. See logs for more details.",
        });
      } else {
        log({ "nodemailer-success": "Email sent!" });
        resolve({ status: 200, message: "email sent." });
      }
    });
  });
};

module.exports = {
  sendMail,
};
