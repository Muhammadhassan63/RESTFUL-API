const express = require('express');
const router = express.Router();
const Experiment = require('../models/experiment');
const Scientist = require('../models/scientists');

// GET /experiments - Get a list of all experiments
router.get('/', async (req, res) => {
  try {
    const experiments = await Experiment.find().populate('scientist');
    res.json(experiments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /experiments/:id - Get a single experiment by ID
router.get('/:id', getExperiment, async (req, res) => {
  res.json(res.experiment);
});

// POST /experiments - Create a new experiment
router.post('/', async (req, res) => {
  const experiment = new Experiment({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    scientist: req.body.scientist
  });
  try {
    const newExperiment = await experiment.save();
    // Add experiment to scientist's experiments array
    const scientist = await Scientist.findById(req.body.scientist);
    scientist.experiments.push(newExperiment._id);
    await scientist.save();
    res.status(201).json(newExperiment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /experiments/:id - Update an existing experiment
router.put('/:id', getExperiment, async (req, res) => {
  try {
    const updatedExperiment = await Experiment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExperiment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /experiments/:id - Partially update an existing experiment
router.patch('/:id', getExperiment, async (req, res) => {
  if (req.body.name != null) {
    res.experiment.name = req.body.name;
  }
  if (req.body.description != null) {
    res.experiment.description = req.body.description;
  }
  if (req.body.date != null) {
    res.experiment.date = req.body.date;
  }
  if (req.body.scientist != null) {
    res.experiment.scientist = req.body.scientist;
  }
  try {
    const updatedExperiment = await res.experiment.save();
    res.json(updatedExperiment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /experiments/:id - Delete an existing experiment
router.delete('/:id', getExperiment, async (req, res) => {


  try {
    const experiment = await Experiment.findOneAndDelete(
      { _id: req.params.id },
      req.body
    );
    res.json(experiment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single experiment by ID
async function getExperiment(req, res, next) {
  try {
    const experiment = await Experiment.findById(req.params.id).populate('scientist');
    if (experiment == null) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    res.experiment = experiment;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
