const express = require("express");
const { now } = require("mongoose");
const todoModal = require("../modals/todoModal");
const router = express.Router();
const userModal = require("../modals/userModal")



router.get("/getall", async (req, res) => {
  const todos = await todoModal.find({ user: req.user });
  res.status(200).json({
    status: "sucess",
    todos
  })
});

router.post("/addtodo", async (req, res) => {

  console.log(req.body);
  const newact = await todoModal.create({ activity: req.body.activity, user: req.user });
  res.status(200).json({
    status: "sucess",
    newact
  })

})

router.put("/start", async (req, res) => {
  const status = await userModal.findOne({ _id: req.user });
  if (status.status === "pending") {
    return res.status(200).json({
      status: "pending"
    })
  }
  let date = Date.now()
  const updatetodo = await todoModal.updateOne({ _id: req.body.id }, { start: date, status: "Ongoing", action: "End" });
  const statusup = await userModal.updateOne({ _id: req.user }, { status: "pending" });
  res.status(200).json({
    status: "sucess"
  })
});

router.put("/end", async (req, res) => {
  let date = Date.now()
  const status = await userModal.updateOne({ _id: req.user }, { status: "done" });
  const updatetodo = await todoModal.updateOne({ _id: req.body.id }, { end: date });
  const timetaken = await todoModal.findOne({ _id: req.body.id });
  const start = timetaken.start;
  const seconds = (date - start) / 1000
  const hours = parseInt(seconds / 3600);
  const minutes = parseInt(((seconds / 3600) - hours) * 60);
  const secnd = parseInt(((((seconds / 3600) - hours) * 60) - minutes) * 60)
  const str = String(`${hours}:${minutes}:${secnd}`)
  const updatedtt = await todoModal.updateOne({ _id: req.body.id }, { timetaken: str, status: "Completed", action: "" });

  res.status(200).json({
    status: "sucess",
    message: seconds
  })
});






module.exports = router;