const express = require("express");
const router = express.Router();

const Employe = require("../../models/Employe");

// GET all items
router.get("/", (req, res) => {
  Employe.find()
    .sort({ firstName: 1 })
    .then(items => res.json(items));
});

// GET item by id
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Employe.findById(req.params.id).then(item => res.json(item));
});

// POST new item
router.post("/", (req, res) => {
  console.log(req.body);
  if (req.body._id) {
    Employe.findByIdAndUpdate(req.body._id, req.body).then(() => {
      Employe.find()
        .sort({ firstName: -1 })
        .then(items => res.json(items));
    });
  } else {
    const newEmploye = new Employe({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      position: req.body.position,
      businessHours: req.body.businessHours,
      workPlace: req.body.workPlace,
      lunchTime: req.body.lunchTime
    });
    newEmploye.save().then(() => {
      Employe.find()
        .sort({ firstName: 1 })
        .then(items => res.json(items));
    });
  }

  // const newEmploye = new Employe({
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   dob: req.body.dob,
  //   position: req.body.position,
  //   businessHours: req.body.businessHours,
  //   workPlace: req.body.workPlace,
  //   lunchTime: req.body.lunchTime
  // });
  // newEmploye.save().then(item => res.json(item));
});

// POST edited item
// router.post("/:id", (req, res) => {
//   const newEmploye = new Employe({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     dob: req.body.dob,
//     position: req.body.position,
//     businessHours: req.body.businessHours,
//     workPlace: req.body.workPlace,
//     lunchTime: req.body.lunchTime
//   });
//   newEmploye.save({ _id: req.params.id }).then(item => res.json(item));
// });

// DELETE item
router.delete("/delete/:id", (req, res) => {
  Employe.findById(req.params.id)
    .then(emp => emp.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
