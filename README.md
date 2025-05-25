# DFEAT - Digital Future Education Alliance of Texas

A 501(c)(3) nonprofit educational website focused on digital technologies, distributed ledger systems, and decentralized networks. Built with Node.js and Express, featuring educational resources, donation capabilities, and contact functionality.

## 🌟 Features

- **Educational Resources**: Comprehensive guides on blockchain, DLT, and decentralized systems
- **IRS-Compliant Design**: Built for 501(c)(3) nonprofit status requirements
- **Responsive Design**: Mobile-friendly interface with modern CSS and banner integration
- **Banner Integration**: Beautiful banner images integrated into hero sections
- **Contact Form**: Functional contact system with email notifications
- **Donation Integration**: Ready for nonprofit donation processing
- **SEO Optimized**: Meta tags and structured content for search engines
- **Forever Process Management**: Production-ready server management with forever
- **Automated Updates**: Git-based update scripts for easy deployment

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone or download the project**
   ```bash
   cd c:\Code\educationnonprofit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure email settings (optional)**
   - Copy `config-copy.json` to `config.json`
   - Update email settings in `config.json` for contact form functionality

4. **Start the server**
   ```bash
   npm start
   # or
   node index.js
   ```

5. **Visit the website**
   Open http://localhost:3000 in your browser

## 🔄 Updating the Website

### Automatic Update (Recommended)

**Windows:**
```bash
update.bat
```

**Linux/Mac:**
```bash
./update.sh
```

**Using npm:**
```bash
npm run update
```

### Manual Update
```bash
git pull
npm install
npm start
```

The update scripts will:
- Stop any running server processes
- Pull the latest changes from git
- Install/update dependencies
- Restart the server
- Open the website in your browser (Windows version)

## 📁 Project Structure

```
c:\Code\educationnonprofit\
├── index.js                 # Main Node.js server
├── package.json             # Dependencies and scripts
├── config.json              # Server configuration
├── config-copy.json         # Configuration template
├── update.sh                # Linux/Mac update script
├── update.bat               # Windows update script
├── start.sh                 # Linux/Mac startup script
├── start.bat                # Windows startup script
├── dev.bat                  # Development utility script
├── README.md                # This file
├── .gitignore              # Git ignore rules
└── public/                 # Static web files
    ├── index.html          # Homepage
    ├── about.html          # About page
    ├── resources.html      # Educational resources
    ├── donate.html         # Donation page
    ├── contact.html        # Contact form
    ├── disclaimer.html     # Legal disclaimers
    ├── 404.html           # Error page
    ├── robots.txt         # SEO robots file
    ├── sitemap.xml        # SEO sitemap
    ├── css/
    │   └── styles.css     # Main stylesheet
    ├── js/
    │   └── main.js        # JavaScript functionality
    └── images/            # Website images
        ├── banner.jpg     # Hero section banner image
        ├── dfeat-logo.png # Organization logo
        ├── placeholder.txt # Image requirements list
        └── README.md      # Image documentation
```

## ⚙️ Configuration

### Email Setup
To enable contact form functionality:

1. Copy `config-copy.json` to `config.json`
2. Update the email configuration:

```json
{
  "port": 3000,
  "email": {
    "host": "your-smtp-host.com",
    "port": 587,
    "secure": false,
    "user": "your-email@domain.com",
    "pass": "your-app-password",
    "from": "noreply@dfeat.org",
    "to": "contact@dfeat.org"
  }
}
```

### HTTPS Setup (Production)
For production deployment with SSL:

```json
{
  "https": {
    "cert": "/path/to/certificate.crt",
    "key": "/path/to/private.key",
    "ca": "/path/to/ca-bundle.crt"
  }
}
```

## 🎨 Images Status

**✅ Integrated Images:**
- `dfeat-logo.png` - Main organization logo (✅ Active)
- `banner.jpg` - Hero section banner image (✅ Active)
- `favicon.ico` - Website favicon (✅ Active)
- `apple-touch-icon.png` - Apple touch icon (✅ Active)
- `favicon-32x32.png` - Standard favicon (✅ Active)
- `favicon-16x16.png` - Small favicon (✅ Active)

**📦 Available for Customization:**
- `icon-dlt.png` (64x64px) - Distributed Ledger Technology icon
- `icon-decentralized.png` (64x64px) - Decentralized Systems icon
- `icon-digital-assets.png` (64x64px) - Digital Assets icon

All banner images are properly integrated into the hero sections with responsive overlay effects.

## 🌐 Available Routes

- `/` - Homepage
- `/about` - About DFEAT
- `/resources` - Educational resources
- `/donate` - Donation page
- `/contact` - Contact form
- `/disclaimer` - Legal disclaimers
- `/api/contact` - Contact form API endpoint

## 📧 Contact Form API

The contact form submits to `/api/contact` with:

```json
{
  "name": "Full Name",
  "email": "email@example.com",
  "message": "Contact message"
}
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

## 🚀 Deployment

### Development
```bash
npm start
```

### Production
1. Set up SSL certificates
2. Configure email settings
3. Update config.json for production
4. Use PM2 or similar for process management:

```bash
npm install -g pm2
pm2 start index.js --name "dfeat-website"
pm2 startup
pm2 save
```

## 🔒 Security Features

- Input validation on contact forms
- CORS protection
- Express security headers
- 404 error handling
- XSS protection through proper HTML escaping

## 📋 TODO

- [ ] Add actual logo and banner images
- [ ] Configure production email settings
- [ ] Set up SSL certificates for HTTPS
- [ ] Add donation payment processing
- [ ] Implement analytics tracking
- [ ] Add blog/news section
- [ ] Create admin dashboard
- [ ] Add newsletter signup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the Digital Future Education Alliance of Texas (DFEAT), a 501(c)(3) nonprofit organization.

## 📞 Support

For support or questions:
- Email: contact@dfeat.org
- Website: http://localhost:3000/contact

---

**Digital Future Education Alliance of Texas (DFEAT)**  
*Empowering communities through digital education and emerging technologies*