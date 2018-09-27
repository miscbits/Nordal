var express = require('express');
var router = express.Router();

var StudentController = require('../controllers/StudentController');
var UserIsStaff = require('../middleware/UserIsStaff');

router.get('/', StudentController.index);
router.get('/:id', StudentController.show);
router.post('', StudentController.store);
router.put('/:id', StudentController.update);
router.delete('/:id', StudentController.destroy);

module.exports = router;
