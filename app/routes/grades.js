var express = require('express');
var router = express.Router();

var GradesController = require('../controllers/GradesController');
var StaffValidator = require('../middleware/StaffValidator');
var StaffStudentValidator = require('../middleware/StaffOrStudentValidator');

// ROUTE BASE - /grades
router.get   ('/', StaffValidator, GradesController.index);
router.get   ('/:id', StaffValidator, GradesController.show);
router.post  ('/', StaffValidator, GradesController.store);
router.put   ('/:id', StaffValidator, GradesController.update);
router.delete('/:id', StaffValidator, GradesController.destroy);

module.exports = router;
