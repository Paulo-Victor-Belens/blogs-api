// const { PostCategory } = require('../models');

const validationFilds = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validationFildsLength = (req, res, next) => {
  const { title, content } = req.body;
  if (title.length === 0 || content.length === 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

// const validateIfExistCategory = async (req, res, next) => {
//   const { categoryIds } = req.body;
//   const isCategory = categoryIds.map(async (categoryId) => PostCategory.findOne({
//     where: { postId: categoryId } }));

//   if ((await Promise.all(isCategory)).some((category) => category === null)) {
//     return res.status(400).json({ message: 'one or more "categoryIds" not found' });
//   }

//   next();
// };

module.exports = [validationFilds, validationFildsLength];