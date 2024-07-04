const express = require('express');
const FormData = require('../models/Form');
const { findByIdAndUpdate } = require('../models/Contact');
const router = express.Router()

router.post('/formdata',[], async(req,res) => {

    try {
        let success = false
        const formdata = new FormData(req.body)
        await formdata.save()
        success=true
       return res.status(200).json({success:true,formdata})
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/formdata',[], async(req,res) => {

    try {

        const data = await FormData.find()
        if(!data){
            return res.status(404).send()
        }else{
            return res.status(200).send(data)
        }
        
    } catch (error) {
        res.status(500).send(error)
    }

})


router.delete('/formdata/:id',async(req,res) => {
    try {
        const deletedFormData = await FormData.findByIdAndDelete(req.params.id);
        if (!deletedFormData) {
            return res.status(404).send("Form data not found");
        }
        return res.status(200).send("Deleted successfully");
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/formdata/:id',async(req,res) => {
    try {
        const data = await FormData.findById(req.params.id);
        if (!data) {
            return res.status(404).send("Form data not found");
        }
        return res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/formdata/:id', async(req,res)=>{
    try {
       const data = await FormData.findByIdAndUpdate(req.params.id,req.body,{new:true})
       if(!data){
        return res.status(404).send("Form data not found")
       } 
       return res.status(200).send({msg:"Record Updated",data});
    } catch (error) {
        res.status(500).send("internal server")
    }
})




module.exports = router