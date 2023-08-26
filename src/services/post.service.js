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

module.exports = {
  categoryPostService,
  postGetAllService,
  postGetByIdService,
};