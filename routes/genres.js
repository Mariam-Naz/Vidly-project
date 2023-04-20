const express = require("express");
const router = express.Router();

const genres = [
    {
        id: 1,
        name: "Romcom"
    },
    {
        id: 2,
        name: "Action"
    },
    {
        id: 3,
        name: "Thrill"
    },

]
router.get("/", (req, res) => {
    res.send(genres);
})

router.get("/:id", (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id) );
    if(!genre) return res.status(404).send("The genre with give ID not found") ;
    return res.send(genre);
})

router.post("/", (req, res) => {

    const { error, value }  = validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const genre = {
        id: genres.length +1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
})

router.put("/:id", (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id) );
    if(!genre) return res.status(404).send("The genre with give ID not found") ;

    const { error, value }  = validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    genre.name = req.body.name;

    res.send(genre);
})

router.delete("/:id", (req, res) => {
    const genre = genres.find(x => x.id === parseInt(req.params.id) );
    if(!genre) return res.status(404).send("The genre with give ID not found") ;

    const index = genres.indexOf(genre)
    genres.splice(index,1)
    return res.send(genre);
});

function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
    });

    return schema.validate(genre);
}

module.exports = router;