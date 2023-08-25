const { Category } = require('../models');

const categoryPostService = async (name) => {
  if (!name) {
    return { status: 'NOT_FOUND_2', data: { message: '"name" is required' } };
  }
  const { id } = await Category.create({ name });

  return { status: 'CREATED', data: { id, name } };
};

const categoryGetAllService = async () => {
  const categories = await Category.findAll();

  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  categoryPostService,
  categoryGetAllService,
};