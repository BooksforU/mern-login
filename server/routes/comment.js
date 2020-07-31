const express = require("express");
const router = express.Router();
const Story = require("../models/story");
const Comment = require("../models/comment");

const { auth } = require("../middleware/auth");

//=================================
//             Comment  CRUD
//=================================

router.post("/:id", auth, async (req, res) => {
  try {
    console.log(req.user.name);
    Story.findById(req.params.id, function(err, story) {
      if (err) {
        console.log(err);
      } else {
        var newComment = {
          content: req.body.content,
          story_id: req.params.id,
          author: req.user
        };
        console.log(req.user.name);
        Comment.create(newComment, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            story.comments.push(result);
            story.save();
            res.status(200).json(result);
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error"
    });
  }
});

// Find Comments
router.get("/:id", (req, res) => {
  Story.findById(req.params.id, function(err, story) {
    if (err) {
      console.log(err);
    } else {
      Comment.find(
        {
          _id: { $in: story.comments }
        },
      ).populate('author._id').exec((err, comment)=>{
        if (err)
        res.send(err)
        else if (!comment)
            res.send(404)
        else
            res.send(comment)

      });
    }
  });
});

router.delete("/comments/:storyId/:commentId", async function(req, res) {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.storyId,
      {
        $pull: { comments: req.params.commentId }
      },
      { new: true }
    );

    if (!story) {
      return res.status(400).send("Story not found");
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res.send("Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
