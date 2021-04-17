const db = require("../models");
let totalDurr = 0;
module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });
    app.get("/api/workouts/range", ({}, res) => {
        db.Workout.find({}).then((dbWorkout) => {
          res.json(dbWorkout);
        }).catch(err => {
          res.status(400).json(err);
        });
      });
      app.post("/api/workouts", (req, res) => {
        totalDurr = 0;
        db.Workout.create(req.body).then((dbWorkout) => {
          res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
          });
      });
      app.put("/api/workouts/:id", (req, res) => {
        totalDurr += req.body.duration
        db.Workout.findByIdAndUpdate(
          { _id: req.params.id }, 
            { 
              $push:  {exercises: req.body},
              totalDuration: totalDurr 
            }
        ).then((dbWorkout) => {
          res.json(dbWorkout);
        }).catch(err => {
          res.status(400).json(err);
        });
    });
}