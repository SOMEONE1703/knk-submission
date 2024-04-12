var express = require('express');
var router = express.Router();
const path=require("path");

/* GET users listing. */
router.get('/login', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/login.html");
  res.sendFile(filePath);
});
router.post('/login', function(req, res, next) {
  let id=req.body.username;
  let password=req.body.password;
  let successful=false;
  if (successful){
    //const filePath = path.join(__dirname, "../public/login.html");
    res.status(200).send("correct");
  }
  else{
    res.status(200).send("correct");
  }
});

router.get('/register', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/register.html");
  res.sendFile(filePath);
});

router.post('/register', function(req, res, next) {
  let id=req.body.username;
  let password=req.body.password;
  let unique=false;
  
});


router.get('/forgot', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/forgot.html");
  res.sendFile(filePath);
});

router.get('/reset', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/register.html");
  res.sendFile(filePath);
});
module.exports = router;
