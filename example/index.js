const mail = require("../index");

sendmail = async () => {
  var mailOptions = {
    from: process.env.EMAIL_FROM_ADDRESS,
    to: "rcdelacruz@gmail.com",
    subject: "This is a Nodemailer - Test 123",
    template: "index",
    context: {
      header:
        '<img src="https://i1.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png" width="50%" height="50%">',
      salutation: "<h1>Hi Ronald DC,</h1>",
      body: "<h2>This is a test email!</h2>",
      signature: "Sincerly Yours, <br/> The Brewery Team",
      footer: "<i>P.S. Don't reply to this email </i>",
    },
  };
  console.log(mailOptions);

  let resp = await mail.sendMail(mailOptions);
  console.log(resp);
  // log or process resp;
  return resp;
};

// mail.sendMail(
//   {
//     from1: process.env.EMAIL_FROM_ADDRESS,
//     to: "rcdelacruz@gmail.com",
//     subject: "This is a Nodemailer - Test 123",
//     template: "index",
//     context: {
//       header:
//         '<img src="https://i1.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png" width="50%" height="50%">',
//       salutation: "<h1>Hi Ronald DC,</h1>",
//       body: "<h2>This is a test email!</h2>",
//       signature: "Sincerly Yours, <br/> The Brewery Team",
//       footer: "<i>P.S. Don't reply to this email </i>",
//     },
//   }
// {
//   extname: '.hbs',
//   extPath: './templates'
// },
// {
//   port: 465,
//   host: 'email-smtp.us-west-2.amazonaws.com',
//   secure: true,
//   auth: {
//       user: 'xxxxx',
//       pass: 'xxxxx',
//   },
//   debug: true
// }
//);

sendmail();
