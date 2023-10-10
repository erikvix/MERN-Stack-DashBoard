const express = require("express");
const router = express.Router();
const userModel = require("../models/UserModel");
const hashPassword = require("../middleware/hash");
router.use(express.json());

router.get("/users", async (req, res) => {
  try {
    const userData = await userModel.find();
    res.json(userData);
  } catch (error) {
    res.send(error);
  }
});

router.post("/user", hashPassword, async (req, res) => {
  try {
    const payload = req.body;
    const userData = await userModel.create({ ...payload });
    res.send(userData);
  } catch (error) {
    res.send(error);
    console.log(error)
  }
});

router.put("/user/:_id", hashPassword, async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  try {
    const userData = await userModel.findOneAndUpdate(
      { _id },
      { ...payload },
      {
        new: true,
      }
    );
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/user/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await userModel.deleteOne({ _id }, { new: true });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
