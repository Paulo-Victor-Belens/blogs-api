const { postService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const postCreate = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { payload: { data: { id } } } = req;
  const { status, data } = await postService.categoryPostService(title, content, categoryIds, id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const postGetAll = async (req, res) => {
  const { status, data } = await postService.postGetAllService();
  return res.status(mapStatusHTTP(status)).json(data);
};

const postGetById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.postGetByIdService(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  postCreate,
  postGetAll,
  postGetById,
};