"use strict";
const express = require("express");
const NFTRoute = require("./nft-module/nft.route");

const app = express();

app.use(NFTRoute);

module.exports = app;
