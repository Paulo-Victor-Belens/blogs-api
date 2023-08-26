const { Op } = require('sequelize');
const { PostCategory, BlogPost, Category, User } = require('../models');

const categoryPostService = async (title, content, categoryIds, userId) => {
  const isCategory = categoryIds.map(async (categoryId) => Category.findOne({
    where: { id: categoryId } }));

  if ((await Promise.all(isCategory)).some((category) => category === null)) {
    return { status: 'NOT_FOUND_2', data: { message: 'one or more "categoryIds" not found' } };
  }
  const newDate = new Date();

  const { id } = await BlogPost.create({ title,
    content,
    userId,
    categoryIds,
    updated: newDate, 
    published: newDate, 
});

  categoryIds.forEach((categoryId) => PostCategory.create({ postId: id, categoryId })); 

  const post = await BlogPost.findByPk(id);

  return { status: 'CREATED', data: { ...post.dataValues } };
};

const postGetAllService = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return { status: 'SUCCESSFUL', data: posts };
};

const postGetByIdService = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESSFUL', data: post };
};

const postUpdateService = async (title, content, id, userId) => {
  const postUser = await BlogPost.findByPk(id);
  if (!postUser) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  if (postUser.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
  await BlogPost.update({ title, content }, { where: { id } });

  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return { status: 'SUCCESSFUL', data: post };
};

const postDeleteService = async (id, userId) => {
  const postUser = await BlogPost.findByPk(id);
  if (!postUser) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  if (postUser.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
  await BlogPost.destroy({ where: { id } });
  return { status: 'DELETED' };
};

const postSearchService = async (searchTerm) => {
  console.log(searchTerm);
  if (!searchTerm) return postGetAllService();
  const posts = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${searchTerm}%` } },
      { content: { [Op.like]: `%${searchTerm}%` } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!posts.length) return { status: 'SUCCESSFUL', data: [] };
  return { status: 'SUCCESSFUL', data: posts };
};

module.exports = {
  categoryPostService,
  postGetAllService,
  postGetByIdService,
  postUpdateService,
  postDeleteService,
  postSearchService,
};