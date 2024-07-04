const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello express");
})

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'About.html'));
})

router.get('/contact/:id', (req, res) => {
    res.send({ "id": `${req.params.id}`, "contact": 9987456874 });
})

module.exports = router