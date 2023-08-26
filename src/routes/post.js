const express = require('express');
const { PostController } = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');
const postValidation = require('../middlewares/postCategoryValidation');
const postValidationUpdate = require('../middlewares/postCategoryUpdateValidation');

const router = express.Router();

router.delete('/:id', tokenValidation, PostController.postDelete);
router.put('/:id', tokenValidation, postValidationUpdate, PostController.postUpdate);
router.get('/:id', tokenValidation, PostController.postGetById);
router.get('/', tokenValidation, PostController.postGetAll);
router.post('/', tokenValidation, postValidation, PostController.postCreate);

module.exports = router;