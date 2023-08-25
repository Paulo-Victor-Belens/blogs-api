const { getPayload } = require('../auth/authfunction');

const tokenValidation = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const newToken = token.slice(7);
    const payload = getPayload(newToken);
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;