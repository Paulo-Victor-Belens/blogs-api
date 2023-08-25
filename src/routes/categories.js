const express = require('express');
const { CategoriesController } = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/', tokenValidation, CategoriesController.categoryGetAll);
router.post('/', tokenValidation, CategoriesController.categoryPostCreate);

module.exports = router;