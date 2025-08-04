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
