const express = require("express");
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get("/", async (req, res) => {
    const result = await Customer.find().sort('name');
    return res.status(200).send(result);
})

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send("The customer with give ID not found") ;
    return res.status(200).send(customer);
})

router.post("/", async (req, res) => {

    const exists = await Customer.findOne({name: req.body.name});
    if (exists) {
        return res.status(400).send({
            error: 'User name already exists'
        });
    }
    const { error, value }  = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }

        const customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold
        })
    
        try{
            const result = await customer.save();
            return res.status(200).send(result);
        }catch(e){
            return res.status(400).send({
                error: e.message
            });
        }
        
})

router.put("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send("The customer with give ID not found") ;

    const exists = await Customer.findOne({name: req.body.name, _id: {$ne: req.params.id}});
    if (exists) {
        return res.status(400).send({
            error: 'User name already exists'
        });
    }
    const { error, value }  = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const updatedCustomer = {
        name: req.body.name,
        isGold: req.body.isGold
    };
        try{
            const result = await Customer.findByIdAndUpdate(req.params.id,updatedCustomer, { new: true, runValidators: true });
            return res.status(200).send(result);
        }catch(e){
            // for(field in e.errors){
            //     res.send(e.errors[field].message);
            // }
            return res.status(400).send({
                error: e.message
            });
        }
        
})

router.delete("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send("The customer with give ID not found") ;

    try{
        const result = await Customer.deleteOne({_id: req.params.id});
        return res.status(200).send(result);
    }catch(e){
        return res.status(400).send(e.message);
    }
    

});

module.exports = router;