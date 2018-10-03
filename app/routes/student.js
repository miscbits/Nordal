var express = require('express');
var router = express.Router();

var StudentController = require('../controllers/StudentController');
var StudentAssignmentsController = require('../controllers/StudentAssignmentsController');

// ROUTE BASE - /students
router.get   ('/',            StudentController.index);
router.get   ('/:student_id', StudentController.show);
router.post  ('/',            StudentController.store);
router.put   ('/:student_id', StudentController.update);
router.delete('/:student_id', StudentController.destroy);

router.post('/assign/:id', StudentAssignmentsController.assign)

router.get   ('/:student_id/assignments/',    StudentAssignmentsController.index);
router.put   ('/:student_id/assignments/:id', StudentAssignmentsController.update);
router.delete('/:student_id/assignments/:id', StudentAssignmentsController.destroy);

module.exports = router;
