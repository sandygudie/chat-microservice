const express = require("express");
const apiRouter = express.Router();
const { getMessages } = require("../controllers");

apiRouter.get("/:taskId", getMessages);

module.exports = apiRouter;
