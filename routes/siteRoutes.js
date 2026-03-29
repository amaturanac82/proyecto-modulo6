const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.get('/', siteController.home);
router.get('/about', siteController.about);
router.get('/status', siteController.status);
router.get('/visits', siteController.visits);

module.exports = router;