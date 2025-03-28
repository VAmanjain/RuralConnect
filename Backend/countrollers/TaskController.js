const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  const task = await TaskModel.find();
  res.send(task);
};

module.exports.saveTasks = (req, res) => {
  const { task } = req.body; // Change this to task from task

  TaskModel.create({ task }) // Change to task from task
    .then((data) => {
      console.log("Saved Successfully....");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something Went wrong..." });
    });
};


module.exports.updateTasks = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => res.send("update successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something Went wrong..." });
    });
};

module.exports.deleteTasks = (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Delete successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something Went wrong..." });
    });
};
