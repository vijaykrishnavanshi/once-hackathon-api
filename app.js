"use strict";

/*
 * This file exports the app that is used by the server to expose the routes.
 * And make the routes visible.
 */

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./api/routes");
const errorHandler = require("./handlers/error.handler");

// Express App
const app = express();

// Use default logger for now
app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// Mount the Routes
app.use("/", routes);

// This is to check if the service is online or not
app.use("/", function (req, res) {
  res.json({
    endpoints: [
      { method: "POST", route: "/get-hash" },
      { method: "POST", route: "/carbon-intesity" },
    ],
  });
  res.end();
});

app.use(errorHandler);

// Export the express app instance
module.exports = app;
