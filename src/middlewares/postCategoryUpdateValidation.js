const validationFilds = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
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

module.exports = [validationFilds, validationFildsLength];