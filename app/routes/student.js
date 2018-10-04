var express = require('express');
var router = express.Router();

var StudentController = require('../controllers/StudentController');
var StaffValidator, StudentAssignmentsController = require('../controllers/StudentAssignmentsController');
var StaffValidator = require('../middleware/StaffValidator');
var StaffStudentValidator = require('../middleware/StaffOrStudentValidator');

// ROUTE BASE - /students
router.get   ('/', StaffValidator, StudentController.index);
router.get   ('/:student_id', StaffStudentValidator, StudentController.show);
router.post  ('/', StaffValidator, StudentController.store);
router.put   ('/:student_id', StaffValidator, StudentController.update);
router.delete('/:student_id', StaffValidator, StudentController.destroy);

router.post('/assign/:id', StaffValidator, StudentAssignmentsController.assign)

router.get   ('/:student_id/assignments/', StaffStudentValidator, StudentAssignmentsController.index);
router.put   ('/:student_id/assignments/:id', StaffValidator, StudentAssignmentsController.update);
router.delete('/:student_id/assignments/:id', StaffValidator, StudentAssignmentsController.destroy);

module.exports = router;
