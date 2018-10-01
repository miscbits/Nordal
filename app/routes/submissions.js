var express = require('express');
var router = express.Router();

var SubmissionsController = require('../controllers/SubmissionsController');

// ROUTE BASE - /submissions
router.get('/', LabsController.index);
router.get('/:id', LabsController.show);
router.post('', LabsController.store);
router.put('/:id', LabsController.update);
router.delete('/:id', LabsController.destroy);

module.exports = router;
