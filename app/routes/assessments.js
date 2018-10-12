var express = require('express');
var router = express.Router();

var AssessmentsController = require('../controllers/AssessmentsController');
var StaffValidator = require('../middleware/StaffValidator');
var StudentAssessmentsController = require('../controllers/StudentAssessmentsController');

router.use(StaffValidator);

// ROUTE BASE - /assessments
router.get('/', AssessmentsController.index);
router.get('/:id', AssessmentsController.show);
router.post('', AssessmentsController.store);
router.put('/:id', AssessmentsController.update);
router.delete('/:id', AssessmentsController.destroy);

router.get('/:id/students', StudentAssessmentsController.show);

module.exports = router;
