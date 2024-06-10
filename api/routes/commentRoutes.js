const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const passport = require("passport");

// Routes
router.get("/", commentController.getAllComments);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentController.createComment
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.getCommentById
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.updateComment
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.deleteComment
);

module.exports = router;
