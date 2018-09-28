var express = require('express');
var router = express.Router();

var StudentController = require('../controllers/StudentController');
var StudentAssignmentsController = require('../controllers/StudentAssignmentsController');
var UserIsStaff = require('../middleware/UserIsStaff');

router.get   ('/',    StudentController.index);
router.get   ('/:id', StudentController.show);
router.post  ('/',    StudentController.store);
router.put   ('/:id', StudentController.update);
router.delete('/:id', StudentController.destroy);

router.post('/assign/:id', StudentAssignmentsController.assign)

router.get   ('/:student_id/assignments/',    StudentAssignmentsController.index);
router.put   ('/:student_id/assignments/:id', StudentAssignmentsController.update);
router.delete('/:student_id/assignments/:id', StudentAssignmentsController.destroy);

module.exports = router;
