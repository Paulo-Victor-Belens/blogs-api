const { createToken } = require('../auth/authfunction');
const { User } = require('../models');

const loginPostService = async (email, password) => {
  console.log('loginPostService', email, password);
  if (!email || !password) {
    return { status: 'NOT_FOUND_2', data: { message: 'Some required fields are missing' } };
  }

  const user = await User.findOne({ where: { email, password } });
  
  if (!user) {
    return { status: 'NOT_FOUND_2', data: { message: 'Invalid fields' } };
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const payload = { data: userWithoutPassword };

  const token = createToken(payload);

  return { status: 'SUCCESSFUL', data: { token } };
  };

  module.exports = {
    loginPostService,
  };