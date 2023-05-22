const Joi = require("joi");
const mongoose = require("mongoose");

//Step:1 Schema
const customerSchema = new mongoose.Schema({
    name: {type: String, required: true, maxlength: 50, unique: true},
    isGold: {type: Boolean, default: false},
    date: {type: Date, default: Date.now},
});

//Step:2 Model
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean(),
    });

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer