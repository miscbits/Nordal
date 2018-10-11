var express = require('express');
var router = express.Router();

var StudentCommentsController = require('../controllers/StudentCommentsController');
var StaffValidator = require('../middleware/StaffValidator');

router.use(StaffValidator);

// ROUTE BASE - /
router.get   ('/students/:student_id/comments', StudentCommentsController.index);
router.get   ('/students/:student_id/comments/:id', StudentCommentsController.show);
router.post  ('/students/:student_id/comments', StudentCommentsController.store);
router.put   ('/students/:student_id/comments/:id', StudentCommentsController.update);
router.delete('/students/:student_id/comments/:id', StudentCommentsController.destroy);

module.exports = router;
