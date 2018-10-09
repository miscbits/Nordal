var express = require('express');
var router = express.Router();

var StudentCommentsController = require('../controllers/StudentCommentsController');
var StaffValidator = require('../middleware/StaffValidator');

router.use(StaffValidator);

// ROUTE BASE - /students/:student_id/comments
router.get   ('/', StudentCommentsController.index);
router.get   ('/:id', StudentCommentsController.show);
router.post  ('/', StudentCommentsController.store);
router.put   ('/:id', StudentCommentsController.update);
router.delete('/:id', StudentCommentsController.destroy);

module.exports = router;
