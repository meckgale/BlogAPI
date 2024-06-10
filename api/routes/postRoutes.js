const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const passport = require("passport");

// Public route
router.get("/", postController.getAllPosts);

// Protected routes
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.getPostById
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = router;
