const { Router } = require("express");
const {
  registerUser,
  authUser,
  logout,
} = require("../controllers/userController");

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
