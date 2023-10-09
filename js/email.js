// Import required modules
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// Create an Express app
const app = express();

// Set up middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Define a route to handle form submission
app.post("/submit-form", (req, res) => {
  // Get the form data
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Create a transporter using your email service provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Change this to your email service provider
    auth: {
      user: "your_email@gmail.com", // Your email address
      pass: "your_password", // Your email password or app-specific password
    },
  });

  // Define the email message
  const mailOptions = {
    from: email,
    to: "utchikanna3108@gmail.com", // Recipient's email address
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
