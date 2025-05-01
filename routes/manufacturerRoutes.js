
const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturerController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', manufacturerController.getAllManufacturers);
router.get('/:id', manufacturerController.getManufacturerById);


router.post('/add', authMiddleware, manufacturerController.addManufacturer);
router.put('/update/:id', authMiddleware, manufacturerController.updateManufacturer);
router.delete('/delete/:id', authMiddleware, manufacturerController.deleteManufacturer);

module.exports = router;
