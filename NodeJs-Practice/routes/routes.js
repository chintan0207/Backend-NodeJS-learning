const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require("../models/Contact")
const router = express.Router();

// route 1 http://localhost:5000/api/contact
router.post('/contact', [
    body('name').notEmpty().withMessage("Enter valid name"),
    body('email').isEmail().withMessage("Enter valid email"),
    body('subject').notEmpty().withMessage("Enter valid subject"),
    body('message').notEmpty().withMessage("Enter valid message"),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {
        const contact = new Contact(
            req.body
        );

        await contact.save();

        success = true
        res.json({ success, msg: "Your response is saved.Thank you for contacting us..." });
    } catch (error) {
        console.error("Error creating contact:", error); // Log the error
        res.status(500).send("Internal server error occurred");
    }
});

//

router.get('/contacts', async (req, res) => {

    try {
        const contacts = await Contact.find()
        if (!contacts) {
            return res.status(404).send()
        }
        res.status(200).send(contacts)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/contact/:id', async (req, res) => {

    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).send()
        }
        res.status(200).send(contact)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/contact/:id',async (req,res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true})
        if (!contact) {
            return res.status(404).send()
        }
        res.status(200).send({msg:"Record Updated Successfully..",contact})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router