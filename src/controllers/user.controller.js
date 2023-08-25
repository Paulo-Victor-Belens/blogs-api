const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { userService } = require('../services');

const userPostCreate = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, data } = await userService.userPostService(displayName, email, password, image);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  userPostCreate,
};