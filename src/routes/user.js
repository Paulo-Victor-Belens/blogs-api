const express = require('express');
const { UserController } = require('../controllers');
const userValitadtion = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', userValitadtion, UserController.userPostCreate);

module.exports = router;