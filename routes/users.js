var express = require('express');
var router = express.Router();
const path=require("path");

/* GET users listing. */
router.get('/login', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/login.html");
  res.sendFile(filePath);
});

router.get('/register', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/register.html");
  res.sendFile(filePath);
});

module.exports = router;
