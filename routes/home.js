const express = require('express');
const router = express.Router()

router.get('/', function(req, res){
    res.render('home', {'name': 'Enola Holmes', 'message': 'Good Movie'})
})

module.exports = router