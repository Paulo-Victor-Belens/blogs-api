const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { userService } = require('../services');

const userPostCreate = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, data } = await userService.userPostService(displayName, email, password, image);
  return res.status(mapStatusHTTP(status)).json(data);
};

const userGetAll = async (req, res) => {
  const { status, data } = await userService.userGetAllService();
  return res.status(mapStatusHTTP(status)).json(data);
};

const userGetById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.userGetByIdService(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  userPostCreate,
  userGetAll,
  userGetById,
};