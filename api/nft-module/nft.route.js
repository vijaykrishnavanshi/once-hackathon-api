"use strict";

/*
 * This file contails all the routes that are related to
 * auth of the user.
 */
const express = require("express");
const router = express.Router();
const NFTController = require("./nft.controller");
const asyncHandler = require("../../handlers/async.handler");
const responseHandler = require("../../handlers/response.handler");

router.route("/get-hash").post(
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    const data = await NFTController.getHash(req.body);
    const response = {};
    response.statusCode = 200;
    response.data = data;
    return responseHandler(res, response);
  })
);

router.route("/carbon-intesity").post(
  asyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    const data = await NFTController.calculateCarbonIntensity(req.body);
    const response = {};
    response.statusCode = 200;
    response.data = data;
    return responseHandler(res, response);
  })
);

module.exports = router;
