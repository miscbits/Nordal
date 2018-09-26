var express = require('express');
var router = express.Router();

var LabsController = require('../controllers/LabsController');
var UserIsStaff = require('../middleware/UserIsStaff');

router.get('/', LabsController.index);
router.get('/:id', LabsController.show);
router.post('', UserIsStaff, LabsController.store);
router.put('/:id', LabsController.update);
router.delete('/:id', LabsController.destroy);

module.exports = router;
