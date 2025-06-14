# LIFT - Literacy & Innovation in Financial Technology Alliance

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

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (usually comes with Node.js)
- Git

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/lift-website.git
    cd lift-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Copy `config-copy.json` to `config.json` and update the settings, especially for email functionality:
    ```bash
    cp config-copy.json config.json
    ```
    Edit `config.json` with your SMTP server details and email addresses:
    ```json
    {
        "debug": true,
        "port": 3000,
        "hostname": "localhost",
        "https": {
            "cert": "./ssl/your-cert.crt",
            "ca": "./ssl/your-ca.ca-bundle",
            "key": "./ssl/your-key.key"
        },
        "email": {
            "host": "smtp.example.com",
            "port": 587,
            "secure": false,
            "user": "your-email@example.com",
            "pass": "your-email-password",
            "from": "LIFT <noreply@lift.org>",
            "to": "contact@lift.org"
        }
    }
    ```

### Running the Application

-   **Development Mode:**
    ```bash
    npm run dev 
    ```
    This will start the server using `nodemon` for automatic restarts on file changes. Access at `http://localhost:3000`.

-   **Production Mode (using `forever`):**
    ```bash
    npm run forever  # Starts the server with forever
    npm run stop     # Stops the server
    npm run restart  # Restarts the server
    npm run logs     # Tails the server logs
    ```

-   **Production Mode (using `pm2` - Recommended for advanced users):**
    If you prefer `pm2` for process management:
    ```bash
    npm install -g pm2
    pm2 start index.js --name "lift-website"
    pm2 logs lift-website
    pm2 stop lift-website
    pm2 restart lift-website
    pm2 delete lift-website
    ```

## 🛠️ Scripts

-   `npm start`: Starts the server with `node index.js`.
-   `npm run dev`: Starts the server with `nodemon index.js` for development.
-   `npm run forever`: Starts the server with `forever` for production.
-   `npm run stop`: Stops the `forever` process.
-   `npm run restart`: Restarts the `forever` process.
-   `npm run logs`: Shows logs from the `forever` process.
-   `npm run update`: Pulls latest changes from git, installs dependencies, and restarts the `forever` process.
-   `npm test`: (Currently placeholder) `echo "Error: no test specified" && exit 1`

## 📁 Project Structure

```
lift-website/
├── public/                  # Static assets (CSS, JS, images)
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── lift-logo.png # Organization logo
│   │   ├── banner.jpg
│   │   └── ... (other images & icons)
│   ├── 404.html
│   ├── about.html
│   ├── contact.html
│   ├── disclaimer.html
│   ├── donate.html
│   ├── index.html
│   ├── navbar.html
│   ├── resources.html
│   ├── robots.txt
│   └── sitemap.xml
├── index.js                 # Main Express server file
├── package.json             # Project metadata and dependencies
├── package-lock.json
├── config.json              # Server configuration (ignored by git)
├── config-copy.json         # Template for config.json
├── README.md                # This file
├── PROJECT-SUMMARY.md       # Summary of completed features
├── dev.bat                  # Windows dev server script
├── start.bat                # Windows start script
├── start.sh                 # Linux/macOS start script (using forever)
├── update.bat               # Windows update script (git pull, npm install, forever restart)
└── update.sh                # Linux/macOS update script
```

## 🎨 Customization

-   **Logo & Branding**: Replace `lift-logo.png` and other images in `public/images/`.
-   **Styles**: Modify `public/css/styles.css` for visual changes.
-   **Content**: Edit HTML files in the `public/` directory.
-   **Configuration**: Update `config.json` for server port, email settings, etc.

## 📜 License

This project is licensed under the ISC License. See the `LICENSE` file for details (though not explicitly included, ISC is specified in `package.json`).

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📞 Contact

Literacy & Innovation in Financial Technology Alliance (LIFT)
- Website: [https://liftfintech.org](https://liftfintech.org) (Example URL, update as needed)
- Email: lifefintech@gmail.com

---

**Literacy & Innovation in Financial Technology Alliance (LIFT)**  
*Empowering through Education*