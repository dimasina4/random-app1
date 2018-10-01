const express = require("express");
const router = express.Router();

const Position = require("../../models/Positions");

// GET all items
router.get("/", (req, res) => {
  Position.find()
    .sort({ position: -1 })
    .then(items => res.json(items));
});

module.exports = router;
