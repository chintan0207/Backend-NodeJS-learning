const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello express");
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "About.html"));
});

router.get("/contact/:id", (req, res) => {
  res.send({ id: `${req.params.id}`, contact: 9987456874 });
});

router.post("/date", (req, res) => {
  try {
    const { date } = req.body;
    console.log(req.body);
    res.status(200).json({ date });
    
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
