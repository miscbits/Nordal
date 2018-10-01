var express = require('express');
var router = express.Router();

var AssessmentsController = require('../controllers/AssessmentsController');

// ROUTE BASE - /labs
router.get('/', AssessmentsController.index);
router.get('/:id', AssessmentsController.show);
router.post('', AssessmentsController.store);
router.put('/:id', AssessmentsController.update);
router.delete('/:id', AssessmentsController.destroy);

module.exports = router;
