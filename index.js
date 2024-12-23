const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render a simple form
app.get('/', (req, res) => {
  res.send(`
    <form action="/send-email" method="post">
      <label for="to">To:</label>
      <input type="email" id="to" name="to" required><br><br>
      <label for="subject">Subject:</label>
      <input type="text" id="subject" name="subject" required><br><br>
      <label for="message">Message:</label><br>
      <textarea id="message" name="message" rows="4" required></textarea><br><br>
      <button type="submit">Send Email</button>
    </form>
  `);
});

// Route to handle email sending
app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  // Nodemailer transporter configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'iamqoslaye@gmail.com', 
      pass: 'mevc htnr uqrq dzho', 
    },
  });

  // Email options
  const mailOptions = {
    from: 'iamqoslaye@gmail.com', 
    to,
    subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
