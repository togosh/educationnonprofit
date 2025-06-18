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

app.get('/governance', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'governance.html'));
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
const HTTP_PORT = CONFIG.port || 3000; // Port for HTTP redirection
const HTTPS_PORT = 443; // Standard HTTPS port

// Check if HTTPS configuration is present and valid in config.json
if (CONFIG.https && CONFIG.https.key && CONFIG.https.cert) {
    try {
        const httpsOptions = {
            key: fs.readFileSync(CONFIG.https.key),
            cert: fs.readFileSync(CONFIG.https.cert)
            // 'ca' is often not needed if fullchain.pem is used for 'cert'
        };

        // Create HTTPS server
        https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
            console.log(`LIFT HTTPS server running on port ${HTTPS_PORT} for ${CONFIG.hostname}`);
        });

        // Create HTTP server to redirect to HTTPS
        http.createServer((req, res) => {
            // Redirect to the hostname specified in config.json to ensure correct domain
            res.writeHead(301, { "Location": "https://" + CONFIG.hostname + req.url });
            res.end();
        }).listen(HTTP_PORT, () => {
            console.log(`HTTP server running on port ${HTTP_PORT}, redirecting to HTTPS (${CONFIG.hostname})`);
        });

    } catch (err) {
        console.error("Could not start HTTPS server. Error reading certificate files:", err.message);
        console.error("Please ensure 'key' and 'cert' paths in config.json are correct and readable.");
        console.log("Falling back to HTTP only on port " + HTTP_PORT);
        app.listen(HTTP_PORT, () => {
            console.log(`LIFT HTTP server running on port ${HTTP_PORT} (HTTPS setup failed)`);
        });
    }
} else {
    // Fallback to HTTP if HTTPS is not configured
    console.log('HTTPS not configured in config.json. Starting HTTP server only.');
    app.listen(HTTP_PORT, () => {
        console.log(`LIFT HTTP server running on port ${HTTP_PORT}`);
    });
}
