# The Brewery Nodemailer package 
This package uses nodemailer 6.x. and the [express-handlebars](https://github.com/ericf/express-handlebars) view
engine to generate html emails.

# Install from npm
```bash
npm install @brewery/nodemailer-handlebars
```
# Usage
>Note: For Brewery - Craft projects, SMTP is already provided, you can provide your own if you want to use this package in your own projects.

```javascript
const mail = require("@brewery/nodemailer-handlebars");

// sendMail(mailOptions, engineOptions, SMTPCredentials)
mail.sendMail(
    {
      from: "no-reply@thebrewery.app", //no need to change for Brewery - Craft projects
      to: "your-email@gmail.com", 
      subject: "This is a Nodemailer - Test",
      template: "index", //template name
      context: {
          header: '<img src="https://i1.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png" width="50%" height="50%">', 
          salutation: "<h1>Hi there,</h1>",
          body: "<h2>This is a test email!</h2>",
          signature: "Sincerly Yours, <br/> The Brewery Team",
          footer: "<i>P.S. Don't reply to this email </i>"
      }
    }
    //  Optional: Your own handlebars template 
    //  {
    //   extName: ".hbs",
    //   templatePath: "./templates"
    // },
    //  Optional: Your own SMTP credentials and settings,
    // {
    //   port: SMTPCredentials.port,
    //   host: SMTPCredentials.host,
    //   secure: SMTPCredentials.secure,
    //   auth: {
    //       user: SMTPCredentials.smtp_username,
    //       pass: SMTPCredentials.smtp_password,
    //   },
    //   debug: SMTPCredentials.is_debug
    // }
)
```

## How to create a custom template

1. Create a template folder.  You will need this for the `engineOptions.templatePath`
2. Create the handlebars temaplte file, for example, `verifyEmail.hbs`. You will need to provide the the file extension in case you want to change `.hbs` with other extension name. you will need this for the `engineOptions.extName`

Sample handlebars template (`index.hbs`)
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

</head>

<body>
    <p>{{{header}}}</p>
    <p>{{{salutation}}}</p>
    <p>{{{body}}}</p>
    <p>{{{signature}}}</p>
    <p>{{{footer}}}</p>
</body>

</html>
```

Please visit https://handlebarsjs.com/guide/#what-is-handlebars to learn more about handlebars 


# License
MIT