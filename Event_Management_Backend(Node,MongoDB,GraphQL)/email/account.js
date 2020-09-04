const sgMail = require('@sendgrid/mail');
const apikey = "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";

sgMail.setApiKey(apikey);

sgMail.send({
    to: 'rishindesai@yahoo.com',
    from: 'rishindesai@gmail.com',
    subject: "My first email",
    text: 'Hope you recieve this mail'
})
// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'rishindesai@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'rishindesai@gmail.com',
//   to: 'rishindesai@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });