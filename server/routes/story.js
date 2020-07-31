const express = require('express');
const router = express.Router();
const Story = require("../models/story");

const { auth } = require("../middleware/auth");


//=================================
//             Story CRUD
//=================================


// Create
router.post("/", auth,async (req, res) => {
    try {
        var title = req.body.title;
        var content = req.body.content;
        var author = req.user;
        var newStory = { title: title, content: content, author: author};
        Story.create(newStory, function(err, newlyCreated) {
            if (err) {
                return next(err);
            } else {
                res.send('Sucessfully created new story');
            }
        })
        
    } catch (error) {
        console.log(error)
        
    }

});


// READ One and All
router.get('/',async(req,res)=>{
    try {
        Story.find()
        .populate('author._id').exec((err, article)=> {
            if (err)
                res.send(err)
            else if (!article)
                res.send(404)
            else
                res.send(article)
                    
        })
    } catch (error) {
        console.log(error)
        
    }
})

// Single Read
router.get('/:id',async(req,res)=>{
    console.log(req.param.id)
    try {
        
        let story = await Story.findById(req.params.id)
        res.status(200).json(story)
    } catch (error) {
        res.status(500).json({
            msg:`Hey Check Your code Error is ${error}`
        })
        
    }
})

// Delete

router.delete('/:id',async(req,res)=>{
    console.log(req.param.id)
    try {
        
        await Story.findByIdAndDelete(req.params.id)
        res.status(200).json({
            msg:'Story Delete'
        })
    } catch (error) {
        res.status(500).json({
            msg:`Hey Check Your code Error is ${error}`
        })
        
    }
})

// Update
router.post('/update/:id',async(req,res)=>{
    Story.findById(req.params.id)
    .then(story => {
      story.title = req.body.title;
      story.content = req.body.content;
      story.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
})




module.exports = router;