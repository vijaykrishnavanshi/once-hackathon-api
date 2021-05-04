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

// Mount the Routes
app.use("/", routes);

app.use(errorHandler);

// Export the express app instance
module.exports = app;
