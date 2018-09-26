var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/AuthController');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.status(200)
        .json({
          message: 'Express Is Up'
        });
});

router.post("/auth/github", AuthController.github);
router.post("/auth/google", AuthController.google);

module.exports = router;
