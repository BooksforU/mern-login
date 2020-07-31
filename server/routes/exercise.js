const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise");
const casual = require("casual");
const data = require("./ex");

var fs = require("fs");
const faker = require("faker");
fs.readFile("./ex.json", "utf-8", function(err, obj) {
  // print your json file to the screen
  console.log(obj);

  // parse the obj string and convert it to an actual object

  // print the properties of obj.data1 as "key : value"
  // for (k in obj.data1) {
  //     console.log(k, ":", obj.data1[k]);
  // }
});
// db.city.insertMany(cities)  using mongo client
// City.insertMany(cities)  using Mongoose

// Get All Exercise
router.get("/", async (req, res) => {
  try {
    let exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({
      msg: error
    });
  }
});

// Create Exercise
router.post("/", async (req, res) => {
  try {
    var bulk = Exercise.collection.initializeOrderedBulkOp();
    bulk.insert(data);
    bulk.execute(function(err, result) {
      // result contains stats of the operations
      console.log(result)
      res.status(200).json("Success");
    });
  } catch (error) {
    res.status(500).json({
      msg: `Hey Check Your code Error is ${error}`
    });
  }
});

// single Exercise
router.get("/:id", async (req, res) => {
  console.log(req.param.id);
  try {
    let ex = await Exercise.findById(req.params.id);
    res.status(200).json(ex);
  } catch (error) {
    res.status(500).json({
      msg: `Hey Check Your code Error is ${error}`
    });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: `This ${req.params.id} Deleted Successfully`
    });
  } catch (error) {
    res.status(500).json({
      msg: `Hey Check Your code Error is ${error}`
    });
  }
});

// Updated
router.post("/update/:id", async (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
