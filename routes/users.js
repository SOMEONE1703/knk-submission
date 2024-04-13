var express = require('express');
var router = express.Router();
const path=require("path");


router.get('/login', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/login.html");
  res.sendFile(filePath);
});
router.post('/login', function(req, res, next) {
  let id=req.body.username;
  let password=req.body.password;
  let successful=false;
  //authenitication check
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
  // do the check for uniqueness
  if (unique){
    res.status(200).send("y");
  }
  else{
    res.status(200).send("n");
  }
});


router.get('/forgot', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/forgot.html");
  res.sendFile(filePath);
});

router.get('/forgot/:id', function(req, res, next) {
  //if id exists
  //get from server
  let exists=false;
  if (exists){
    let question="something";
    res.send(question);
  }
  else{
    res.send("User does not exists");
  }
});

router.post('/forgot', function(req, res, next) {
  let id=req.body.username;
  let password=req.body.password;
  let unique=false;
  // do the check for uniqueness
  if (unique){
    res.status(200).send("y");
  }
  else{
    res.status(200).send("n");
  }
});

router.get('/reset', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/reset.html");
  res.sendFile(filePath);
});

router.post('/reset', function(req, res, next) {
  let id=req.body.username;
  let password=req.body.password;
  //do the updating on DB
  res.status(200).send("done");
});

module.exports = router;
