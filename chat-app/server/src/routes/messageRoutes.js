const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const Middleware = require("../middleware");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(Middleware.decodeToken, allMessages);
router.route("/").post(Middleware.decodeToken, sendMessage);

module.exports = router;
