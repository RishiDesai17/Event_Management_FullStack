const sgMail = require('@sendgrid/mail');
const apikey = "YOUR API KEY";

sgMail.setApiKey(apikey);

sgMail.send({
    to: 'Receiver',
    from: 'Sender',
    subject: "My first email",
    text: 'Hope you recieve this mail'
})
