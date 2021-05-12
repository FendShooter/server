const jwt = require('jsonwebtoken');
const { users: User } = require('../models');
const auth = async (req, res, next) => {
  let token = req.header('Authorization');
  try {
    if (!token) {
      return res.status(401).send('You are not authorized');
    }
    token = token.replace('Bearer ', '');
    const decoded = await jwt.verify(token, 'secret');
    const user = await User.findOne({ where: { user_id: decoded.user_id } });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: 'something went wrong' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

module.exports = auth;
