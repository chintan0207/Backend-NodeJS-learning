const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Task = require("../models/Task");
const { query, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/task",
  fetchUser,
  [
    // query("taskName").notEmpty().withMessage("Task name is required"),
    // query("description")
    //   .isEmail()
    //   .withMessage("Description must be a valid email"),
  ],
  async (req, res) => {
    const { taskName, description } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = new Task({
        taskName,
        description,
        user: req.user.id,
      });

      const saveTask = await task.save();
      res.json(saveTask);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/fetchtasks", fetchUser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/task/:id", fetchUser, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("record not found");
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

router.delete("/task/:id", fetchUser, async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).send("record not found");
    }
    return res.status(200).send("deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

router.patch("/task/:id", fetchUser, async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateTask) {
      return res.status(404).send("record not found");
    }
    return res
      .status(200)
      .json({ msg: "record Updated successfully", updateTask });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
