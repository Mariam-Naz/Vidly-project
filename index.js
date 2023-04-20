const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Joi = require("joi");
const config = require("config");
const authenticate = require("./middleware/authentication")

//Routes
const genres = require("./routes/genres");
const home = require("./routes/home");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(authenticate);
app.use("/api/genres", genres);
app.use("/", home);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views'); //default
//Configuration
console.log(`env: ${app.get('env')}`)
console.log(`Application Name: ${config.get('name')}`);
console.log(`Application Mail: ${config.get('mail.host')}`);
// console.log(`Application Mail Password: ${config.get('mail.password')}`);
console.log("Mail Password: " + config.get("mail.password"));

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})