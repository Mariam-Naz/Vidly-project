const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");


//Step:1 Schema
const genreSchema = new mongoose.Schema({
    name: {type: String, required: true, maxlength: 50, unique: true},
    date: {type: Date, default: Date.now},
});

//Step:2 Model
const Genre = mongoose.model('Genre', genreSchema);


// const genres = [
//     {
//         id: 1,
//         name: "Romcom"
//     },
//     {
//         id: 2,
//         name: "Action"
//     },
//     {
//         id: 3,
//         name: "Thrill"
//     },
// ]
router.get("/", async (req, res) => {
    const result = await Genre.find().sort('name');
    res.send(result);
})

router.get("/:id", async (req, res) => {
    // const genre = genres.find(x => x.id === parseInt(req.params.id) );
    // if(!genre) return res.status(404).send("The genre with give ID not found") ;
    // return res.send(genre);
        const result = await Genre.findById(id);
        res.send(result);
})

router.post("/", async (req, res) => {

    // const { error, value }  = validateGenre(req.body);
    // if(error){
    //     return res.status(400).send(error.details[0].message)
    // }

        const genre = new Genre({
            name: req.body.name,
        })
    
        try{
            const result = await genre.save();
            res.send(result);
        }catch(e){
            for(field in e.errors){
                res.send(e.errors[field].message);
            }
        }
        
})

router.put("/:id", async (req, res) => {
    // const genre = genres.find(x => x.id === parseInt(req.params.id) );
    // if(!genre) return res.status(404).send("The genre with give ID not found") ;

    // const { error, value }  = validateGenre(req.body);
    // if(error){
    //     return res.status(400).send(error.details[0].message)
    // }

        try{
            const result = await Genre.findByIdAndUpdate(req.params.id, {
                $set:{
                    name: req.body.name
                }
            }, {new: true}, { runValidators: true }, function(err){
                res.send(err.message);
            })
            res.send(result);
        }catch(e){
            // for(field in e.errors){
            //     res.send(e.errors[field].message);
            // }
            res.send({
                error: e.message
            });
        }
        
})

router.delete("/:id", async (req, res) => {
    // const genre = genres.find(x => x.id === parseInt(req.params.id) );
    // if(!genre) return res.status(404).send("The genre with give ID not found") ;

    // const index = genres.indexOf(genre)
    // genres.splice(index,1)
    // return res.send(genre);

    try{
        const result = await Genre.deleteOne({_id: req.params.id});
        res.send(result);
    }catch(e){
        res.send(e.message);
    }
    

});

function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
    });

    return schema.validate(genre);
}

module.exports = router;