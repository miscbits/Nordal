var express = require('express');
var router = express.Router();

var LabsController = require('../controllers/LabsController');
var LabsStudentsController = require('../controllers/LabsStudentsController');

// ROUTE BASE - /labs
router.get('/', LabsController.index);
router.get('/:id', LabsController.show);
router.post('', LabsController.store);
router.put('/:id', LabsController.update);
router.delete('/:id', LabsController.destroy);

router.get('/:id/students', LabsStudentsController.show);

module.exports = router;
