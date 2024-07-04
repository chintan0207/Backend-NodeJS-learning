const express = require('express');
const router = express.Router();

router.get('/name',(req,res) => {
    res.json({name:"Chintan Harshadbhai Patel"})
})


module.exports = router