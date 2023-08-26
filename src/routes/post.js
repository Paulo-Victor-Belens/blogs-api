const express = require('express');
const { PostController } = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');
const postValidation = require('../middlewares/postCategoryValidation');

const router = express.Router();

router.get('/', tokenValidation, PostController.postGetAll);
router.post('/', tokenValidation, postValidation, PostController.postCreate);

module.exports = router;