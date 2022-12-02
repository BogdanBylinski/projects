const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const Middleware = require("../middleware");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("/").get(allUsers);
router.post("/", registerUser);
router.post("/login", authUser);

module.exports = router;
