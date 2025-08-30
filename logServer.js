// logServer.js
const fs = require("fs");
const path = require("path");

const LOG_FILE_PATH = path.join(__dirname, "log.txt");

// ✅ Actual middleware function
const logMiddleware = (req, res, next) => {
  const date = new Date();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const day = date.getDate().toString().padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const weekday = dayNames[date.getDay()];

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  hours = hours.toString().padStart(2, "0");

  const time = `${hours}:${minutes}:${seconds} ${ampm}`;
  const logDate = `${month} ${day}, ${year} (${weekday}) ${time}`;
  const logEntry = `${logDate} ${req.method} ${req.originalUrl}\n`;

  fs.appendFile(LOG_FILE_PATH, logEntry, (err) => {
    if (err) console.error("Failed to write log:", err);
  });

  next();
};

module.exports = logMiddleware;
// app.use(helmet()); // defaults
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "https://apis.google.com"],
//       styleSrc: ["'self'", "https://fonts.googleapis.com"],
//       imgSrc: ["'self'", "https:"],
//       objectSrc: ["'none'"],
//     },
//   })
// );
// app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin" }));
// app.use(helmet.crossOriginEmbedderPolicy({ policy: "require-corp" }));
// app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
// app.use(helmet.hsts({ maxAge: 31536000, preload: true }));
// app.use(helmet.hidePoweredBy());
// app.use(helmet.noSniff());
// app.use(helmet.frameguard({ action: "deny" }));
// app.use(helmet.referrerPolicy({ policy: "no-referrer" }));
// app.use(helmet.dnsPrefetchControl({ allow: false }));

// const express = require("express");
// const helmet = require("helmet");

// const app = express();

// // Apply Helmet with full configuration
// app.use(
//   helmet({
//     // Content Security Policy (CSP) - restricts where resources can load from
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"], // default: only allow same-origin
//         scriptSrc: ["'self'", "https://apis.google.com"], // allow Google APIs
//         styleSrc: ["'self'", "https://fonts.googleapis.com"], // allow Google Fonts
//         fontSrc: ["'self'", "https://fonts.gstatic.com"],
//         imgSrc: ["'self'", "data:", "https://images.unsplash.com"], // allow inline base64 + unsplash
//         connectSrc: ["'self'", "https://api.example.com"], // for XHR/fetch/WebSocket
//         objectSrc: ["'none'"], // block <object>, <embed>, <applet>
//         upgradeInsecureRequests: [], // auto-upgrade http → https
//       },
//     },

//     // Hide "X-Powered-By: Express"
//     hidePoweredBy: true,

//     // Prevent clickjacking using X-Frame-Options
//     frameguard: { action: "deny" }, // deny iframes completely

//     // Block browsers from trying to guess (sniff) MIME types
//     noSniff: true,

//     // Add X-Download-Options for IE (disables untrusted downloads)
//     ieNoOpen: true,

//     // Force HTTPS in browsers (HSTS)
//     hsts: {
//       maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
//       includeSubDomains: true,
//       preload: true, // allow submission to Chrome preload list
//     },

//     // Set Referrer-Policy header
//     referrerPolicy: { policy: "no-referrer" },

//     // X-XSS-Protection (for legacy browsers, usually unnecessary now)
//     xssFilter: true,
//   })
// );

// app.get("/", (req, res) => {
//   res.send("Helmet full config in action 🚀");
// });

// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });


