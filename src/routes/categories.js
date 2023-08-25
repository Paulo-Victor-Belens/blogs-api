const express = require('express');
const { CategoriesController } = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', tokenValidation, CategoriesController.categoryPostCreate);

module.exports = router;