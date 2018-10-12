var express = require('express');
var router = express.Router();

var AuthController = require('../controllers/AuthController');
var WebhookHandlers = require('../controllers/WebhookHandlers');
var SecureGithubWebhook = require('../middleware/SecureGithubWebhook');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.status(200)
        .json({
          message: 'Express Is Up'
        });
});

router.post("/auth/github", AuthController.github);
router.post("/auth/github/refresh", AuthController.google_refresh);
router.post("/auth/google", AuthController.google);

router.post("/github/lab_submission",
	SecureGithubWebhook,
	WebhookHandlers.labHandler
);

router.post("/github/assessment_submission",
	SecureGithubWebhook,
	WebhookHandlers.assessmentHandler
);

module.exports = router;
