const { createToken } = require('../auth/authfunction');
const { User } = require('../models');

const userPostService = async (displayName, email, password, image) => {
  const [user, created] = await User.findOrCreate(
{ where: { email },
  defaults: { displayName, email, password, image }, 
},
);

  if (!created) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = createToken(userWithoutPassword);
  
  return { status: 'CREATED', data: { token } };
};

const userGetAllService = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: 'SUCCESSFUL', data: users };
};

module.exports = {
  userPostService,
  userGetAllService,
};