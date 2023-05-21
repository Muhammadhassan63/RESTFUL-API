const express = require("express");
const router = express.Router();
const Scientist = require("../models/scientists");

// GET /scientists - Get a list of all scientists
router.get("/", async (req, res) => {
  try {
    const scientists = await Scientist.find().populate("experiments");
    res.json(scientists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET /scientists/:id - Get a single scientist by ID
router.get("/:id", getScientist, async (req, res) => {
  res.json(res.scientist);
});

// POST /scientists - Create a new scientist
router.post("/", async (req, res) => {
  const { username, specialty,password, experiments } = req.body;
  if (!username || !specialty || !password) {
    return res.status(422).json({ error: "Please fill the form" });
  }
  const scientist = new Scientist({
    username: req.body.username,
    password: req.body.password,
    specialty: req.body.specialty,
    experiments: req.body.experiments,
  });

  try {
    const newScientist = await scientist.save();
    res.status(201).json(newScientist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// PATCH /scientists/:id - Partially update an existing scientist
router.patch("/:id", getScientist, async (req, res) => {
  if (req.body.username != null) {
    res.scientist.username = req.body.username;
  }

  if (req.body.password != null) {
    res.scientist.password = req.body.password;
  }
  if (req.body.specialty != null) {
    res.scientist.specialty = req.body.specialty;
  }
  if (req.body.experiments != null) {
    res.scientist.experiments = req.body.experiments;
  }
  try {
    const updatedScientist = await res.scientist.save();
    res.json(updatedScientist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// DELETE /scientists/:id - Delete an existing scientist
router.delete("/:id", getScientist, async (req, res) => {
  try {
    const scientist = await Scientist.findOneAndDelete(
      { _id: req.params.id },
      req.body
    );
    res.json(scientist);
  } catch (err) {
    res.status(500).json({ message: "Can't Delete " });
  }
});



// Middleware function to get a single scientist by ID
async function getScientist(req, res, next) {
  try {
    const scientist = await Scientist.findById(req.params.id).populate(
      "experiments"
    );
    if (scientist == null) {
      return res.status(404).json({ message: "Scientist not found" });
    }
    res.scientist = scientist;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
