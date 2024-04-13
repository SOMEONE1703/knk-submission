var express = require('express');
var router = express.Router();
const path=require("path");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/index.html");
  res.sendFile(filePath);
});

router.get('/leaderboard', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/leaderboard.html");
  res.sendFile(filePath);
});

module.exports = router;
