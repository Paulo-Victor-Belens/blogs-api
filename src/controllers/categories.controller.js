const { categoriesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const categoryPostCreate = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoriesService.categoryPostService(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  categoryPostCreate,
};