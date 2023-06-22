const TaskModel = require("../Models/TaskModel");

// GET /api/tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const task = await TaskModel.create({ ...req.body, userId: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// PUT /api/tasks/:id
exports.updateTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// DELETE /api/tasks/:id
exports.deleteTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// GET /api/tasks/search?title=foo
exports.searchTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ title: req.query.title });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// GET /api/tasks/filter?status=foo
exports.filterTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ status: req.query.status });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// GET /api/tasks/sort?sortBy=createdAt:desc
exports.sortTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find().sort(req.query.sortBy);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
