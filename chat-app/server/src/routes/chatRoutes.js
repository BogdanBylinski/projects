const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const Middleware = require("../middleware");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(accessChat);
router.route("/").get(Middleware.decodeToken, fetchChats);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);

module.exports = router;
