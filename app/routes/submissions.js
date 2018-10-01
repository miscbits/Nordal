var express = require('express');
var router = express.Router();

var SubmissionsController = require('../controllers/SubmissionsController');

// ROUTE BASE - /submissions
router.get('/', SubmissionsController.index);
router.get('/:id', SubmissionsController.show);
router.post('', SubmissionsController.store);
router.put('/:id', SubmissionsController.update);
router.delete('/:id', SubmissionsController.destroy);

module.exports = router;
