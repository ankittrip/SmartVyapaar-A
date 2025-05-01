// routes/manufacturerRoutes.js
const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturerController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', manufacturerController.getAllManufacturers);
router.get('/:id', manufacturerController.getManufacturerById);

// Protected routes (authentication required)
router.post('/add', authMiddleware, manufacturerController.addManufacturer);
router.put('/update/:id', authMiddleware, manufacturerController.updateManufacturer);
router.delete('/delete/:id', authMiddleware, manufacturerController.deleteManufacturer);

module.exports = router;
