const express = require('express')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')

const router = express.Router()

router.get('/start', (req, res) => {
    res.status(200).send("start creating Api")
})

router.post('/signup', [
    body('name', 'Name should be minimum 3 charcter').isLength({ min: 3 }),
    body('email', "invalid email").isEmail(),
    body('password', 'password must be 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const { name, email, password } = req.body
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ success, errors: errors.array() })
    }
    try {
        let user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({ success, error: "sorry user with this email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: hashedPassword })

        const data = {
            user: {
                id: user.id
            }
        }

        const JWT_SECRET = "chintan$54321"
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success,msg:"SignUp successfully", authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

})

router.post('/login', [
    body('email', "invalid email").isEmail(),
    body('password', 'password must be 5 characters').isLength({ min: 5 })
], async(req, res) => {

    const {email,password} = req.body
    let success = false
    let errors = validationResult(req)
    if(!errors.isEmpty){
        res.status(400).json({success,errors:errors.array()})
    }

    try {

        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({error:"please try to login with correct credential"})
        }
        
        const passwordcompare = await bcrypt.compare(password,user.password)

        if(!passwordcompare){
            res.status(404).json({error:"please try to login with correct credential"})

        }
   
        const data = {
            user: {
                id: user.id
            }
        }

        const JWT_SECRET = "chintan$54321"
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success,msg:"logged in successfully", authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

router.post('/getuser',fetchUser,  async (req, res) => {

    try {

        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server errors occurred")
    }
})




module.exports = router