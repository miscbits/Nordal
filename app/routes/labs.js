var express = require('express');
var router = express.Router();

var LabsController = require('../controllers/LabsController');

router.get('/', LabsController.index);
router.get('/:id', LabsController.show);
router.post('', LabsController.store);
router.put('/:id', LabsController.update);
router.delete('/:id', LabsController.destroy);

module.exports = router;
