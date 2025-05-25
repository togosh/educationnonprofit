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
        service: 'DFEAT Website'
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Configure nodemailer (you'll need to update with actual email settings)
        const transporter = nodemailer.createTransporter({
            host: CONFIG.email.host,
            port: CONFIG.email.port,
            secure: CONFIG.email.secure,
            auth: {
                user: CONFIG.email.user,
                pass: CONFIG.email.pass
            }
        });

        const mailOptions = {
            from: CONFIG.email.from,
            to: CONFIG.email.to,
            subject: `DFEAT Contact Form: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// 404 Error handler - must be last route
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Server setup
const PORT = CONFIG.port || 3000;

if (CONFIG.https && CONFIG.https.cert && CONFIG.https.key) {
    // HTTPS Server
    const httpsOptions = {
        cert: fs.readFileSync(CONFIG.https.cert),
        key: fs.readFileSync(CONFIG.https.key)
    };
    
    if (CONFIG.https.ca) {
        httpsOptions.ca = fs.readFileSync(CONFIG.https.ca);
    }
    
    const httpsServer = https.createServer(httpsOptions, app);
    httpsServer.listen(443, () => {
        console.log('DFEAT HTTPS server running on port 443');
    });
    
    // HTTP redirect to HTTPS
    const httpApp = express();
    httpApp.use((req, res) => {
        res.redirect(`https://${req.headers.host}${req.url}`);
    });
    httpApp.listen(80, () => {
        console.log('HTTP redirect server running on port 80');
    });
} else {
    // HTTP Server
    app.listen(PORT, () => {
        console.log(`DFEAT server running on port ${PORT}`);
    });
}
