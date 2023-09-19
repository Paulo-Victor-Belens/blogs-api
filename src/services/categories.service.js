const { Category } = require('../models');

const categoryPostService = async (name) => {
  if (!name) {
    return { status: 'NOT_FOUND_2', data: { message: '"name" is required' } };
  }
  const newCategory = await Category.create({ name });

  return { status: 'CREATED', data: newCategory };
};

const categoryGetAllService = async () => {
  const categories = await Category.findAll();

  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  categoryPostService,
  categoryGetAllService,
};