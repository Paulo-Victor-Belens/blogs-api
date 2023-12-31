const express = require('express');
const { UserController } = require('../controllers');
const userValitadtion = require('../middlewares/userValidation');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.delete('/me', tokenValidation, UserController.userDelete);
router.post('/', userValitadtion, UserController.userPostCreate);
router.get('/:id', tokenValidation, UserController.userGetById);
router.get('/', tokenValidation, UserController.userGetAll);

module.exports = router;