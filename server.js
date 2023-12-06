const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/donate', (req, res) => {
    // Get donation amount from the request
    const amount = req.body.amount;

    // Send email
    sendEmail(amount);

    // Redirect back to the donation page or a thank-you page
    res.redirect('http://your-first-website.com/thankyou');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Function to send email
function sendEmail(amount) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com',
        subject: 'New Donation Received',
        text: `A new donation of $${amount} has been received.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
