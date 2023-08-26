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

const postUpdate = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { payload: { data: { id: userId } } } = req;
  const { status, data } = await postService.postUpdateService(title, content, id, userId);
  return res.status(mapStatusHTTP(status)).json(data);
};

const postDelete = async (req, res) => {
  const { id } = req.params;
  const { payload: { data: { id: userId } } } = req;
  const { status, data } = await postService.postDeleteService(id, userId);
  if (!data) {
    return res.status(mapStatusHTTP(status)).end();
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

const postSearch = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await postService.postSearchService(q);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  postCreate,
  postGetAll,
  postGetById,
  postUpdate,
  postDelete,
  postSearch,
};