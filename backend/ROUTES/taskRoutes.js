const express = require('express');
const user = require('../MODELS/user');
const router = express.Router();
const task = require('../MODELS/task');
const auth = require('../MIDDLEWARES/auth');


router.get('/test', auth, (req, res) => {
  res.json({
    message: "Task routes are working",
    user: req.user
  });
});

router.post('/createtask', auth, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Description is required" });
    }

    const newTask = new task({
      title: title,
      description: description,
      priority: priority,
      owner: req.user._id
    });

    await newTask.save();
    res.status(200).json({ task: newTask, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getalltasks', auth, async (req, res) => {
  try {
    const tasks = await task.find({ owner: req.user._id });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/gettask/:id', auth, async (req, res) => {

  try {
    const taskId = req.params.id;
    const owner = req.user._id;

    const reqTask = await task.findOne({
      _id: taskId,
      owner: owner
    })
    res.status(200).json(reqTask);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }

})

router.patch('/update/:id', auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const owner = req.user._id;

    const description = req.body.description;
    const status = req.body.status;

    const updatedTask = await task.findOneAndUpdate({
      _id: taskId,
      owner: owner
    },
      {
        $set: {
          description: description,
          status: status
        }
      },
      { new: true }
    );
    res.send("updated succesfully")
  }
  catch (error) {
    res.json({ messege: error })
  }
})

router.patch('/complete/:id', auth, async (req, res) => {
  try {

    const taskId = req.params.id;
    const owner = req.user._id;

    const taskData = await task.findOne({ _id: taskId, owner });

    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    const completeStatus = !taskData.isCompleted;
    const updatedTask = await task.findOneAndUpdate(
      { _id: taskId, owner },
      { $set: { isCompleted: completeStatus, completedAt: new Date() } },
      { new: true }
    );

    res.json({ message: "Updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const owner = req.user.id;


    const deletedTask = await task.findOneAndDelete({ _id: taskId, owner: owner });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Deleted successfully", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.delete('/deletealltasks', auth, async (req, res) => {
  try {
    const owner = req.user._id;
    const tasks = await task.find({ owner: owner });

    for (let i = 0; i < tasks.length; i++) {
      await task.findOneAndDelete({
        _id: tasks[i]._id,
        owner: owner
      });
    }


    res.send("all tasks deleted successfully")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;