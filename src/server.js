require('dotenv').config(); // Load environment variables from .env file.
const express = require('express'); // Import the Express framework.
const cors = require('cors'); // Enable CORS middleware for cross-origin requests.
const nodemailer = require('nodemailer'); // Import the nodemailer library for email sending functionality.


const app = express();
const PORT = process.env.PORT || 3000; // Set the server port from environment variable or default to 3000.
const corsOptions = {
   origin: '*',  // Allows requests from all domains. Specify actual domain in production for security.
   optionsSuccessStatus: 200 // Ensure compatibility by setting OPTIONS success status to 200 OK.
};


// Apply JSON parsing and CORS with configured options as global middleware.
app.use(express.json());
app.use(cors(corsOptions));


// Create a reusable transporter object using SMTP transport.
const transporter = nodemailer.createTransport({
   host: process.env.SMTP_HOST,
   port: 587,
   secure: false, // use false for STARTTLS; true for SSL on port 465
   auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS
   }
});


// Email sending endpoint.
app.post('/send-email', async (req, res) => {
   try {
       const { name, subject, email, message } = req.body; // Destructure and retrieve data from request body.


       // Validate required fields.
       if (!name || !subject || !email || !message) {
           return res.status(400).json({ status: 'error', message: 'Missing required fields' });
       }


       // Prepare the email message options.
       const mailOptions = {
           from: process.env.SENDER_EMAIL, // Sender address from environment variables.
           to: `${name} <${email}>`, // Recipient's name and email address.
           replyTo: process.env.REPLY_TO, // Sets the email address for recipient responses.
           subject: subject, // Subject line.
           text: message // Plaintext body.
       };


       // Send email and log the response.
       const info = await transporter.sendMail(mailOptions);
       console.log('Email sent:', info.response);
       res.status(200).json({ status: 'success', message: 'Email sent successfully' });
   } catch (err) {
       // Handle errors and log them.
       console.error('Error sending email:', err);
       res.status(500).json({ status: 'error', message: 'Error sending email, please try again.' });
   }
});


// Start the server and log the port.
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
