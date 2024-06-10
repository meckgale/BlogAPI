const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

// Public Route
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

// Protected routes
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getUserById
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

module.exports = router;
