var CONFIG = require('./config.json');
var DEBUG = CONFIG.debug;
console.log('Debug mode:', DEBUG);

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('es6-promise').polyfill();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; font-src 'self';");
    next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'resources.html'));
});

app.get('/donate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donate.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/disclaimer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'disclaimer.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        service: 'LIFT Website'
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Create transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: CONFIG.email.host,
        port: CONFIG.email.port,
        secure: CONFIG.email.secure, // true for 465, false for other ports
        auth: {
            user: CONFIG.email.user, // Your Gmail address from config
            pass: CONFIG.email.pass  // Your App Password from config
        }
    });

    // Email options
    const mailOptions = {
        from: CONFIG.email.from, // sender address
        to: CONFIG.email.to, // list of receivers
        subject: `LIFT Contact Form: ${name}`, // Subject line
        text: `You have a new contact request:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
        html: `<p>You have a new contact request:</p>
               <ul>
                 <li>Name: ${name}</li>
                 <li>Email: ${email}</li>
                 <li>Message: ${message}</li>
               </ul>` // html body
    };

    try {
        // Send mail
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ msg: 'Error sending email' });
    }
});

// Error handling for 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start server
const PORT = CONFIG.port || 3000;

if (CONFIG.https && CONFIG.https.key && CONFIG.https.cert && CONFIG.https.ca) {
    const httpsOptions = {
        key: fs.readFileSync(CONFIG.https.key),
        cert: fs.readFileSync(CONFIG.https.cert),
        ca: fs.readFileSync(CONFIG.https.ca)
    };
    https.createServer(httpsOptions, app).listen(443, () => {
        console.log('LIFT HTTPS server running on port 443');
    });
    // HTTP redirect to HTTPS
    http.createServer((req, res) => {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(PORT, () => {
        console.log(`HTTP server redirecting to HTTPS on port ${PORT}`);
    });
} else {
    app.listen(PORT, () => {
        console.log(`LIFT server running on port ${PORT}`);
    });
}
