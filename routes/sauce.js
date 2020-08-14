const express = require('express');
const sauceCtrl = require('../controllers/sauce');

const router = express.Router();

router.get('/', sauceCtrl.getAllSauces);
router.post('/');
router.get('/:id');
router.put('/:id');
router.delete('/:id');
router.post('/:id/like');

module.exports = router;