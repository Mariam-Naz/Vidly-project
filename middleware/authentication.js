function authenticate(res, req, next){
    console.log("authenticated...");
    next();
}

module.exports = authenticate;