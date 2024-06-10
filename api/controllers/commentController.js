const Comment = require("../models/Comment");

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send("Comment not found");
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) return res.status(404).send("Comment not found");
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deleteComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deleteComment) return res.status(404).send("Comment not found");
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
